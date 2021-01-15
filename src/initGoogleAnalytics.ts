import ReactGA from 'react-ga'
import { GOOGLE_ANALYTICS } from 'config'

export const initGoogleAnalytics = () => {
  // if (GOOGLE_ANALYTICS === 'true') {
  ReactGA.initialize('259005227')
  ReactGA.ga('set', 'checkProtocolTask', null)
  // }
}
