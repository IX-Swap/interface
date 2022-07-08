import styled, { css } from 'styled-components'

import { ButtonIXSGradient } from 'components/Button'
import { gradientBorder } from 'theme'

const commonStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 32px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 30px;
  font-size: 16px;
  line-height: 150%;
`

export const Container = styled.div`
  ${commonStyles}
  background: ${({ theme }) => theme.bgG12};
  ${gradientBorder}
  :before {
    border-radius: 30px;
    padding: 1px;
  }
`

export const StyledButtonIXSGradient = styled(ButtonIXSGradient)`
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  max-height: 40px;
  min-height: 40px;
  border-radius: 40px;
  padding: 12px 24px;
`

export const FuturePayoutContainer = styled.div`
  ${commonStyles}
  background: radial-gradient(76.91% 60% at 2.38% 3.84%, rgba(123, 66, 169, 0.39) 0%, rgba(26, 18, 58, 0) 100%),
    radial-gradient(79.76% 116.06% at 44.22% 136.36%, rgba(102, 20, 206, 0.132) 0%, rgba(26, 18, 58, 0) 100%),
    radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.198) 0%, rgba(26, 18, 58, 0) 100%),
    rgba(44, 37, 74, 0.3);
`
