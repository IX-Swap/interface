import styled from 'styled-components'

import { Column } from 'components/LaunchpadMisc/styled'
import { text1, text41, text53 } from 'components/LaunchpadMisc/typography'

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 855px 325px;
  grid-template-rows: 60px auto;
  grid-template-areas:
    'header header'
    'body sidebar';

  gap: 1.5rem;
  place-content: stretch;
  margin: 2rem auto;
  max-width: 1180px;
  padding-bottom: 10rem;
`

export const FormHeader = styled.div`
  grid-area: header;
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const FormTitle = styled.div`
  ${text53}

  text-transform: capitalize;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`

export const FormBody = styled.div`
  grid-area: body;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 2.5rem;
`
export const ShortFormBody = styled(FormBody)`
  gap: 1rem;
  margin-top: 1rem;
`
export const FormSideBar = styled.div`
  grid-area: sidebar;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 1.5rem;
`

export const FormSubmitContainer = styled.div<{ error?: string }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 0.5rem;
  padding: 1.5rem;
  max-height: 215px;
  border: 1px solid
    ${(props) =>
      props.error ? props.theme.launchpad.colors.border.error : props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

export const FormFieldWrapper = styled(Column)<{ span?: number; error?: string }>`
  ${(props) => !props.error && `padding-bottom: 0.5rem;`}
  ${(props) => props.span && `grid-column: span ${props.span};`}
`

export const OptionalLabel = styled.span`
  ${text41}
  text-transform: uppercase;
  margin: 0 0.5rem;
  color: ${(props) => props.theme.launchpad.colors.text.caption};
`

export const DeleteButton = styled.button`
  border: none;
  background: none;
  border-radius: 50%;
  display: grid;
  place-content: center;
  cursor: pointer;
  width: 36px;
  height: 36px;

  :hover {
    background: ${(props) => props.theme.launchpad.colors.foreground};
  }
`
export const AddButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  max-height: 36px;
  margin: auto 0;

  ${text1}
  cursor: pointer;

  color: ${(props) => props.theme.launchpad.colors.primary};

  padding: 0.25rem;
  border: none;
  border-radius: 6px;
  background: none;

  :hover {
    background: ${(props) => props.theme.launchpad.colors.foreground};
  }
`
