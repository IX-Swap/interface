import styled from 'styled-components'

import { ModalBlurWrapper } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'

export const SmallModal = styled(RedesignedWideModal)`
  max-width: 450px !important;
  width: 450px;
`

export const SmallModalWrapper = styled(ModalBlurWrapper)`
  min-width: 450px;
`