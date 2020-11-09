import ReactGA from 'react-ga'
import { useEffect } from 'react'
import { GOOGLE_ANALYTICS } from 'v2/config'

export const useGoogleAnalytics = () => {
  useEffect(() => {
    if (GOOGLE_ANALYTICS === 'true') {
      ReactGA.initialize('G-F7RSTN1MVC')
      ReactGA.pageview(window.location.pathname)
    }
  }, [])
}
