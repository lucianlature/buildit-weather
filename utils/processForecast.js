import R from 'ramda'
import moment from 'moment'

const getMax = R.reduce(R.max, -Infinity)
const getMin = R.reduce(R.min, Infinity)
const getAverage = R.mean

const groupForecastByDay = R.groupBy(forecast => moment(forecast.dt_txt).format('YYYY-MM-DD'))

const groupByDescription = R.groupBy(R.prop('description'))
const count = R.map(R.length)
const mainSorter = R.pipe(
  R.toPairs,
  R.sortBy(R.prop(1)),
  R.last,
)


const weatherReducer = R.reduce((acc, weather) => acc.concat(weather.weather), [])
const temperatureReducer = R.reduce((acc, weather) => acc.concat(weather.main.temp), [])
const humidityReducer = R.reduce((acc, weather) => acc + weather.main.humidity, 0)

const processForecast = R.juxt([
  R.compose(
    count,
    groupByDescription,
    weatherReducer
  ),
  R.converge(R.divide, [humidityReducer, R.length]),
  R.compose(
    R.juxt([
      getMin,
      getMax,
      getAverage
    ]),
    temperatureReducer
  )
])

const _summary = forecast => {
    const [
      { ...main },
      humidity,
      [low, high, average]
    ] = processForecast(forecast)

    return {
        date: moment(forecast[0].dt_txt).format('dddd, Do MMM'),
        main: R.head(mainSorter(main)),
        low: Math.floor(low),
        high: Math.floor(high),
        humidity : Math.round(humidity),
        average: Math.round(average),
    }
}
const daySummary = R.map(_summary)

export { 
  groupForecastByDay, 
  daySummary
}