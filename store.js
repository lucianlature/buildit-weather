import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import fetch from 'isomorphic-fetch'

const API_KEY = '060c011784ac004d3668a0696a4068c5'

const initialState = {
  city: {
      name: 'Woking',
      country: 'UK'
  },
  forecast: []
}

export const requestForecast = location => ({
  type: actionTypes.REQUEST_FORECAST,
  location
})

function receiveForecast(location, json) {
  return {
    type: actionTypes.RECEIVE_FORECAST,
    location,
    forecast: json.list,
    receivedAt: Date.now()
  }
}

function shouldFetchForecast(state, location) {
  const forecast = state.forecast
  return !forecast.length
}

export const actionTypes = {
  REQUEST_FORECAST: 'REQUEST_FORECAST',
  RECEIVE_FORECAST: 'RECEIVE_FORECAST',
  CHANGE_LOCATION: 'CHANGE_LOCATION',
  EXCHANGE: 'EXCHANGE',
}

// REDUCER
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_FORECAST:
      return Object.assign({}, state, { forecast: action.forecast })
    case actionTypes.CHANGE_LOCATION:
      return Object.assign({}, state, { city: action.city })
    default: return state
  }
}

// ACTIONS
export const serverLoadLocation = (isServer) => dispatch => {
  return dispatch({ type: actionTypes.LOAD_LOCATION })
}

export const fetchForecastIfNeeded = (location) => (dispatch, getState) => {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.
  if (shouldFetchForecast(getState(), location)) {
    // Dispatch a thunk from thunk!
    return dispatch(fetchForecast(location))
  } else {
    // Let the calling code know there's nothing to wait for.
    return Promise.resolve()
  }
}

export const fetchForecast = location => dispatch => {
  dispatch(requestForecast(location))

  return fetch(`http://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}&units=metric&q=${location}`)
    .then(response => response.json())
    .then(json => dispatch(receiveForecast(location, json)))
}

export const changeLocation = (event) => dispatch => {
  let location = String(event.target.value)

  if (location.length < 3) {
      return
  }

  const [ name, country ] = location.split(',')

  if (!name) {
      return
  }

  if (!country) {
      return
  }

  dispatch({type: actionTypes.CHANGE_LOCATION, city: { name, country }})
  return dispatch(fetchForecast(location))
}

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f

export const initStore = (initialState = initialState) => {
  if (process.browser) {
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
    }
  }
  return createStore(reducer, initialState, compose(applyMiddleware(thunkMiddleware), devtools))
}
