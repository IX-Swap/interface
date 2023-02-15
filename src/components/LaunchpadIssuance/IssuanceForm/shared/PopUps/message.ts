import { text3 } from 'components/LaunchpadMisc/typography'
import styled from 'styled-components'

export const Message = styled.div`
  grid-area: message;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 0.5rem;
`
export const MessageTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 130%;
  letter-spacing: -0.03em;
  text-align: center;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

export const MessageSubtitle = styled.div`
  ${text3}
  text-align: center;
  max-width: 80%;
  color: ${(props) => props.theme.launchpad.colors.text.body};
`
