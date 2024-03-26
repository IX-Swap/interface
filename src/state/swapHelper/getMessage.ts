import { t } from '@lingui/macro'

export const getMessage = ({ isError = false }) => {
  if (isError) {
    return `Transaction was not authorized by the broker-dealer. Something went wrong, try again later.`
  } else {
    return `Transaction was successfully authorized by the broker-dealer. You can proceed with swapping.`
  }
}
