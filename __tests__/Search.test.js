
import { shallow, mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import ConnectedSearch, { Search } from '../components/Search'
import ConnectedBuilditPage, { BuilditPage } from '../pages/index'
import { fetchForecast, changeLocation, reducer } from '../store'

// Snapshot for IndexPage React Component
describe('>>> SEARCH --- Snapshot', () => {
    it('+++ capturing Snapshot of Search', () => {
        const city = { name: 'Woking', country: 'GB' }

        const renderedValue =  renderer.create(<Search city={city} />).toJSON()
        expect(renderedValue).toMatchSnapshot()
    })
})

//*******************************************************************************************************
describe('>>> SEARCH --- Shallow Render REACT COMPONENTS', () => {
  let wrapper
  const city = { name: 'Woking', country: 'GB' }

  beforeEach(()=>{
    wrapper = shallow(<Search city={city} />)    
  })

  it('+++ render the DUMB component', () => {
    expect(wrapper.length).toEqual(1)
  })

  it('+++ contains form', () => {
    expect(wrapper.find('form').length).toEqual(1)
  })
})

//*******************************************************************************************************
describe('>>> SEARCH --- REACT-REDUX (Shallow + passing the {store} directly)', () => {
    const initialState = {
        city: {
            name: 'Woking',
            country: 'UK'
        },
        forecast: []
    }
    const mockStore = configureStore()
    let store, container

    beforeEach(() => {
        store = mockStore(initialState)
        container = shallow(<ConnectedSearch store={store} /> ) 
    })

    it('+++ render the connected(SMART) component', () => {
       expect(container.length).toEqual(1)
    })

    it('+++ check Prop matches with initialState', () => {
       expect(container.prop('city')).toEqual(initialState.city)
    })
})

//*******************************************************************************************************
describe('>>> SEARCH --- REACT-REDUX (Mount + wrapping in <Provider>)', () => {
    const initialState = {
        city: {
            name: 'Woking',
            country: 'UK'
        },
        forecast: []
    }
    const mockStore = configureStore([thunk])
    let store, wrapper

    beforeEach(() => {
        store = mockStore(initialState)
        wrapper = mount( <ConnectedBuilditPage store={store}><ConnectedSearch /></ConnectedBuilditPage> )
    })

    it('+++ contains form', () => {
        expect(wrapper.find('form').length).toEqual(1)
    })

    it('+++ render the connected(SMART) component', () => {
       expect(wrapper.find(ConnectedSearch).length).toEqual(1)
    })

    it('+++ check Prop matches with initialState', () => {
       expect(wrapper.find(Search).prop('city')).toEqual(initialState.city)
    })

    it('+++ check action on dispatching ', () => {
        let action
        
        store.dispatch(fetchForecast({ location:  'London,UK' }))
        
        action = store.getActions()

        expect(action[0].type).toBe('REQUEST_FORECAST')
    })
})

//*******************************************************************************************************
describe('>>> SEARCH --- REACT-REDUX (actual Store + reducers) more of Integration Testing', () => {
    const initialState = {
        city: {
            name: 'Woking',
            country: 'UK'
        },
        forecast: []
    }
    let store, wrapper

    beforeEach(() => {
        store = createStore(reducer, initialState, applyMiddleware(thunk))
        wrapper = mount( <ConnectedBuilditPage store={store}><ConnectedSearch /></ConnectedBuilditPage> )
    })

    it('+++ check Prop matches with initialState', () => {
        store.dispatch(changeLocation({ target: { value:  'London,UK' } }))
        expect(wrapper.find(Search).prop('city')).toEqual({"country": "UK", "name": "London"})
    });

})