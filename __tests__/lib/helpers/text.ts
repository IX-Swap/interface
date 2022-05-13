import { baseCreds } from '../helpers/creds'
import { textDev } from '../text/forDev'
import { textStaging } from '../text/forStaging'

let text

if (baseCreds.URL?.includes('staging')) {
  text = textStaging
} else {
  text = textDev
}
text['confirmEmail'] = 'auth/registrations/confirm'

export { text }
