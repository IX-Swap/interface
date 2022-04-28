import styled from 'styled-components'

import { ButtonIXSGradient } from 'components/Button'
import { BodyRow, HeaderRow } from 'components/Table'
import { MEDIA_WIDTHS, ModalContentWrapper } from 'theme'

export const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 1fr auto;
  max-width: 75%;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    max-width: 100%;
  }
`

export const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: 1fr auto;
  max-width: 75%;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    max-width: 100%;
  }
`

export const TopContent = styled.div`
  gap: 16px;
  display: grid;
  grid-template-columns: 1fr auto;
  margin-bottom: 33px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: 1fr;
  }
`

export const AddButton = styled(ButtonIXSGradient)`
  margin-top: 32px;
  max-width: 150px;
  width: 100%;
`

export const ModalContent = styled(ModalContentWrapper)`
  padding: 29px 38px 42px 42px;
  border-radius: 20px;
`

export const Title = styled.div`
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const NoData = styled.div`
  font-weight: 600;
  color: ${({ theme: { text2 } }) => text2};
  text-align: center;
`