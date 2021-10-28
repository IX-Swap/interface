import { t } from '@lingui/macro'
import { WrapType } from 'hooks/useWrapCallback'

export const WrapText: { [key in WrapType]: string | null } = {
  [WrapType.NOT_APPLICABLE]: null,
  [WrapType.WRAP]: t`Wrap`,
  [WrapType.UNWRAP]: t`Unwrap`,
}
