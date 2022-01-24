import styled, { css } from 'styled-components'
import { Box } from 'rebass'

import { BodyWrapper } from 'pages/AppBody'

const cardCommonStyles = css`
  border-radius: 30px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`

export const StyledBodyWrapper = styled(BodyWrapper)`
  background: transparent;
  max-width: 100%;
`

export const MySecTokensTab = styled(Box)`
  padding: 32px;
  background: radial-gradient(
      53.24% 225.7% at 49.91% 82.11%,
      rgba(123, 66, 169, 0.028) 0%,
      rgba(237, 3, 118, 0.014) 100%
    ),
    rgba(15, 5, 24, 0.7);
  border-radius: 30px;
  border: 2px solid rgb(123, 66, 169);
`

export const MySecTokensGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
`

export const MySecTokenCard = styled(Box)<{ isPending: boolean }>`
  padding: 24px;
  border-radius: 30px;
  background: ${({ isPending }) =>
    isPending
      ? 'radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.033) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.5)'
      : 'radial-gradient(83.59% 55.66% at 2.38% 3.84%, rgba(123, 66, 169, 0.39) 0%, rgba(26, 18, 58, 0) 100%), radial-gradient(50.28% 108.33% at 73.7% 9%, rgba(102, 20, 206, 0.165) 1.94%, rgba(26, 18, 58, 0) 100%), radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.33) 0%, rgba(26, 18, 58, 0) 100%), rgba(44, 37, 74, 0.3)'};
  ${cardCommonStyles};
`

export const GradientText = styled.div`
  background: linear-gradient(116.36deg, rgb(123, 66, 169) 33.43%, rgb(237, 3, 118) 95.41%), rgb(12, 70, 156);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const Divider = styled.div`
  margin: 30px 0px;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(237, 206, 255, 0) 0%,
    #edceff 4.92%,
    #edceff 94.53%,
    rgba(237, 206, 255, 0) 98.88%
  );
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
`

export const FeaturedTokenCard = styled.div`
  background: radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.033) 0%, rgba(26, 18, 58, 0) 100%),
    rgba(44, 37, 74, 0.5);
  padding: 26px 24px;
  ${cardCommonStyles};
`
