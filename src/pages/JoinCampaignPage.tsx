import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import TaskSuccessModal from 'components/Rewards/TaskSuccessModal'
import { Check } from 'react-feather'
import { text59, text9 } from 'components/LaunchpadMisc/typography'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton } from 'components/LaunchpadMisc/buttons'
import { ReactComponent as LeftConfettiSvg } from 'assets/svg/left-confetti.svg'
import { ReactComponent as RightConfettiSvg } from 'assets/svg/right-confetti.svg'
import { MEDIA_WIDTHS, TYPE } from 'theme'
import { Box, Stack } from '@mui/material'
import { Slide, toast } from 'react-toastify'
import { useLineReward } from 'providers/LineRewardProvider'
import { useWeb3React } from 'hooks/useWeb3React'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { LineRewardAction } from 'constants/lineRewards'

const JoinCampaignPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <PageWrapper>
      {/* TaskSuccessModal is opened by default */}
      <Popup show={isModalOpen} onClose={handleCloseModal} />
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => props.theme.launchpad.colors.background};
`

const Content = styled.div`
  text-align: center;
  color: ${(props) => props.theme.launchpad.colors.primary};
  padding: 20px;

  h1 {
    margin-bottom: 16px;
    font-size: 2rem;
  }

  p {
    font-size: 1.25rem;
    line-height: 1.5;
  }
`

interface Props {
  show: boolean
  onClose: () => void
}

const Popup = ({ show, onClose }: Props) => {
  const theme = useTheme()

  const handleClaimRewards = async () => {
    toast.success('You have successfully claimed the point reward.', {
      transition: Slide,
    })
    return
  }

  return (
    <IssuanceDialog show={show} onClose={onClose} padding="0" width="475px">
      <Wrapper>
        <LeftConfettiSvg className="left" />
        <Stack direction="column" alignItems="center" gap={4} p={2}>
          <OuterCircle>
            <InnerCircle>
              <Check color={theme.launchpad.colors.primary} size="20" />
            </InnerCircle>
          </OuterCircle>
          <Title>Joined IXS Academy successfully!</Title>
          <Box style={{ textAlign: 'center' }}>
            <TYPE.black color="text6">
              You&apos;ve earned <strong>{100} IXSurge</strong>.
            </TYPE.black>
            <TYPE.black color="text6">Keep going to unlock more rewards!</TYPE.black>
          </Box>
          <FilledButton onClick={handleClaimRewards} style={{ zIndex: 30, width: '100%' }}>
            <BtnLabel>Get IXSurge</BtnLabel>
          </FilledButton>
        </Stack>
        <RightConfettiSvg className="right" />
      </Wrapper>
    </IssuanceDialog>
  )
}

const ContainerCircle = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const InnerCircle = styled(ContainerCircle)`
  width: 30px;
  height: 30px;
  border: 1.5px solid #6666ff;
`
const OuterCircle = styled(ContainerCircle)`
  width: 80px;
  height: 80px;
  border: 1px solid rgba(230, 230, 255, 0.7);
`

const Title = styled.div`
  ${text59}
  color: ${(props) => props.theme.launchpad.colors.text.title};
  text-align: center;
  word-wrap: break-word;
  font-size: clamp(1.5rem, 2.5vw, 2rem); /* Adjust font size based on screen width */
  max-width: 90%; /* Limit the text width to prevent overflow */
  line-height: 1.4; /* Adds proper spacing between lines for better readability */
`

const BtnLabel = styled.div`
  ${text9}
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  > svg {
    position: absolute;
    top: 0;
    height: 100%;
    z-index: 10;
  }
  > svg.left {
    left: -9px;
  }
  > svg.right {
    right: -9px;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 20px;
  }
`

export default JoinCampaignPage
