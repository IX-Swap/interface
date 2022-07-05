import Row from 'components/Row'
import styled from 'styled-components'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { ExternalLink } from '../../theme'
import { ButtonSecondary } from '../Button'

export const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  padding: 40px;
  padding-bottom: 0;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

export const UpperSection = styled.div`
  position: relative;
  background: ${({ theme }) => theme.bgG4};
`

export const InfoCard = styled.div`
  padding: 1rem;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 13px;
`

export const AccountGroupingRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;

  color: ${({ theme }) => theme.text1};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`

export const AccountSection = styled.div`
  padding: 0rem 1rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0rem 1rem 1.5rem 1rem;`};
`

export const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`

export const LowerSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1.5rem 2.5rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg11};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.text3};
  }
`

export const AccountControl = styled(Row)`
  margin-top: 17px;
  align-items: center;
`

export const AddressLink = styled(ExternalLink)<{ hasENS: boolean; isENS: boolean }>`
  display: flex;
  :hover {
    opacity: 0.7;
  }
`

export const CloseIcon = styled.div`
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

export const CloseColor = styled(Close)`
  width: 22px;
  height: 22px;
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

export const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`
export const IconWrapperWithBg = styled(IconWrapper)<{ bg?: string; padding?: string }>`
  background-color: ${({ theme, bg }) => bg ?? theme.bg13};
  padding: ${({ padding }) => padding ?? '2px 4px'};
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  min-height: 24px;
`

export const TransactionListWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  gap: 4px;
`

export const WalletAction = styled(ButtonSecondary)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export const MainWalletAction = styled(WalletAction)`
  color: ${({ theme }) => theme.primary1};
`
