import React from 'react'

import { Container, Title, Desc, ActionWrapper } from './styled'
import signIcon from 'assets/svg/signIcon.svg'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { useLogout } from 'state/auth/hooks'
import { useWalletState } from 'state/wallet/hooks'

interface SignMessageModalProps {
  loading?: boolean
  authenticate: () => void
}

const SignMessageModal: React.FC<SignMessageModalProps> = ({ authenticate }) => {
  const { isSignLoading } = useWalletState()
  const { disconnectWallet } = useLogout()

  return (
    <Container>
      <div>
        <img src={signIcon} alt="signIcon" />
      </div>

      <Title>Verify your account</Title>

      <Desc>Please sign the message in your wallet to verify your account ownership</Desc>

      <ActionWrapper>
        <OutlineButton style={{ border: '1px solid #6666FF33', width: '100%' }} onClick={() => disconnectWallet()}>
          Cancel
        </OutlineButton>
        <FilledButton
          style={{ boxShadow: '0px 16px 16px 0px #6666FF21', width: '100%' }}
          disabled={isSignLoading}
          onClick={() => authenticate()}
        >
          {isSignLoading ? <LoaderThin size={12} /> : null} Sign Message
        </FilledButton>
      </ActionWrapper>
    </Container>
  )
}

export default SignMessageModal
