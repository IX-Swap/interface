import { text17, text2, text45, text51 } from 'components/LaunchpadMisc/typography'
import styled from 'styled-components'

export const HeaderLabel = styled.div`
  ${text17}
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};

  display: flex;
  flex-flow: row nowrap;
  cursor: pointer;
`
export const ExtractButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
export const ExtractText = styled.div`
  ${text45}
  color: ${(props) => props.theme.launchpad.colors.primary};
  margin-left: 10px;
`
export const TableTitle = styled.div`
  ${text2}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
