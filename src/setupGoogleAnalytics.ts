import { GA_ID, GOOGLE_ANALYTICS } from 'config'
import storageService from 'services/storage'
import User from 'types/user'

declare global {
  interface Window {
    gtag: any
  }
}

export const setupGoogleAnalytics = () => {
  if (GOOGLE_ANALYTICS === 'true') {
    const user = storageService.get<User>('user')

    window.gtag('js', new Date())
    window.gtag('config', GA_ID, {
      send_page_view: false,
      app_name: 'InvestaX Prime',
      user_id: user?._id
    })
  }
}
