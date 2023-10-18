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

  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bg1};
  border: 1px solid #e6e6ff;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   padding: 27px 22px 27px 10px;
     margin-left: 10px;
  margin-right: 10px;
  `};
`
export const ModalBottomWrapper = styled.div`
  padding: 27px 40px 27px 40px;
  background: ${({ theme }) => theme.bg25};
  // border-bottom-left-radius: 20px;
  // border-bottom-right-radius: 20px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
 padding: 27px 26px 27px 16px;
  `};
`
