import ReactGA from 'react-ga'
import { GOOGLE_ANALYTICS } from 'config'

export const initGoogleAnalytics = () => {
  // if (GOOGLE_ANALYTICS === 'true') {
  console.log('testing ga')
  ReactGA.initialize('UA-187443583-1')
  ReactGA.ga('set', 'checkProtocolTask', null)
  // }
}
