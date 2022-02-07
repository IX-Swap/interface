import styled, { css } from 'styled-components'
import { Box } from 'rebass'

import { BodyWrapper } from 'pages/AppBody'
import { ArrowWrapper } from 'components/swap/styleds'
import { SearchInput } from 'components/SearchModal/styleds'
import { DarkBlueCard } from 'components/Card'

export const cardCommonStyles = css`
  border-radius: 30px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`

export const StyledBodyWrapper = styled(BodyWrapper)`
  background: transparent;
  max-width: 1400px;
  width: 100%;
`

export const MySecTokensTab = styled(Box)`
  padding: 32px;
  background: ${({ theme }) => theme.bgG17};
  border-radius: 30px;
  border: 2px solid rgb(123, 66, 169);
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
  border-radius: 30px;
  background: ${({ isPending, theme }) => (isPending ? theme.bgG14 : theme.bgG18)};
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
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 28px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: repeat(2, 1fr);
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr;
  `};
`

export const FeaturedTokenCard = styled.div`
  background: ${({ theme }) => theme.bgG14};
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
  background: ${({ theme }) => theme.bg19};
  color: ${({ theme }) => theme.text2};
`

export const StyledDarkBlueCard = styled(DarkBlueCard)<{ isOpen: boolean }>`
  background-color: ${({ theme, isOpen }) => (isOpen ? theme.bg7 : theme.bg19)};
  color: ${({ theme, isOpen }) => (isOpen ? theme.text2 : theme.text9)};
`
