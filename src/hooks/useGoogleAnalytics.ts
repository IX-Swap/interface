import { useEffect } from 'react'
import { GA_ID, GOOGLE_ANALYTICS } from 'config'
import { useHistory } from 'react-router-dom'

export const useGoogleAnalytics = () => {
  const history = useHistory()

  useEffect(() => {
    if (GOOGLE_ANALYTICS === 'true') {
      history.listen((locations: Location) => {
        window.gtag('event', 'page_view', {
          page_title: location.pathname,
          page_location: location.pathname,
          page_path: location.pathname,
          send_to: GA_ID
        })
      })
    }
  }, []) // eslint-disable-line
}
