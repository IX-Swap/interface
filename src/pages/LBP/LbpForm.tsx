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

export default function LBPForm() {
  return (
    <FormRow style={{width: '70%'}}>
      <FormContainer style={{ gap: '35px' }}>
        <TYPE.title4
          fontWeight={'800'}
          fontSize={isMobile ? 24 : 24}
          style={{ whiteSpace: 'nowrap' }}
          marginLeft="10px"
        >
          <Trans>Serenity</Trans>
        </TYPE.title4>
        <Column style={{ gap: '35px' }}>
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
              <Tokenomics/>
            </Column>
          </FormCard>
        </Column>
      </FormContainer>
    </FormRow>
  )
}
