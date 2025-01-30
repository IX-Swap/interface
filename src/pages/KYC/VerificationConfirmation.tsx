import React from 'react'
import styled from 'styled-components'
import { ReactComponent as CheckIcon } from 'assets/images/newRoundCheck.svg'
import { MEDIA_WIDTHS, TYPE } from 'theme'
import { PinnedContentButton } from 'components/Button'
import { useLocalization } from 'i18n'

const VerificationConfirmation = () => {
  const { t } = useLocalization()

  return (
    <Container>
      <CenteredDiv>
        <TYPE.title9 lineHeight={'30px'} fontSize={'20px'} maxWidth={'300px'} margin={'auto'}>
          {t('kyc.individual.emailVerification.confirmation.title')}
        </TYPE.title9>
        <StyledButton>
          <FlexDiv>
            <CheckIcon />
            <TYPE.black fontSize={'14px'}>{t('kyc.individual.emailVerification.confirmation.status')}</TYPE.black>
          </FlexDiv>
        </StyledButton>
      </CenteredDiv>
    </Container>
  )
}

export default VerificationConfirmation

const Container = styled.div`
  border: 1px solid #24e49f;
  margin-top: 28px;
  height: 252px;
  padding: 64px;
  background: #e9fcf5;

  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    padding: 28px;
    height: 200px;
  }
`

const CenteredDiv = styled.div`
  text-align: center;
`

const StyledButton = styled(PinnedContentButton)`
  background: none;
  border: 1px solid #24e49f;
  margin-top: 20px;
  pointer-events: none;
`

const FlexDiv = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`
