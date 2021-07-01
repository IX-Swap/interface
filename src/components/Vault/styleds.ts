import { RowCenter } from 'components/Row'
import styled from 'styled-components'

export const NotSubmittedWrapper = styled.div`
  background: ${({ theme }) => theme.bgG10};
  border-radius: 45px;
  padding: 2rem 14px 3rem;
  position: relative;
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 45px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    padding: 2px;
    background: ${({ theme }) => theme.borderG1};
  }
`
export const NotSubmittedTitle = styled.span`
  text-transform: uppercase;
  text-align: center;
`
export const NotSubmittedDescription = styled.span`
  text-align: center;
`

export const ButtonRow = styled(RowCenter)`
  gap: 26px;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 3rem;
`
