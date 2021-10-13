import styled from 'styled-components/macro'
import { Box } from 'rebass/styled-components'

const Card = styled(Box)<{ width?: string; padding?: string; border?: string; borderRadius?: string }>`
  width: ${({ width }) => width ?? '100%'};
  border-radius: 16px;
  padding: 1rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`
export default Card

export const LightCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`

export const LightGreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg2};
`

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg3};
`

export const DarkGreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg2};
`

export const OutlineCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.bg3};
`

export const YellowCard = styled(Card)`
  background-color: rgba(243, 132, 30, 0.05);
  color: ${({ theme }) => theme.yellow3};
  font-weight: 500;
`
export const VioletCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.text2};
  font-weight: 500;
`
export const PinkCard = styled(Card)`
  background-color: rgba(255, 0, 122, 0.03);
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;
`

export const BlueCard = styled(Card)`
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.blue2};
  border-radius: 12px;
`

export const TipCard = styled(Card)`
  border-radius: 45px;
  font-size: 12px;
  line-height: 18px;
  padding: 20px 35px;
  text-align: left;
  background: ${({ theme }) => theme.bgG12};
  color: ${({ theme }) => theme.text2};
`

export const EmptyStateInfoCard = styled(Card)`
  border-radius: 45px;
  padding: 0 17px;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 10px;
  min-height: 177px;
  flex-direction: column;
  background: ${({ theme }) => theme.bgG13};
  color: ${({ theme }) => theme.text2};
  @media (max-width: 500px) {
    min-height: fit-content;
    padding: 1rem;
  }
`

export const DarkCard = styled(Card)`
  background: ${({ theme }) => theme.bgG4};
  backdrop-filter: blur(4px);
  border-radius: 20px;
  padding: 26px 36px 40px 36px;
  @media (max-width: 500px) {
    padding: 16px;
  }
`
export const SwapErrorCard = styled(DarkCard)`
  padding: 20px 36px;
  text-align: left;
`
