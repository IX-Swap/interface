import React, { useState, useEffect } from 'react'
import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import { RowStart } from 'components/Row'
import { FormContainer, FormRow } from 'pages/KYC/IndividualKycForm'
import { FormCard, StyledStickyBox } from 'pages/KYC/styleds'
import { isMobile } from 'react-device-detect'
import { BrandingProps, ProjectInfoProps, TokenomicsProps } from '../../../src/components/LBP/types'
import Branding from './components/Branding'
import ProjectInfo from './components/ProjectInfo'
import Tokenomics from './components/Tokenomics'
import Approvals from './components/Approvals'
import { KYCProgressBar } from 'pages/KYC/KYCProgressBar'
import Graph from './components/Graph'
import { useGetLbp, useSaveOrSubmitLbp } from 'state/lbp/hooks'
import { LBP_ACTION_TYPES } from 'state/lbp/constants'
import { useQueryParams } from 'hooks/useParams'
import { LbpFile, LbpFormValues } from 'components/LBP/types'
import { useLoader } from 'state/launchpad/hooks'
import { useAddPopup } from 'state/application/hooks'
import { useHistory } from 'react-router-dom'
import { TYPE } from 'theme'
import { SubmitSummary } from 'components/LBP/Forms/SubmitSummary'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'

export interface FormData {
  id: number
  branding: BrandingProps
  projectInfo: ProjectInfoProps
  tokenomics: TokenomicsProps
}

export default function LBPForm() {
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    branding: {
      LBPLogo: {
        mimeType: undefined,
        name: '',
      },
      LBPBanner: {
        mimeType: undefined,
        name: '',
      },
    },
    projectInfo: {
      title: '',
      description: '',
      website: '',
      socialLinks: [],
      whitepapers: [],
      uploadDocs: [] as LbpFile[],
    },
    tokenomics: {
      shareAddress: '',
      contractAddress: '',
      assetTokenAddress: '',
      assetTokenSymbol: '',
      shareInput: 0,
      maxSupply: 0,
      assetInput: 0,
      startWeight: 0,
      endDate: '',
      minPrice: 0,
      maxPrice: 0,
      startDate: '',
      endWeight: 0,
    },
  })
  const [canSubmit, setCanSubmit] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const toggleModal = React.useCallback(() => setShowSummary((state) => !state), [])

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
      if (lbpId) {
        const lbp = await getLbp(lbpId)
        const loadedFormData = transformDataForLoading(lbp)
        setFormData(loadedFormData)
      }
    }

    getLbpAsync()
  }, [])

  useEffect(() => {
    updateSubmitButtonState(formData)
  }, [formData])

  const handleBrandingChange = (brandingData: BrandingProps) => {
    setFormData((prevData) => ({ ...prevData, branding: brandingData }))
  }

  const handleProjectInfoChange = (projectInfoData: ProjectInfoProps) => {
    setFormData((prevData) => ({
      ...prevData,
      projectInfo: { ...prevData.projectInfo, ...projectInfoData },
    }))
  }

  const handleTokenomicsChange = (tokenomicsData: TokenomicsProps) => {
    setFormData((prevData) => ({
      ...prevData,
      tokenomics: { ...prevData.tokenomics, ...tokenomicsData },
    }))
  }

  const updateSubmitButtonState = (formData: FormData) => {
    const isComplete = (data: any) => Object.values(data).every((val) => !!val)
    const brandingComplete = isComplete(formData.branding)
    const projectInfoComplete = isComplete(formData.projectInfo)
    const tokenomicsComplete = isComplete(formData.tokenomics)
    const hasSocialLinks = formData.projectInfo.socialLinks?.length > 0
    const hasWhitepapers = formData.projectInfo.whitepapers?.length > 0
    const hasUploadDocs = formData.projectInfo.uploadDocs?.length > 0

    // TODO: remove console logs
    console.info('formData', formData)

    console.info('brandingComplete', brandingComplete)
    console.info('projectInfoComplete', projectInfoComplete)
    console.info('tokenomicsComplete', tokenomicsComplete)
    console.info('hasSocialLinks', hasSocialLinks)
    console.info('hasWhitepapers', hasWhitepapers)
    setCanSubmit(
      // TODO: enable check check projectInfoComplete, hasUploadDocs after fixing uploading docs
      // temporarily not check projectInfoComplete, hasUploadDocs as there is a bug documents are not loaded
      // brandingComplete && tokenomicsComplete && hasSocialLinks && hasWhitepapers
      brandingComplete && hasSocialLinks && hasWhitepapers
      // brandingComplete && projectInfoComplete && tokenomicsComplete && hasSocialLinks && hasWhitepapers && hasUploadDocs
    )
  }

  const saveLbp = async (actionType: string) => {
    loader.start()
    try {
      const data = transformDataForSaving(formData)
      await saveOrSubmitLbp(actionType, data)
      const summary = actionType === LBP_ACTION_TYPES.save ? 'LBP saved successfully' : 'LBP submitted successfully'
      addPopup({ info: { success: true, summary } })
      if (actionType === LBP_ACTION_TYPES.submit) {
        setShowSummary(true)
      } else {
        history.push('/lbp')
      }
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

  const transformDataForSaving = (formData: FormData) => {
    const result: LbpFormValues = {
      id: formData.id,
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
      assetTokenAddress: formData.tokenomics?.assetTokenAddress,
      assetTokenSymbol: formData.tokenomics?.assetTokenSymbol,
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
        LBPLogo: data.banner,
        LBPBanner: data.logo,
      },
      tokenomics: {
        shareAddress: data.shareAddress,
        contractAddress: data.contractAddress,
        assetTokenAddress: data.assetTokenAddress,
        assetTokenSymbol: data.assetTokenSymbol,
        shareInput: data.shareAmount,
        maxSupply: data.shareMaxSupply,
        assetInput: data.assetTokenAmount,
        startWeight: data.startWeight,
        endDate: data.endDate,
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
        startDate: data.startDate,
        endWeight: data.endWeight,
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
          <Trans>{formData?.projectInfo?.title}</Trans>
        </TYPE.title4>
        <Column style={{ gap: '35px' }}>
          <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="Branding">
            <RowStart marginBottom="20px">
              <TYPE.label>Branding</TYPE.label>
            </RowStart>
            <Column style={{ gap: '20px' }}>
              <Branding brandingData={formData.branding} onChange={handleBrandingChange} />
            </Column>
          </FormCard>

          <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="ProjectInfo">
            <RowStart marginBottom="32px">
              <TYPE.label>Project information</TYPE.label>
            </RowStart>
            <Column style={{ gap: '20px' }}>
              <ProjectInfo formData={formData.projectInfo} onChange={handleProjectInfoChange} />
            </Column>
          </FormCard>

          <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="Tokenomics">
            <RowStart marginBottom="32px">
              <TYPE.label>Tokenomics</TYPE.label>
            </RowStart>
            <Column style={{ gap: '20px' }}>
              <Tokenomics
                formDataTokenomics={formData.tokenomics}
                onChange={handleTokenomicsChange}
                shareTitle={formData.projectInfo.title}
              />
            </Column>
          </FormCard>

          <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="Approvals">
            <RowStart marginBottom="32px">
              <TYPE.label>Approvals</TYPE.label>
            </RowStart>
            <Column style={{ gap: '20px' }}>
              <Approvals
                shareValue={formData?.tokenomics?.shareInput}
                assetValue={formData?.tokenomics?.assetInput}
                addressA={formData.tokenomics.shareAddress}
                addressB={formData.tokenomics.assetTokenAddress}
                contractAddress={formData?.tokenomics?.contractAddress || ''}
                shareName={formData?.projectInfo?.title}
                shareLogo={formData?.branding?.LBPLogo}
              />
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

      <IssuanceDialog show={showSummary} onClose={toggleModal} width="550px">
        <SubmitSummary formData={formData} onCancel={toggleModal} />
      </IssuanceDialog>
    </FormRow>
  )
}
