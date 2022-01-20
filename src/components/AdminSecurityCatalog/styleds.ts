import styled from 'styled-components'

import { ButtonGradientBorder } from 'components/Button'
import { BodyRow } from 'components/Table'
import { ApproveButton } from 'components/AdminKycTable/SecondStepStatus'

export const StyledButtonGradientBorder = styled(ButtonGradientBorder)`
  padding: 0px 30px;
  white-space: nowrap;
`

export const CardHeader = styled(BodyRow)`
  display: flex;
  align-items: center;
  height: 80px;
  margin-bottom: 0px;

  > div:first-child {
    padding-left: 55px;
  }

  > div {
    padding: 20px 80px;
  }
`

export const EditButton = styled(ApproveButton)`
  margin-left: auto;
  margin-right: 19px;
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
