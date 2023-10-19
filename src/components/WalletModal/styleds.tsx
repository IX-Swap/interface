import styled from 'styled-components/macro'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { TipCard } from '../Card'

export const CloseIcon = styled.div`
  position: absolute;
  right: 3rem;
  top: 20px;
  opacity: 0.5;
  &:hover {
    cursor: pointer;
    opacity: 0.3;
  }
`

export const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

export const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
  border-radius: 8px;
  min-width: 400px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
     min-width: unset;
  `};
`

export const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

export const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg0};
  padding: 0 1rem 1rem 1rem;

  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0 1rem 1rem 1rem`};
`

export const UpperSection = styled.div`
  position: relative;
  padding: 25px;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

export const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`

export const HoverText = styled.div`
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`

export const TermsCard = styled(TipCard)`
  opacity: 0.6;
  border-radius: 20px;
`
