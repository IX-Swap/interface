import React from 'react'
import styled, { useTheme } from 'styled-components'

import { AlertCircle } from 'react-feather'
import { text59, text9 } from 'components/LaunchpadMisc/typography'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton } from 'components/LaunchpadMisc/buttons'
import { MEDIA_WIDTHS } from 'theme'

interface Props {
  show: boolean
  onClose: () => void
}

export const InvestFailedModal = ({ show, onClose }: Props) => {
  const theme = useTheme()

  return (
    <IssuanceDialog show={show} onClose={onClose} padding="0">
      <Wrapper>
        <Container>
          <OuterCircle>
            <AlertCircle color={theme.launchpad.colors.info} size="40" />
          </OuterCircle>
          <Title>Order Failed</Title>
          <FilledButton width="384px" onClick={onClose} style={{ zIndex: 30 }}>
            <BtnLabel>Try Again</BtnLabel>
          </FilledButton>
        </Container>
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
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 20px;
  }
`
