import React, { useState, useEffect } from 'react'
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
import Graph from './components/Graph'

export default function LBPForm() {
  const [formData, setFormData] = useState({
    branding: {},
    projectInfo: {},
    tokenomics: {},
  })
  const [canSubmit, setCanSubmit] = useState(false)

  useEffect(() => {
    updateSubmitButtonState(formData)
  }, [formData])

  const handleBrandingChange = (brandingData: any) => {
    setFormData((prevData) => ({ ...prevData, branding: brandingData }))
  }

  const handleProjectInfoChange = (projectInfoData: any) => {
    setFormData((prevData) => ({ ...prevData, projectInfo: projectInfoData }))
  }

  const handleTokenomicsChange = (tokenomicsData: any) => {
    setFormData((prevData) => ({ ...prevData, tokenomics: tokenomicsData }))
  }

  const updateSubmitButtonState = (formData: any) => {
    const isComplete = (data: any) => Object.values(data).every((val) => !!val)
    const brandingComplete = isComplete(formData.branding)
    const projectInfoComplete = isComplete(formData.projectInfo)
    const tokenomicsComplete = isComplete(formData.tokenomics)
    const hasSocialLinks = formData.projectInfo.socialLinks?.length > 0
    const hasWhitepapers = formData.projectInfo.whitepapers?.length > 0
    const hasUploadDocs = formData.projectInfo.uploadDocs?.length > 0
    setCanSubmit(
      brandingComplete && projectInfoComplete && tokenomicsComplete && hasSocialLinks && hasWhitepapers && hasUploadDocs
    )
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
            <RowStart marginBottom="20px">
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
              <Tokenomics onChange={handleTokenomicsChange} />
            </Column>
          </FormCard>

          <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="Approvals">
            <RowStart marginBottom="32px">
              <TYPE.title7>
                <Trans>Approvals</Trans>
              </TYPE.title7>
            </RowStart>
            <Column style={{ gap: '20px' }}>
              <Approvals />
            </Column>
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

        <Graph  step={1} graphData={formData.tokenomics} />

        {/* <Card style={{ marginTop: '200px', width: '300px', height: '400px', background: '#FFFFFF', position: 'fixed' }}>
          <div></div>
        </Card> */}
      </div>
    </FormRow>
  )
}
