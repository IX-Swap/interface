import react from 'react'
import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import { RowStart } from 'components/Row'
import { FormContainer, FormRow } from 'pages/KYC/IndividualKycForm'
import { FormCard, FormGrid } from 'pages/KYC/styleds'
import { isMobile } from 'react-device-detect'
import { TYPE } from 'theme'
import Branding from './components/Branding'
import ProjectInfo from './components/ProjectInfo'
import Tokenomics from './components/Tokenomics'
import Approvals from './components/Approvals'

export default function LBPForm() {
  return (
    <FormRow>
      <Column style={{ gap: '35px' }}>
        <FormContainer>
          <TYPE.title4
            fontWeight={'800'}
            fontSize={isMobile ? 24 : 24}
            style={{ whiteSpace: 'nowrap' }}
            marginLeft="10px"
          >
            <Trans>Serenity</Trans>
          </TYPE.title4>

          <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="personal">
            <RowStart marginBottom="32px">
              <TYPE.title7>
                <Trans>Branding</Trans>
              </TYPE.title7>
            </RowStart>
            <Column style={{ gap: '20px' }}>
              <Branding />
            </Column>
          </FormCard>

          <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="personal">
            <RowStart marginBottom="32px">
              <TYPE.title7>
                <Trans>Project information</Trans>
              </TYPE.title7>
            </RowStart>
            <Column style={{ gap: '20px' }}>
              <ProjectInfo />
            </Column>
          </FormCard>

          <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="personal">
            <RowStart marginBottom="32px">
              <TYPE.title7>
                <Trans>Tokenomics</Trans>
              </TYPE.title7>
            </RowStart>
            <Column style={{ gap: '20px' }}>
              <Tokenomics />
            </Column>
          </FormCard>

          <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="personal">
            <RowStart marginBottom="32px">
              <TYPE.title7>
                <Trans>Approvals</Trans>
              </TYPE.title7>
            </RowStart>
            <Column style={{ gap: '20px' }}>
              <Approvals />
            </Column>
          </FormCard>
        </FormContainer>
      </Column>
    </FormRow>
  )
}
