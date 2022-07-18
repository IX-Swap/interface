import styled, { css } from 'styled-components'
import { Accordion } from '@material-ui/core'

import { ReactComponent as Close } from 'assets/images/cross.svg'
import { MEDIA_WIDTHS, ModalContentWrapper } from 'theme'
import { ReactComponent as Expand } from 'assets/images/chevron.svg'

export const FiltersButton = styled.div<{ 'have-value': boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 40px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.bg19};
  color: ${({ theme }) => theme.text9};
  padding: 10px 20px;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  gap: 14px;
  cursor: pointer;
  ${(props) =>
    props['have-value'] &&
    css`
      font-weight: 600;
      color: ${({ theme }) => theme.text1};
      background-color: ${({ theme }) => theme.bg7};
    `}
`

export const FiltersCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  min-width: 20px;
  height: 20px;
  min-height: 20px;
  border: 1px solid ${({ theme }) => theme.text1};
  color: ${({ theme }) => theme.text1};
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  border-radius: 50%;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  padding: 12px;
  color: ${({ theme }) => theme.text2};
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  position: relative;
`
export const CloseIcon = styled(Close)`
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
`

export const Hr = styled.div`
  min-height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.bg7};
`

export const StyledAccordion = styled(Accordion)`
  width: 100%;
  color: white !important;
  margin: 0px !important;
  border: none !important;
  background-color: transparent !important;
  :before {
    display: none;
  }
  .MuiAccordionSummary-content {
    margin: 0px !important;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.text1};
  }
  .MuiAccordionSummary-root {
    padding: 0px 20px 0px 12px;
    min-height: 28px !important;
    .MuiIconButton-edgeEnd {
      margin-right: 0px;
    }
    .MuiIconButton-root {
      padding: 0px;
    }
  }
  .MuiAccordionDetails-root {
    display: grid;
    row-gap: 12px;
    padding: 16px 14px 0px 12px;
    margin: 0px;
  }
`

export const ExpandIcon = styled(Expand)`
  transform: rotate(90deg);
`

export const ModalContent = styled(ModalContentWrapper)`
  /* padding: 24px 0px; */
  border-radius: 20px;
  row-gap: 12px;
  display: flex;
  flex-direction: column;
  min-width: 360px;
  min-height: 640px;
  max-width: 360px;
  max-height: 640px;
  width: 100%;
  height: 100%;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    /* border-radius: 0px; */
    /* max-width: 100vw;
    max-height: 100vh; */
    min-width: 100%;
    min-height: 100%;
  }
`

export const FiltersContainer = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
  row-gap: 12px;
  display: flex;
  flex-direction: column;
  .checkbox {
    width: 100%;
    > div {
      flex-direction: row-reverse;
      justify-content: space-between;
      width: 100%;
    }
  }
  .dateInput {
    input {
      height: 40px;
    }
    svg {
      width: 18px;
      height: 20px;
      top: 10px;
      right: 10px;
    }
  }
`

export const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 20px 12px 24px;
  > button {
    min-height: 40px;
    height: 40px;
    width: 100%;
  }
`
