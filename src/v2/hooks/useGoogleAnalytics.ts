import ReactGA from 'react-ga'
import { useEffect } from 'react'
import { ENVIRONMENT } from 'v2/config'

export const useGoogleAnalytics = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && ENVIRONMENT === 'release') {
      ReactGA.initialize('G-F7RSTN1MVC')
      ReactGA.pageview(window.location.pathname)
    }
  }, [])
}
