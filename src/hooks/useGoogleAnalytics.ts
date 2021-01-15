import ReactGA from 'react-ga'
import { useEffect } from 'react'
import { GOOGLE_ANALYTICS } from 'config'
import { useHistory } from 'react-router-dom'
import { useAuth } from './auth/useAuth'

export const useGoogleAnalytics = () => {
  const history = useHistory()
  const { user } = useAuth()

  useEffect(() => {
    // if (GOOGLE_ANALYTICS === 'true') {
    if (user !== undefined) {
      ReactGA.set({
        userId: user._id,
        email: user.email,
        userName: user.name
      })
    }

    history.listen(location => {
      ReactGA.pageview(location.pathname)
    })
    // }
  }, []) // eslint-disable-line
}
