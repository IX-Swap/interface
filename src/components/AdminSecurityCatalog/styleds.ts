import styled from 'styled-components'

import { ButtonGradientBorder } from 'components/Button'
import { BodyRow } from 'components/Table'
import { ApproveButton } from 'components/AdminKycTable/SecondStepStatus'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ModalBlurWrapper } from 'theme'

export const StyledButtonGradientBorder = styled(ButtonGradientBorder)`
  padding: 0px 30px;
  white-space: nowrap;
`

export const CardHeader = styled(BodyRow)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 3fr;
  align-items: center;
  height: 80px;
  margin-bottom: 0px;

  > div:first-child {
    padding-left: 55px;
  }
`

export const EditButton = styled(ApproveButton)`
  width: 109px;
  padding: 0px;
  color: white;
`

export const TokensList = styled.div`
  margin: 0px 12px;
  border-radius: 0px 0px 20px 20px;
  background: radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.033) 0%, rgba(26, 18, 58, 0) 100%),
    rgba(44, 37, 74, 0.5);
`

export const TokensListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 3fr;
  height: 80px;

  > div {
    padding: 0px 40px;
    display: flex;
    align-items: center;
  }
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr 60px;
  grid-gap: 25px;
`

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 36px;
  background: #372e5e;
`

export const TokenCard = styled(BodyRow)`
  display: grid;
  grid-template-columns: 2fr 2fr 3fr 2fr 2fr 2fr 2fr 1fr;
  height: 80px;

  > div {
    display: flex;
    justify-content: center;
    padding-left: 15px;
    align-items: center;
  }

  > div:first-child {
    justify-content: start;
    padding-left: 55px;
  }
`

export const WideModal = styled(RedesignedWideModal)`
  min-width: 1050px;
`

export const WideModalWrapper = styled(ModalBlurWrapper)`
  width: 1050px;
`

export const FormWrapper = styled.div`
  padding: 24px 24px 20px 24px;
  background: rgba(39, 32, 70, 0.4);
  border-radius: 16px;

  > div {
    margin-bottom: 20px;
  }
`

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`
