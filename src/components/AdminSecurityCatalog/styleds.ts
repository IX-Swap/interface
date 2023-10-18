import styled from 'styled-components'
import { darken } from 'polished'

import { ButtonGradientBorder, ButtonGray } from 'components/Button'
import { BodyRow } from 'components/Table'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ModalBlurWrapper } from 'theme'

export const StyledButtonGradientBorder = styled(ButtonGradientBorder)`
  white-space: nowrap;
  font-size: 13px;
  padding: 12px 16px;
  backgroundcolor: #6666ff;
  color: #ffffff;
  borderradius: 6px;
`

export const CardHeader = styled(BodyRow)`
  display: flex; /* Use flexbox to align items horizontally */
  align-items: center;
  height: 80px;
  margin-bottom: 0px;
  background: #ffffff;
  padding: 60px 10px;

  .left-side {
    display: flex; /* Nested flex container for left-side elements */
    align-items: center;
    margin-right: auto; /* Push the left-side elements to the left */
  }

  > div:first-child {
    // padding-left: 55px;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr 1fr 1fr 1fr;

    > div:first-child {
      padding-left: 10px;
    }
  `};
`

export const EditButton = styled(ButtonGray)`
  height: 32px;
  border-radius: 40px;
  max-width: 162px;
  font-size: 14px;
  background-color: rgba(55, 46, 94, 0.42);
  width: 109px;
  padding: 0px;
  color: ${({ theme }) => theme.text1};
  
}

`

export const NewEditButton = styled.div`
  padding: 12px 16px;
  border: 1px solid #e6e6ff;
  background-color: #ffffff;
  width: 173px;
  height: 47px;
  border-radius: 8px;
  color: #6666ff;
  text-align: center;
  cursor: pointer;
`

export const EditWrapper = styled.div`
  width: 109px;
  padding: 0px; 
  margin-left: auto;
  cursor: pointer;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  width: auto;
  margin-left: 30px;
  `};
  
}
`

export const TokensList = styled.div`
  // margin: 0px 12px;
  // border-radius: 0px 0px 20px 20px;
  background: #ffffff;
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
  grid-template-columns: 0.2fr 1fr 1fr;
  grid-gap: 25px;
  margin-left: 50px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr;
  `};
`

export const Logo = styled.div<{ error?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 6px;
  // background: ${({ theme }) => theme.bg7};
  // border: ${({ error, theme }) => (error ? `1px solid ${theme.error}` : 'none')};
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
  // padding: 24px 24px 20px 24px;
  // background: ${({ theme }) => theme.bg18};
  border-radius: 16px;

  > div {
    margin-bottom: 20px;
  }
`

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr 1fr;
  grid-gap: 20px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr;
  `};
`

export const NewFormRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.1fr 1.1fr 1fr;
  grid-gap: 20px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr;
  `};
`
export const NewFormRowDescriptions = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 5fr;
  grid-gap: 0px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr;
  `};
`

export const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
`
