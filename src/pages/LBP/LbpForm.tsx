import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import { RowStart } from 'components/Row'
import { FormContainer, FormRow } from 'pages/KYC/IndividualKycForm'
import { FormCard, StyledStickyBox } from 'pages/KYC/styleds'
import { isMobile } from 'react-device-detect'
import { TYPE } from 'theme'
import Branding from './components/Branding'
import ProjectInfo from './components/ProjectInfo'
import Tokenomics from './components/Tokenomics'
import Approvals from './components/Approvals'
import { KYCProgressBar } from 'pages/KYC/KYCProgressBar'
import { Card } from 'rebass'

export default function LBPForm() {
  const [formData, setFormData] = useState({
    branding: {},
    projectInfo: {},
  })
  const [canSubmit, setCanSubmit] = useState(false)

  const handleBrandingChange = (brandingData: any) => {
    setFormData((prevData) => ({ ...prevData, branding: brandingData }))
    updateSubmitButtonState({ ...formData, branding: brandingData, projectInfo: formData.projectInfo })
  }

  const handleProjectInfoChange = (projectInfoData: any) => {
    setFormData((prevData) => ({ ...prevData, projectInfo: projectInfoData }))
    updateSubmitButtonState({ ...formData, branding: formData.branding, projectInfo: projectInfoData })
  }

  const updateSubmitButtonState = (formData: any) => {
    const brandingComplete = !!formData.branding.LBPLogo && !!formData.branding.LBPBanner
    const projectInfoComplete =
      !!formData.projectInfo.title &&
      !!formData.projectInfo.description &&
      !!formData.projectInfo.website &&
      !!formData.projectInfo.socialLinks &&
      !!formData.projectInfo.whitepapers &&
      !!formData.projectInfo.uploadDocs
    setCanSubmit(brandingComplete && projectInfoComplete)
  }

  const handleSubmit = () => {
    console.log(formData)
  }

  return (
    <FormRow>
      <FormContainer style={{ gap: '35px', margin: '20px 0px 0px 150px' }}>
        <TYPE.title4
          fontWeight={'800'}
          fontSize={isMobile ? 24 : 24}
          style={{ whiteSpace: 'nowrap' }}
          marginLeft="10px"
        >
          <Trans>Serenity</Trans>
        </TYPE.title4>
        <Column style={{ gap: '35px' }}>
          <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="Branding">
            <RowStart marginBottom="32px">
              <TYPE.title7>
                <Trans>Branding</Trans>
              </TYPE.title7>
            </RowStart>
            <Column style={{ gap: '20px' }}>
              <Branding onChange={handleBrandingChange} />
            </Column>
          </FormCard>

          <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="ProjectInfo">
            <RowStart marginBottom="32px">
              <TYPE.title7>
                <Trans>Project information</Trans>
              </TYPE.title7>
            </RowStart>
            <Column style={{ gap: '20px' }}>
              <ProjectInfo onChange={handleProjectInfoChange} />
            </Column>
          </FormCard>

          <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="Tokenomics">
            <RowStart marginBottom="32px">
              <TYPE.title7>
                <Trans>Tokenomics</Trans>
              </TYPE.title7>
            </RowStart>
            <Column style={{ gap: '20px' }}>
              <Tokenomics />
            </Column>
          </FormCard>

          <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="Approvals">
            <RowStart marginBottom="32px">
              <TYPE.title7>
                <Trans>Approvals</Trans>
              </TYPE.title7>
            </RowStart>
            {/* <Column style={{ gap: '20px' }}>
              <Approvals />
            </Column> */}
          </FormCard>
        </Column>
      </FormContainer>
      <div style={{ display: 'block' }}>
        <StyledStickyBox style={{ marginTop: '78px', marginRight: '200px' }}>
          <KYCProgressBar
            disabled={!canSubmit}
            handleSubmit={handleSubmit}
            topics={[
              {
                title: 'Branding',
                href: 'Branding',
              },
              {
                title: 'Project information',
                href: 'ProjectInfo',
              },
              {
                title: 'Tokenomics',
                href: 'Tokenomics',
              },
              {
                title: 'Approvals',
                href: 'Approvals',
              },
            ]}
            reasons={[]}
            description={null}
          />
        </StyledStickyBox>

        <Card style={{ marginTop: '200px', width: '300px', height: '400px', background: '#FFFFFF', position: 'fixed' }}>
          <div></div>
        </Card>
      </div>
    </FormRow>
  )
}
