import { Box } from 'rebass'
import styled, { css } from 'styled-components'
import { Unlock } from 'react-feather'

import { VioletCard } from 'components/Card'
import { Input, Textarea } from 'components/Input'
import { ellipsisText, MEDIA_WIDTHS, ModalContentWrapper } from 'theme'
import { ButtonGradientBorder } from 'components/Button'
import { ReactComponent as BurgerMenu } from 'assets/images/burger-menu.svg'
import { ReactComponent as Star } from 'assets/images/star.svg'
import { ReactComponent as Poll } from 'assets/images/poll.svg'
import { ReactComponent as Warning } from 'assets/images/warning.svg'
import { Input as NumericalInput } from 'components/NumericalInput'

export const Container = styled(Box)`
  height: fit-content;
  background: ${({ theme }) => theme.bg19};
  border-radius: 36px;
  padding: 40px 60px;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    padding: 20px 16px;
  }
`
export const StyledTab = styled.div`
  max-width: 90vw;
  padding-left: 50px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   padding-left: 15px;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   padding-left: 5px;
  `};
`

export const TraitsIcon = css`
  color: ${({ theme }) => theme.text1};
  width: 18px;
  height: auto;
  margin-right: 10px;
`
export const StyledListIcon = styled(BurgerMenu)`
  ${TraitsIcon}
`
export const StyledStarIcon = styled(Star)`
  ${TraitsIcon};
  width: 20px;
`
export const StyledBarChart = styled(Poll)`
  ${TraitsIcon}
`
export const StyledUnlock = styled(Unlock)`
  ${TraitsIcon}
`
export const StyledTriangle = styled(Warning)`
  ${TraitsIcon}
  width: 22px;
`

const inputStyles = css`
  padding: 18px 16px;
  border-radius: 36px;
  font-weight: normal;
  font-size: 16px;
  background-color: rgba(39, 31, 74, 0.4);
  :focus {
    background-color: ${({ theme: { bg7 } }) => bg7};
  }
  ::placeholder {
    font-weight: normal;
    font-size: 16px;
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${({ theme }) => `${theme.text2}50`};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    font-weight: normal;
    font-size: 16px;
    /* Internet Explorer 10-11 */
    color: ${({ theme }) => `${theme.text2}50`};
  }

  ::-ms-input-placeholder {
    font-weight: normal;
    font-size: 16px;
    /* Microsoft Edge */
    color: ${({ theme }) => `${theme.text2}50`};
  }
`

export const StyledInput = styled(Input)`
  ${inputStyles};
  height: 60px;
`

export const StyledSelect = styled(VioletCard)`
  ${inputStyles};
  height: 60px;
`

export const StyledNumericalInput = styled(NumericalInput)`
  ${inputStyles};
  height: 60px;
`

export const StyledCreateCollectionBtn = styled(ButtonGradientBorder)`
  min-height: 32px;
  height: 32px;
  font-size: 16px;
  line-height: 16px;
`
export const StyledTextarea = styled(Textarea)`
  ${inputStyles};
  height: 126px;
  border-radius: 18px;
`

export const PlusButton = styled(ButtonGradientBorder)`
  width: 32px;
  height: 32px;
  min-height: 32px;
  svg {
    min-width: 13px;
    min-height: 13px;
  }
`

export const HrLine = styled.div`
  margin-top: 24px;
  border: 1px solid ${({ theme }) => theme.text9};
`

export const StyledModalContentWrapper = styled(ModalContentWrapper)`
  border-radius: 20px;
  padding: 20px 32px;
  > button:last-child {
    height: 40px;
    min-height: 40px;
    font-size: 16px;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    padding: 16px;
  }
`

export const AddItemContainer = styled.div`
  width: calc(100% + 64px);
  border-top: 1px solid rgba(39, 32, 70, 0.72);
  border-bottom: 1px solid rgba(39, 32, 70, 0.72);
  margin: 24px 0 24px -32px;
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
  row-gap: 16px;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    width: calc(100% + 32px);
    margin: 24px 0 24px -16px;
    padding: 16px;
  }
`

export const AddNewItemButton = styled(ButtonGradientBorder)`
  height: 32px;
  min-height: 32px;
  margin: 0 auto;
  margin-top: 12px;
  font-size: 16px;
`

const deteleRowStyles = css`
  .delete-row {
    display: none;
    position: absolute;
    height: 100%;
    width: 40px;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.bg7};
    border-radius: 36px 0px 0px 36px;
    cursor: pointer;
  }
`

export const PropertyInputsNames = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 4px;
  margin-bottom: -8px;
  color: ${({ theme }) => theme.text2};
  font-size: 16px;
  line-height: 24px;
`

export const PropertyInputsContainer = styled.div<{ haveDelete?: boolean }>`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr;
  column-gap: 4px;
  row-gap: 8px;
  align-items: center;
  input:nth-child(2) {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    ${({ haveDelete }) =>
      haveDelete &&
      css`
        padding-left: 52px;
      `}
  }
  input:last-child {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  ${deteleRowStyles};
  ${({ haveDelete }) =>
    haveDelete &&
    css`
      .delete-row {
        display: flex;
      }
    `}
`

export const PropertyCard = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  border: 1px solid rgba(237, 206, 255, 0.3);
  border-radius: 8px;
  align-items: center;
  text-align: center;
  padding: 8px;
  font-weight: 600;
  width: 121px;
  > div {
    ${ellipsisText};
  }
  > div:first-child {
    font-size: 12px;
    color: ${({ theme }) => theme.text2};
  }
  > div:last-child {
    font-size: 14px;
    color: ${({ theme }) => theme.white};
  }
`

export const LevelInputsContainer = styled(PropertyInputsContainer)<{ haveDelete?: boolean }>`
  grid-template-columns: 1fr 1fr;
  > div {
    display: flex;
    align-items: center;
  }
  span {
    margin: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > div {
    input:first-child {
      border-radius: 0px;
    }
  }
`

export const LevelCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  background-color: ${({ theme }) => theme.bg1};
  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${ellipsisText};
    > div:first-child {
      font-size: 14px;
      color: ${({ theme }) => theme.white};
      font-weight: 600;
    }
    > div:last-child {
      font-size: 12px;
      color: ${({ theme }) => theme.text9};
    }
  }

  > div:last-child {
    > div {
      background: ${({ theme }) => theme.bg11};
      margin: 0;
    }
  }
`

export const StatCard = styled(PropertyCard)``

export const StyledToggle = styled.div`
  button {
    border: none;
    height: 24px;
    width: 40px;
    padding: 4px;
    box-shadow: none;
    > span {
      padding: 8px;
    }
    > span:last-child {
      background: ${({ theme }) => theme.text7};
    }
  }
`

export const UploaderCard = styled.div<{ isLogo?: boolean; isAudio?: boolean }>`
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ isAudio }) => (isAudio ? '125px' : '192px')};
  ${({ isAudio }) =>
    isAudio &&
    css`
      padding: 0 16px 16px;
    `};
  width: 100%;
  background: rgba(15, 5, 24, 0.7);
  border: 1px dashed ${({ theme }) => theme.text9};
  border-radius: 12px;
  cursor: pointer;
  ${({ isLogo }) =>
    isLogo &&
    css`
      margin-right: 16px;
      height: 140px;
      width: 140px;
      border-radius: 50%;
      background: ${({ theme }) => theme.bg1};
      > div > div {
        color: white;
        white-space: break-spaces;
      }
    `}
`

export const StyledPreview = styled.div<{ isLogo?: boolean }>`
  height: 100%;
  width: 100%;
  > div {
    border: none;
    padding: 0px;
    > :first-child {
      border-radius: 12px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      ${({ isLogo }) =>
        isLogo &&
        css`
          border-radius: 50%;
        `}
    }
    svg {
      position: absolute;
      top: 15px;
      right: 15px;
      ${({ isLogo }) =>
        isLogo &&
        css`
          top: 5px;
          right: 50%;
          transform: translateX(50%);
        `}
    }
  }
`

export const NewCollectionContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  textarea {
    margin-bottom: 8px;
  }
  > button:last-child {
    height: 40px;
    font-size: 16px;
  }
`

export const NewCollectionNameSizeRow = styled.div`
  display: grid;
  grid-template-columns: 7fr 5fr;
  column-gap: 15px;
  input {
    width: 100%;
  }
`
export const ChooseFileButton = styled(ButtonGradientBorder)`
  height: 32px;
  font-size: 14px;
  margin-top: 20px;
`
