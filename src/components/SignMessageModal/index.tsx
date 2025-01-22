import React from 'react'

import { Container, Title, Desc, ActionWrapper } from './styled'
import signIcon from 'assets/svg/signIcon.svg'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { useLogout } from 'state/auth/hooks'
import { useWalletState } from 'state/wallet/hooks'
import { useLocalization } from 'i18n'
import { buttons } from 'polished'

interface SignMessageModalProps {
  loading?: boolean
  authenticate: () => void
}

const SignMessageModal: React.FC<SignMessageModalProps> = ({ authenticate }) => {
  const { isSignLoading } = useWalletState()
  const { disconnectWallet } = useLogout()
  const { t } = useLocalization();

  return (
    <Container>
      <div>
        <img src={signIcon} alt="signIcon" />
      </div>

      <Title>{t('labels.verifyTitle')}</Title>

      <Desc>{t('labels.verifyDesc')}</Desc>

      <ActionWrapper>
        <OutlineButton style={{ border: '1px solid #6666FF33', width: '100%' }} onClick={() => disconnectWallet()}>
          {t('buttons.cancel')}
        </OutlineButton>
        <FilledButton
          style={{ boxShadow: '0px 16px 16px 0px #6666FF21', width: '100%' }}
          disabled={isSignLoading}
          onClick={() => authenticate()}
        >
          {isSignLoading ? <LoaderThin size={12} /> : null} {t('buttons.signMessage')}
        </FilledButton>
      </ActionWrapper>
    </Container>
  )
}

export default SignMessageModal
