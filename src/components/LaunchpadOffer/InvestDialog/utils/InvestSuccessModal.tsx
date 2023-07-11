import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Check } from 'react-feather'
import { text59, text9 } from 'components/LaunchpadMisc/typography'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton } from 'components/LaunchpadMisc/buttons'
import { ReactComponent as LeftConfettiSvg } from 'assets/svg/left-confetti.svg'
import { ReactComponent as RightConfettiSvg } from 'assets/svg/right-confetti.svg'

interface Props {
  show: boolean
  onClose: () => void
}

export const InvestSuccessModal = ({ show, onClose }: Props) => {
  const theme = useTheme()

  return (
    <IssuanceDialog show={show} onClose={onClose} padding="0">
      <Wrapper>
        <LeftConfettiSvg className="left" />
        <Container>
          <OuterCircle>
            <InnerCircle>
              <Check color={theme.launchpad.colors.primary} size="20" />
            </InnerCircle>
          </OuterCircle>
          <Title>Order Successful</Title>
          <FilledButton width="384px" onClick={onClose} style={{ zIndex: 30 }}>
            <BtnLabel>Close</BtnLabel>
          </FilledButton>
        </Container>
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

const Container = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;

  gap: 2rem;
  padding: 3rem;
`

const Title = styled.div`
  ${text59}
  color: ${(props) => props.theme.launchpad.colors.text.title};
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
`
