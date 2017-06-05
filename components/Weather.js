import Summary from './Summary'
import { 
  groupForecastByDay, 
  daySummary 
} from '../utils/processForecast'

const Weather = ({ location, forecast }) => {
  const summary = daySummary(groupForecastByDay(forecast))

  return (
    <div className='main'>
      <h1>{ location }</h1>
      
      {
        Object.keys(summary).map((day, key) => (<Summary key={key} isToday={key === 0} day={summary[day]} />))
      }

      <style jsx>{`
        .main {
          border: 0px solid #eee;
          border-radius: 0px;
          padding: 20px;
        }

        h1 {
          font-size: 24px;
          font-weight: bold;
          color: #2E4057;
          margin: 10px 0;
        }
      `}</style>
    </div>
  )
}

export default Weather
