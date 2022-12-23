import styled from 'styled-components'

export const FormContainer = styled.div`
  display: grid;

  grid-template-columns: 855px 325px;
  grid-template-rows: 60px auto;
  grid-template-areas:
    "header header"
    "body sidebar";

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
  font-style: normal;
  font-weight: 800;
  font-size: 32px;

  line-height: 120%;
  letter-spacing: -0.03em;

  text-transform: capitalize;

  color: ${props => props.theme.launchpad.colors.text.title};
`

export const FormBody = styled.div`
  grid-area: body;

  display: flex;
  flex-flow: column nowrap;

  align-items: stretch;

  gap: 2.5rem;
`

export const FormSideBar = styled.div`
  grid-area: sidebar;

  display: flex;

  flex-flow: column nowrap;
  align-items: stretch;

  gap: 1.5rem;

`

export const FormSubmitContainer = styled.div`
  display: flex;

  flex-flow: column nowrap;
  align-items: stretch;

  gap: 0.5rem;
  padding: 1.5rem;

  max-height: 215px;
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`
