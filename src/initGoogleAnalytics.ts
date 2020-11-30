import ReactGA from 'react-ga'
import { GOOGLE_ANALYTICS } from 'v2/config'

export const initGoogleAnalytics = () => {
  if (GOOGLE_ANALYTICS === 'true') {
    ReactGA.initialize('G-F7RSTN1MVC')
  }
}
