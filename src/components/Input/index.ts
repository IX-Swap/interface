import styled from 'styled-components/macro'

export const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '16px' : '36px')};
  background-color: ${({ theme, hideInput }) => (hideInput ? 'transparent' : theme.bg2)};
  z-index: 1;
  width: ${({ hideInput }) => (hideInput ? '100%' : 'initial')};
`

export const ContainerRow = styled.div<{ error?: boolean }>`
  outline: ${({ theme, error }) => (error ? `1px solid ${theme.error}` : 'none')};
  border-radius: 36px;
  background-color: ${({ theme }) => theme.bg7};
  width: 'initial';
  padding: 10px 31px 10px 27px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      boder-radius: 1rem;
  `};
`

export const InputContainer = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 0;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 0;
  `};
`

export const Input = styled.input<{ error?: boolean }>`
  font-size: 1.25rem;
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  background-color: ${({ theme }) => theme.bg7};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  text-align: left;
  font-size: 17px;
  line-height: 40px;
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
  padding: 0px;
  -webkit-appearance: textfield;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
    color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
    -webkit-box-shadow: ${({ theme: { bg12 } }) => `0 0 0px 1000px ${`${bg12}40`} inset`};
    transition: background-color 100000s ease-in-out 0s;
  }

  ::-webkit-autofill::first-line {
    font-family: 'Poppins', sans-serif;
  }

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text2};
    opacity: 0.5;
  }
`
export const Textarea = styled.textarea`
  resize: none;
  background-color: ${({ theme }) => theme.bg12};
  font-weight: 300;
  font-size: 16px;
  border-radius: 36px;
  width: 100%;
  outline: none;
  border: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::placeholder {
    color: #edceff50;
  }
  color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.text1)};
  padding: 16px 22px;
  margin-bottom: 31px;
  height: 308px;
`
