import Card from 'components/Card'
import { MaxButton } from 'pages/Pool/styleds'
import { Text } from 'rebass'
import styled from 'styled-components/macro'
import AppBody from '../AppBody'

export const Wrapper = styled.div`
  position: relative;
  padding: 20px;
  min-width: 460px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    min-width: 340px;
  `};
`

export const SmallMaxButton = styled(MaxButton)`
  font-size: 12px;
`

export const ResponsiveHeaderText = styled(Text)`
  font-size: 40px;
  font-weight: 500;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
     font-size: 24px
  `};
`

export const RemoveAmountTitle = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text2};
`
export const RemoveAmountWrapper = styled(Card)`
  background: ${({ theme }) => theme.bgGradientDark}
  backdrop-filter: blur(4px);
  border-radius: 20px;
  padding: 26px 36px 40px 36px;
`

export const RemovedLiquidityWrapper = styled(RemoveAmountWrapper)`
  padding-bottom: 5px;
`

export const RemoveLiquidityBody = styled(AppBody)`
  background: ${({ theme }) => theme.bgGradientDarkAppBody};
`
