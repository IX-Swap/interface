import TagManager from 'react-gtm-module'

export const setupGtagManager = () => {
  if (process.env.NODE_ENV === 'production') {
    TagManager.initialize({
      gtmId: 'GTM-M4SFDN7'
    })
  }
}
