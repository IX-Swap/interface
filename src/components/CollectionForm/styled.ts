import styled, { css } from 'styled-components'

import { Input, Textarea } from 'components/Input'
import { gradientBorder, ellipsisText, MEDIA_WIDTHS } from 'theme'
import Upload from 'components/Upload'

const uploadStyles = css`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    display: none;
  }
  > div {
    width: 100%;
    height: 100%;
    > div {
      border: none;
      padding: 0;
    }
  }
`

export const Container = styled.div`
  padding: 40px 64px;
  background: rgba(39, 32, 70, 0.4);
  border-radius: 36px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 20px 32px;
  }
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
export const StyledTextarea = styled(Textarea)`
  ${inputStyles}
  margin-bottom: 0;
`
export const Row = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  column-gap: 24px;
  row-gap: 32px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: 1fr;
  }
`

export const ImagesContainer = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 32px;
  gap: 32px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: column;
    align-items: center;
    > div {
      width: 100%;
      align-items: center;
    }
  }
`

export const LogoUploader = styled.div<{ file: boolean }>`
  padding: 6px;
  position: relative;
  width: 172px;
  height: 172px;
  border: 1px dashed rgba(237, 206, 255, 0.5);
  border-radius: 50%;
  background-color: ${({ file }) => (file ? 'transparent' : 'rgba(15, 5, 24, 0.7)')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    display: none;
  }
  > div:first-child {
    ${uploadStyles}
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    left: 6px;
    top: 6px;
    img {
      border-radius: 50%;
    }
  }
`
export const CoverUploader = styled.div<{ file: boolean }>`
  padding: 10px;
  position: relative;
  width: 320px;
  height: 172px;
  text-align: center;
  svg {
    display: none;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px dashed rgba(237, 206, 255, 0.5);
  background-color: ${({ file }) => (file ? 'transparent' : 'rgba(15, 5, 24, 0.7)')};
  > img {
    margin-bottom: 8px;
  }
  > div:first-child {
    ${uploadStyles}
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    left: 10px;
    top: 10px;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 100%;
  }
`

export const UploadText = styled.div`
  font-weight: 600;
  font-size: 10px;
  color: rgba(237, 206, 255, 0.5);
  text-align: center;
  span {
    background: ${({ theme: { bgG3 } }) => bgG3};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

export const DeleteImage = styled.div<{ isLogo?: boolean }>`
  position: absolute;
  z-index: 3;
  cursor: pointer;
  ${({ isLogo }) =>
    isLogo
      ? css`
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        `
      : css`
          right: 23px;
          top: 23px;
        `}
`

export const ImageTitle = styled.div`
  color: ${({ theme: { text2 } }) => text2};
  margin-bottom: 8px;
`

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 56px;
  flex-wrap: wrap;
  row-gap: 32px;
  button {
    height: 40px;
    font-weight: 600;
    font-size: 16px;
  }
  > button:not(:first-child) {
    color: ${({ theme: { error } }) => error};
  }
`
