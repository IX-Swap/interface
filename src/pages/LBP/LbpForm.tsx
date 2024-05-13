import React, { useState, useEffect } from 'react'
import { Trans } from '@lingui/macro'
import dayjs, { Dayjs } from 'dayjs'
import Column from 'components/Column'
import { RowStart } from 'components/Row'
import { FormContainer, FormRow } from 'pages/KYC/IndividualKycForm'
import { FormCard, StyledStickyBox } from 'pages/KYC/styleds'
import { isMobile } from 'react-device-detect'
import { BrandingProps, LbpStatus, ProjectInfoProps, TokenomicsProps } from '../../../src/components/LBP/types'
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
import { constants } from 'ethers'
import { useRole } from 'state/user/hooks'

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
      maxPrice: 0,
      startDate: '',
      endWeight: 0,
    },
  })
  const [canSubmit, setCanSubmit] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const toggleModal = React.useCallback(() => setShowSummary((state) => !state), [])
  const [endPrice, setEndPrice] = useState(0)
  const [startPrice, setStartPrice] = useState(0)
  const [status, setStatus] = useState<LbpStatus | undefined>(undefined);
  const [isValidUser, setIsvalidUser] = useState(false);

  const loader = useLoader(false)
  const addPopup = useAddPopup()
  const history = useHistory()
  const getLbp = useGetLbp()
  const saveOrSubmitLbp = useSaveOrSubmitLbp()
  const { isAdmin } = useRole()

  const {
    objectParams: { id: lbpId },
  } = useQueryParams<{ id: number }>(['id'])

  useEffect(() => {
    const getLbpAsync = async () => {
      if (lbpId) {
        const lbp = await getLbp(lbpId)
        setStatus(lbp?.status)
        const loadedFormData = transformDataForLoading(lbp)
        
        setFormData(loadedFormData)

      }
    }

    getLbpAsync()
  }, [])

  useEffect(() => {
    updateSubmitButtonState(formData)
    const isValid = isValidStatusAndAdmin(status, isAdmin);
    setIsvalidUser(isValid)
  }, [formData, status, isAdmin])

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
    const isComplete = (data: any) => {
      const keysToCheck = Object.keys(data).filter((key) => key !== 'maxPrice' && key !== 'maxSupply')
      return keysToCheck.every((key) => !!data[key])
    }

    const areDatesValid = (startDate: Dayjs, endDate: Dayjs): boolean => {
      const currentDate = dayjs()
      const minEndDate = startDate.add(1, 'day')

      const startDateAfterNow = startDate.isAfter(currentDate)
      const endDateAfterNow = endDate.isAfter(currentDate)
      const endDateGreaterThanStartDate = endDate.isAfter(startDate)
      const endDateEqualGreaterThanMinEndDate = endDate.isSameOrAfter(minEndDate)

      console.log('startDateAfterNow', startDateAfterNow)
      console.log('endDateBeforeNow', endDateAfterNow)
      console.log('endDateGreaterThanStartDate', endDateGreaterThanStartDate)
      console.log('endDateEqualGreaterThanMinEndDate', endDateEqualGreaterThanMinEndDate)

      return startDateAfterNow && endDateAfterNow && endDateGreaterThanStartDate && endDateEqualGreaterThanMinEndDate
    }

    // const isComplete = (data: any) => Object.values(data).every((val) => !!val)
    const brandingComplete = isComplete(formData.branding)
    const projectInfoComplete = isComplete(formData.projectInfo)
    const tokenomicsComplete = isComplete(formData.tokenomics)
    const hasSocialLinks = formData.projectInfo.socialLinks?.length > 0
    const hasWhitepapers = formData.projectInfo.whitepapers?.length > 0
    const startDate = dayjs(formData.tokenomics.startDate)
    const endDate = dayjs(formData.tokenomics.endDate)
    const datesValid = areDatesValid(startDate, endDate)

    console.log(brandingComplete, projectInfoComplete, tokenomicsComplete, hasSocialLinks, hasWhitepapers, datesValid)

    setCanSubmit(
      brandingComplete && hasSocialLinks && hasWhitepapers && projectInfoComplete && tokenomicsComplete && datesValid
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
      startDate: dayjs(formData.tokenomics?.startDate)?.utc()?.format('YYYY-MM-DD HH:mm:ss'),
      endDate: dayjs(formData.tokenomics?.endDate)?.utc()?.format('YYYY-MM-DD HH:mm:ss'),
      maxPrice: Number(formData.tokenomics?.maxPrice || 0),
      additionalDocumentIds: [],
    }

    return result
  }

  const transformDataForLoading = (data: LbpFormValues) => {
    return {
      id: data.id || 0,
      projectInfo: {
        name: data.title,
        title: data.title,
        description: data.description,
        website: data.officialWebsite,
        socialLinks: data.socialMedia,
        whitepapers: data.whitePaper,
        uploadDocs: data.uploadDocs || [],
      },
      branding: {
        LBPLogo: data.logo,
        LBPBanner: data.banner,
      },
      tokenomics: {
        shareAddress: data.shareAddress,
        contractAddress: data.contractAddress || constants.AddressZero,
        assetTokenAddress: data.assetTokenAddress,
        assetTokenSymbol: data.assetTokenSymbol,
        shareInput: data.shareAmount,
        maxSupply: data.shareMaxSupply,
        assetInput: data.assetTokenAmount,
        startWeight: data.startWeight,
        startDate: dayjs(data.startDate)?.local()?.format('YYYY-MM-DD HH:mm:ss'),
        endDate: dayjs(data.endDate)?.local()?.format('YYYY-MM-DD HH:mm:ss'),
        maxPrice: data.maxPrice || 0,
        endWeight: data.endWeight,
      },
    }
  }

  function isValidStatusAndAdmin(status: any, isAdmin: boolean): boolean {
    const validStatusValues: string[] = ['pending', 'live', 'closed', 'paused', 'ended'];
    return validStatusValues.includes(status) && isAdmin;
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
              <Branding isValidUser={isValidUser} brandingData={formData.branding} onChange={handleBrandingChange} />
            </Column>
          </FormCard>

          <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="ProjectInfo">
            <RowStart marginBottom="32px">
              <TYPE.label>Project information</TYPE.label>
            </RowStart>
            <Column style={{ gap: '20px' }}>
              <ProjectInfo isValidUser={isValidUser} formData={formData.projectInfo} onChange={handleProjectInfoChange} />
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
                shareLogo={formData?.branding?.LBPLogo}
                endPrice={endPrice}
                isValidUser={isValidUser}
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
            disabled={!canSubmit || !isValidUser}
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

        <Graph step={1} graphData={formData.tokenomics} setEndPrice={setEndPrice} setStartPrice={setStartPrice} />
      </div>

      <IssuanceDialog show={showSummary} onClose={toggleModal} width="550px">
        <SubmitSummary formData={formData} onCancel={toggleModal} startPrice={startPrice} />
      </IssuanceDialog>
    </FormRow>
  )
}
