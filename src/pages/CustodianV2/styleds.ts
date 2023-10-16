import styled, { css } from 'styled-components'
import { Box } from 'rebass'

import { ArrowWrapper } from 'components/swap/styleds'
import { SearchInput } from 'components/SearchModal/styleds'
import { DarkBlueCard } from 'components/Card'
import { TYPE } from 'theme'
import { BodyWrapper } from 'pages/AppBody'

import { ReactComponent as Tradable } from '../../assets/images/tradable.svg'
import { ReactComponent as NonTradable } from '../../assets/images/non-tradable.svg'

export const cardCommonStyles = css`
  border-radius: 6px;
  padding: 14px;
  // backdrop-filter: blur(20px);
  // -webkit-backdrop-filter: blur(20px);
`

export const StyledBodyWrapper = styled(BodyWrapper)`
  background: ${({ theme }) => theme.config.background?.secondary || 'transparent'};
  width: 100%;
  max-width: 1270px;
  padding-top: 0px;
`

export const MySecTokensTab = styled(Box)`
  padding: 32px;
  background: ${({ theme }) => theme.bg0};
  border-radius: 8px;
  border: 1px solid #e6e6ff;
`

export const MySecTokensGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: repeat(2, 1fr);;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
  grid-template-columns: 1fr;
`};
`

export const MySecTokenCard = styled(Box)<{ isPending: boolean }>`
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e6e6ff;
  // background: ${({ isPending, theme }) => (isPending ? theme.bgG14 : theme.bgG18)};
  ${cardCommonStyles};
`

export const GradientText = styled.div`
  background: ${({ theme }) => theme.borderG2};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const Divider = styled.div`
  margin: 30px 0px;
  height: 2px;
  background: ${({ theme }) => theme.borderG3};
  opacity: 0.2;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 20px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
`

export const FeaturedTokensGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 28px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: repeat(2, 1fr);
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr;
  `};
`

export const FeaturedTokenCard = styled.div`
  background: ${({ theme }) => theme.bg0};
  border: 1px solid #e6e6ff;
  padding: 15px 24px 26px 24px;
  ${cardCommonStyles};
`

export const StyledArrowWrapper = styled(ArrowWrapper)`
  width: 25px;
  height: 25px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledSearchInput = styled(SearchInput)`
  background: ${({ theme }) => theme.bg0};
  color: ${({ theme }) => theme.text2};
  width: 40%;
  margin-right: 16px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
  width: 100%; 
  margin-bottom: 16px;
  padding: 16px 22px;
  `};
`

export const StyledDarkBlueCard = styled(DarkBlueCard)<{ isOpen: boolean }>`
  background-color: ${({ theme, isOpen }) => (isOpen ? theme.bg1 : theme.bg0)};
  color: ${({ theme, isOpen }) => (isOpen ? theme.text6 : theme.text6)};
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  margin-right: 15px;
  padding: 15px 120px 15px 10px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 0px;
  `};
`

export const StyledButtonMuted = styled(TYPE.buttonMuted)`
  // background: rgba(145, 132, 196, 0.1);
  // border-radius: 16px;
  padding: 14px 8px;
`

export const StyledTradable = styled(Tradable)`
  ${({ theme }) =>
    theme.config.elements?.main &&
    css`
      g {
        circle {
          fill: ${theme.config.elements?.main};
        }
        path {
          fill: white;
        }
      }
    `}
`

export const StyledNonTradable = styled(NonTradable)`
  ${({ theme }) =>
    theme.config.elements?.main &&
    css`
      g {
        circle {
          fill: ${theme.config.elements?.main};
        }
        path {
          fill: white;
        }
      }
    `}
`
