import { makeURL } from 'config/appURL'

export const SecurityRoute = {
  landing: makeURL(['app', 'settings']),
  changePassword: makeURL(['app', 'settings', 'changePassword']),
  setup2fa: makeURL(['app', 'settings', 'setup2fa']),
  guide: makeURL(['app', 'settings', 'guide2fa'])
}
