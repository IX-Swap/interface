import { DarkCard } from 'components/Card'
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

export const RemovedLiquidityWrapper = styled(DarkCard)`
  padding-bottom: 5px;
`

export const ModalHeaderWrapper = styled.div`
  padding-bottom: 1rem;
  margin-left: 40px;
  margin-right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ModalBottomWrapper = styled.div`
  padding: 27px 40px 27px 40px;
  background: ${({ theme }) => theme.bgG7};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`
