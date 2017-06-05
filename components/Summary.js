const iconMapping = {
    'clear sky': 'B',
    'few clouds': 'H',
    'scattered clouds': 'S',
    'broken clouds': 'S',
    'light rain': 'Q',
    'moderate rain': 'T',
}

const Summary = ({ day, isToday }) => {
  const { date, main, low, high, average, humidity } = day

  return (
    <div className={"summary " + (isToday ? 'today' : '')}>
      <h2>{isToday ? 'Today' : date}</h2>
      <a className="icon" data-icon={iconMapping[main]}></a>
      <h4>{main}</h4>
      <span className="high">High: {high} °C</span>
      <span className="low">Low: {low} °C</span>
      <span className="humidity">Humidity: {humidity} %</span>

      <style jsx>{`
      .summary {
          width: 110px;
          vertical-align: middle;
          padding: 10px 15px 5px 15px;
          display: inline-block;
          border:1px solid #3CCDFE;
          border-radius: 5px;
          background: rgba(60, 205, 254, .4);
          margin-right: 12px;
          margin-bottom: 20px;
      }

      .summary h2 {
          font-size: 16px;
          color: #F5F6FF;
          text-shadow: 1px 2px 2px #567, 0 0 0 #CCC;
      }

      .summary h4 {
          text-align: center;
          display: block;
        
        text-shadow: 0 1px 0 rgb(204,204,204);
      }

      .summary span {
          display: block;
      }

      .summary span.high {
          color: #2E4057;
      }

      .summary span.low {
          color: rgba(46,64,87, .5)
      }

      .summary span.humidity {
          margin-top: 5px;
          font-size: 12px;
      }

      .icon {
          display: block;
          width: 96px;
          height: 96px;
          color: #2E4057;
     }

      .icon:before {
        font-size: 96px;
        font-family: 'MeteoconsRegular';
        content: attr(data-icon);
      }

      .summary.today {
          width: 80px;
          padding: 40px 30px 40px 20px;
          background: rgba(60, 205, 254, .2);
      }

      .summary.today h2 {
          font-size: 20px;
          text-align: center;
      }
      `}</style>
    </div>
  )
}

export default Summary
