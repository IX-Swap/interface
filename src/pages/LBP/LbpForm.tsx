import React, { useState, useEffect, useMemo } from 'react'
import { Trans } from '@lingui/macro'
import dayjs, { Dayjs } from 'dayjs'
import Column from 'components/Column'
import { RowStart } from 'components/Row'
import { FormContainer } from 'pages/KYC/IndividualKycForm'
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
import { LbpLayout } from './layout'
import styled from 'styled-components'
import { CloseConfirmation } from 'components/LaunchpadIssuance/IssuanceForm/shared/CloseConfirmation'
import { delay } from 'utils'

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
      xTokenLiteProxyAddress: '',
      contractAddress: constants.AddressZero,
      assetTokenAddress: '',
      assetTokenSymbol: '',
      shareInput: 0,
      maxSupply: '',
      assetInput: 0,
      startWeight: 99,
      endDate: '',
      maxPrice: '',
      startDate: '',
      endWeight: 1,
    },
  })
  const [canSubmit, setCanSubmit] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const toggleModal = React.useCallback(() => setShowSummary((state) => !state), [])
  const [endPrice, setEndPrice] = useState(0)
  const [startPrice, setStartPrice] = useState(0)
  const [status, setStatus] = useState<LbpStatus | undefined>(undefined)
  const [projectTokenSymbol, setProjectTokenSymbol] = useState<string>('')
  const [showCloseDialog, setShowCloseDialog] = useState(false)
  const [isDirty, setDirty] = useState(false)
  const [nextPathname, setNextPathname] = useState<string>('')

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
    const isComplete = (data: any) => {
      const keysToCheck = Object.keys(data).filter((key) => key !== 'maxPrice' && key !== 'maxSupply' && key !== 'xTokenLiteProxyAddress')
      return keysToCheck.every((key) => !!data[key])
    }

    const areDatesValid = (startDate: Dayjs, endDate: Dayjs): boolean => {
      const currentDate = dayjs()
      const minEndDate = startDate.add(1, 'day')

      const startDateAfterNow = startDate.isAfter(currentDate)
      const endDateAfterNow = endDate.isAfter(currentDate)
      const endDateGreaterThanStartDate = endDate.isAfter(startDate)
      const endDateEqualGreaterThanMinEndDate = endDate.isSameOrAfter(minEndDate)

      return startDateAfterNow && endDateAfterNow && endDateGreaterThanStartDate && endDateEqualGreaterThanMinEndDate
    }

    // const isComplete = (data: any) => Object.values(data).every((val) => !!val)
    const brandingComplete = isComplete(formData.branding)
    const projectInfoComplete = isComplete(formData.projectInfo)
    const tokenomicsComplete = isComplete(formData.tokenomics)
    const hasSocialLinks = formData.projectInfo.socialLinks?.length > 0
    // const hasWhitepapers = formData.projectInfo.whitepapers?.length > 0
    const startDate = dayjs(formData.tokenomics.startDate)
    const endDate = dayjs(formData.tokenomics.endDate)
    const datesValid = areDatesValid(startDate, endDate)

    console.log('brandingComplete', brandingComplete)
    console.log('projectInfoComplete', projectInfoComplete)
    console.log('tokenomicsComplete', tokenomicsComplete)
    console.log('hasSocialLinks', hasSocialLinks)
    console.log('datesValid', datesValid)

    setCanSubmit(brandingComplete && hasSocialLinks && projectInfoComplete && tokenomicsComplete && datesValid)
  }

  const saveLbp = async (actionType: string) => {
    loader.start()
    try {
      let data = transformDataForSaving(formData)
      const res = await saveOrSubmitLbp(actionType, data)
      const id = res?.data?.id || formData.id
      if (id) {
        setFormData((prevData) => ({ ...prevData, id }))
        data = { ...data, id }
      }
      setDirty(false)
      const summary = actionType === LBP_ACTION_TYPES.save ? 'LBP saved successfully' : 'LBP submitted successfully'
      addPopup({ info: { success: true, summary } })
      if (actionType === LBP_ACTION_TYPES.submit) {
        setShowSummary(true)
      } else {
        history.push('/lbp-admin')
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
      ...(formData.id ? { id: formData.id } : {}),
      title: formData.projectInfo?.title,
      description: formData.projectInfo?.description,
      officialWebsite: formData.projectInfo?.website,
      socialMedia: formData.projectInfo?.socialLinks,
      whitePaper: formData.projectInfo?.whitepapers,
      LBPLogo: formData.branding?.LBPLogo,
      LBPBanner: formData.branding?.LBPBanner,
      uploadDocs: formData.projectInfo?.uploadDocs,
      shareAddress: formData.tokenomics?.shareAddress,
      xTokenLiteProxyAddress: formData.tokenomics?.xTokenLiteProxyAddress || null,
      shareAmount: Number(formData.tokenomics?.shareInput || 0),
      assetTokenAmount: Number(formData.tokenomics?.assetInput || 0),
      assetTokenAddress: formData.tokenomics?.assetTokenAddress,
      assetTokenSymbol: formData.tokenomics?.assetTokenSymbol,
      startWeight: formData.tokenomics?.startWeight,
      endWeight: formData.tokenomics?.endWeight,
      startDate: dayjs(formData.tokenomics?.startDate)?.utc()?.format('YYYY-MM-DD HH:mm:ss'),
      endDate: dayjs(formData.tokenomics?.endDate)?.utc()?.format('YYYY-MM-DD HH:mm:ss'),
      additionalDocumentIds: [],
    }

    if (formData?.tokenomics?.maxSupply) {
      result.shareMaxSupply = Number(formData?.tokenomics?.maxSupply ?? 0)
    }

    if (formData?.tokenomics?.maxPrice) {
      result.maxPrice = Number(formData?.tokenomics?.maxPrice ?? 0)
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
        xTokenLiteProxyAddress: data.xTokenLiteProxyAddress,
        contractAddress: data.contractAddress || constants.AddressZero,
        assetTokenAddress: data.assetTokenAddress,
        assetTokenSymbol: data.assetTokenSymbol,
        shareInput: data.shareAmount,
        maxSupply: data.shareMaxSupply,
        assetInput: data.assetTokenAmount,
        startWeight: data.startWeight,
        startDate: dayjs(data.startDate)?.local()?.format('YYYY-MM-DD HH:mm:ss'),
        endDate: dayjs(data.endDate)?.local()?.format('YYYY-MM-DD HH:mm:ss'),
        maxPrice: data.maxPrice,
        endWeight: data.endWeight,
      },
    }
  }

  const isEditable = useMemo(() => {
    if (status == undefined) {
      return true
    }

    return status == LbpStatus.draft && isAdmin
  }, [status, isAdmin])

  const handleSaveThenRedirect = async () => {
    setDirty(false)
    setShowCloseDialog(false)
    await handleSaveDraft()
    history.push(nextPathname)
  }

  const handleDiscard = async () => {
    setDirty(false)
    setShowCloseDialog(false)
    await delay(100)
    history.push(nextPathname)
  }

  useEffect(() => {
    // @ts-ignore
    const unblock = history.block((location, action) => {
      if (action !== 'POP' && isDirty) {
        setNextPathname(location.pathname)
        setShowCloseDialog(true)
        return false
      }
      return true
    })

    return () => {
      unblock()
    }
  }, [history, isDirty])

  return (
    <LbpLayout background="#F7F7FF">
      {showCloseDialog ? (
        <CloseConfirmation
          isOpen={showCloseDialog}
          onDiscard={handleDiscard}
          onClose={() => setShowCloseDialog(false)}
          onSave={handleSaveThenRedirect}
        />
      ) : null}
      <FormRow>
        <FormContainer style={{ gap: '20px', margin: '20px 0px 0px 0px' }}>
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
                <ProjectInfo formData={formData.projectInfo} onChange={handleProjectInfoChange} setDirty={setDirty} />
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
                  shareTitle={projectTokenSymbol}
                  shareLogo={formData?.branding?.LBPLogo}
                  endPrice={endPrice}
                  isEditable={isEditable}
                  setProjectTokenSymbol={setProjectTokenSymbol}
                  setDirty={setDirty}
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
                  shareName={projectTokenSymbol}
                  shareLogo={formData?.branding?.LBPLogo}
                  isEditable={isEditable}
                />
              </Column>
            </FormCard>
          </Column>
        </FormContainer>
        <div style={{ display: 'block', width: 332 }}>
          <StyledStickyBox style={{ marginTop: '78px', marginBottom: '1700px' }}>
            <KYCProgressBar
              disabled={!canSubmit || !isEditable}
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
          <SubmitSummary
            formData={formData}
            onCancel={toggleModal}
            startPrice={startPrice}
            projectTokenSymbol={projectTokenSymbol}
          />
        </IssuanceDialog>
      </FormRow>
    </LbpLayout>
  )
}

const FormRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 1180px;
  margin: 0 auto;
  margin-bottom: 113px;
`
