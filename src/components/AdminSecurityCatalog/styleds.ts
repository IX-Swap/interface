import styled from 'styled-components'
import { darken } from 'polished'

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

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr 1fr 1fr 1fr;

    > div:first-child {
      padding-left: 10px;
    }
  `};
`

export const EditButton = styled(ApproveButton)`
  width: 109px;
  padding: 0px;
  color: ${({ theme }) => theme.text1};

  &:focus {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.05, theme.bg7)};
  }
  &:hover {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.05, theme.bg7)};
  }
  &:active {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.1, theme.bg7)};
  }
`

export const TokensList = styled.div`
  margin: 0px 12px;
  border-radius: 0px 0px 20px 20px;
  background: ${({ theme }) => theme.bgG14};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  `};
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

  ${({ theme }) => theme.mediaWidth.upToSmall`  
    > div:last-child {
      padding-right: 100px;
    }

    > div {
      padding: 0px 60px;
    }

    grid-template-columns: 1fr 300px 3fr 3fr;
  `};
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr 60px;
  grid-gap: 25px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr;
  `};
`

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 36px;
  background: ${({ theme }) => theme.bg7};
`

export const TokenCard = styled(BodyRow)`
  display: grid;
  grid-template-columns: 2fr 2fr 3fr 2fr 2fr 2fr 2fr 1fr;
  height: 80px;
  min-width: 1024px;

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

export const SmallModal = styled(RedesignedWideModal)`
  max-width: 450px !important;
  width: 450px;
`

export const SmallModalWrapper = styled(ModalBlurWrapper)`
  min-width: 450px;
`

export const FormWrapper = styled.div`
  padding: 24px 24px 20px 24px;
  background: ${({ theme }) => theme.bg18};
  border-radius: 16px;

  > div {
    margin-bottom: 20px;
  }
`

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr;
  `};
`
