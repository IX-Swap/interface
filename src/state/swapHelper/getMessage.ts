import { t } from '@lingui/macro'

export const getMessage = ({ name = '', isError = false }) => {
  if (isError) {
    return t`Transaction was not authorized by ${name} broker-dealer. Something went wrong, try again later.`
  } else {
    return t`Transaction was successfully authorized by ${name} broker-dealer.You can proceed with swapping.`
  }
}
