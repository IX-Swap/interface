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
import { useGetLbp, useSaveOrSubmitLbp } from 'state/lbp/hooks'
import { LBP_ACTION_TYPES } from 'state/lbp/constants'
import { useQueryParams } from 'hooks/useParams'
import { LbpFormValues, LbpStatus } from 'components/LBP/types'
import { useLoader } from 'state/launchpad/hooks'
import { useAddPopup } from 'state/application/hooks'
import { useHistory } from 'react-router-dom'

export default function LBPForm() {
  const [formData, setFormData] = useState({
    id: 0,
    branding: {},
    projectInfo: {},
    tokenomics: {},
  })
  const [canSubmit, setCanSubmit] = useState(false)

  const loader = useLoader(false)
  const addPopup = useAddPopup()
  const history = useHistory()
  const getLbp = useGetLbp()
  const saveOrSubmitLbp = useSaveOrSubmitLbp()

  const {
    objectParams: { id: lbpId },
  } = useQueryParams<{ id: number }>(['id'])

  useEffect(() => {
    const getLbpAsync = async () => {
      const lbp = await getLbp(lbpId)
      const loadedFormData = transformDataForLoading(lbp)
      setFormData(loadedFormData)
    }

    getLbpAsync()
  }, [])

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
    formData.projectInfo.name = 'Test' // TODO: Add name in form
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

  const saveLbp = async (actionType: string) => {
    loader.start()
    try {
      const data = transformDataForSaving(formData)
      await saveOrSubmitLbp(actionType, data)
      const summary = actionType === LBP_ACTION_TYPES.save ? 'LBP saved successfully' : 'LBP submitted successfully'
      addPopup({ info: { success: true, summary } })
      history.push('/lbp')
    } catch (err: any) {
      addPopup({ info: { success: false, summary: err?.toString() } })
    } finally {
      loader.stop()
    }
  }

  const handleSubmit = async () => {
    await saveLbp(LBP_ACTION_TYPES.submit)
  }

  const handleSaveDraft = async () => {
    await saveLbp(LBP_ACTION_TYPES.save)
  }

  const transformDataForSaving = (formData: any) => {
    const result: LbpFormValues = {
      id: formData.id,
      name: formData.projectInfo?.name,
      title: formData.projectInfo?.title,
      description: formData.projectInfo?.description,
      officialWebsite: formData.projectInfo?.website,
      socialMedia: formData.projectInfo?.socialLinks,
      whitePaper: formData.projectInfo?.whitepapers,
      LBPLogo: formData.branding?.LBPLogo,
      LBPBanner: formData.branding?.LBPBanner,
      uploadDocs: formData.projectInfo?.uploadDocs,
      shareAddress: formData.tokenomics?.shareAddress,
      shareAmount: formData.tokenomics?.shareInput,
      shareMaxSupply: formData.tokenomics?.maxSupply,
      assetTokenAmount: formData.tokenomics?.assetInput,
      startWeight: formData.tokenomics?.startWeight,
      endWeight: formData.tokenomics?.endWeight,
      startDate: formData.tokenomics?.startDate,
      endDate: formData.tokenomics?.endDate,
      minPrice: formData.tokenomics?.minPrice,
      maxPrice: formData.tokenomics?.maxPrice,
      additionalDocumentIds: [],
    }

    return result
  }

  const transformDataForLoading = (data: LbpFormValues) => {
    return {
      id: data.id || 0,
      projectInfo: {
        name: data.name,
        title: data.title,
        description: data.description,
        website: data.officialWebsite,
        socialLinks: data.socialMedia,
        whitepapers: data.whitePaper,
        uploadDocs: data.uploadDocs,
      },
      branding: {
        LBPLogo: data.LBPLogo,
        LBPBanner: data.LBPBanner,
      },
      tokenomics: {
        shareAddress: data.shareAddress,
        shareInput: data.shareAmount,
        maxSupply: data.shareMaxSupply,
        assetInput: data.assetTokenAmount,
        startWeight: data.startWeight,
        endDate: data.endDate,
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
      },
    }
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
        <StyledStickyBox style={{ marginTop: '78px', marginRight: '200px', marginBottom: '1700px' }}>
          <KYCProgressBar
            disabled={!canSubmit}
            handleSubmit={handleSubmit}
            handleSaveProgress={handleSaveDraft}
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

        <Graph step={1} graphData={formData.tokenomics} />
      </div>
    </FormRow>
  )
}
