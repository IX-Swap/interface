import { Text } from 'rebass'
import styled from 'styled-components/macro'

import { LightCardNew } from 'components/Card'
import { MaxButton } from 'pages/Pool/styleds'

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
  text-align: center;
  color: ${({ theme }) => theme.text12};
`

export const RemovedLiquidityWrapper = styled(LightCardNew)`
  padding-bottom: 5px;
`

export const ModalHeaderWrapper = styled.div`
  padding-bottom: 1rem;
  padding: 27px 40px 27px 40px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bg23};
  border: 1px solid #e6e6ff;
`
export const ModalBottomWrapper = styled.div`
  padding: 27px 40px 27px 40px;
  background: ${({ theme }) => theme.bg25};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`
