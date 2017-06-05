import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { initStore, serverLoadLocation, changeLocation, fetchForecastIfNeeded } from '../store'
import Weather from '../components/Weather'
import Search from '../components/Search'
import 'isomorphic-fetch'

export class BuilditPage extends React.Component {
  static async getInitialProps ({ store, isServer }) {
    const { city } = store.getState()
    const location = `${city.name},${city.country}`

    await store.dispatch(fetchForecastIfNeeded(location))
    const { forecast } = store.getState()

    return { isServer, forecast }
  }

  render = () => {
    const { city, forecast, url } = this.props

    return (
      <div className='app'>
        <Head>
          <title>BuildIt Technical Test</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet" />
        </Head>

        <Search />
        {<Weather 
          location={`${city.name},${city.country}`}
          unit="c" 
          forecast={forecast}
        />}
        <style jsx global>{`
        @font-face {
          font-family: 'MeteoconsRegular';
          src: url('static/meteocons/meteocons-webfont.eot');
          src: url('static/meteocons/meteocons-webfont.eot?#iefix') format('embedded-opentype'),
              url('static/meteocons/meteocons-webfont.woff') format('woff'),
              url('static/meteocons/meteocons-webfont.ttf') format('truetype'),
              url('static/meteocons/meteocons-webfont.svg#MeteoconsRegular') format('svg');
          font-weight: normal;
          font-style: normal;
        }


        html {
          width: 100%;
          height: 100%;
          background: #bfdfc9 url(static/bg.jpg) no-repeat bottom right;
          background-size: cover;
        }

        body {
          font-family: 'Questrial', sans-serif
        }

        .app {
          width: 960px;
          margin: 100px auto 0 auto;
          background: rgba(250, 250, 250, .45);
          border:1px solid #bfdfc9;
        }
        `}
        </style>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLocation: bindActionCreators(changeLocation, dispatch)
  }
}

export default withRedux(initStore, state => state, mapDispatchToProps)(BuilditPage)
