import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { Formik } from 'formik'
import { Prompt, useHistory } from 'react-router-dom'
import moment from 'moment'
import { isMobile } from 'react-device-detect'
import { useCookies } from 'react-cookie'

import usePrevious from 'hooks/usePrevious'
import Column, { AutoColumn } from 'components/Column'
import { ButtonGradient, ButtonGradientBorder, ButtonText } from 'components/Button'
import { LinkStyledButton, TrashIcon, TYPE } from 'theme'
import { GradientText } from 'pages/CustodianV2/styleds'
import { StyledBodyWrapper } from 'pages/SecurityTokens'
import Row, { RowBetween } from 'components/Row'
import { PhoneInput } from 'components/PhoneInput'
import { DateInput } from 'components/DateInput'
import { Checkbox } from 'components/Checkbox'
import { getIndividualProgress, useCreateIndividualKYC, useKYCState, useUpdateIndividualKYC } from 'state/kyc/hooks'

import { useActiveWeb3React } from 'hooks/web3'
import { useAuthState } from 'state/auth/hooks'
import { Loadable } from 'components/LoaderHover'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { MAX_FILE_UPLOAD_SIZE, MAX_FILE_UPLOAD_SIZE_ERROR } from 'constants/constants'
import { countriesList } from 'constants/countriesList'
import { ReactComponent as ArrowLeft } from 'assets/images/arrow-back.svg'
import { useAddPopup, useShowError } from 'state/application/hooks'

import { KycInputLabel, KycSelect as Select, KycTextInput as TextInput, Uploader } from './common'
import { KYCProgressBar } from './KYCProgressBar'
import {
  empleymentStatuses,
  individualFormInitialValues,
  genders,
  incomes,
  sourceOfFunds,
  promptValue,
  occupationList,
} from './mock'
import { FormCard, FormGrid, ExtraInfoCard, FormWrapper, StyledStickyBox, StyledBigPassed } from './styleds'
import { individualErrorsSchema } from './schema'
import { individualTransformApiData, individualTransformKycDto } from './utils'
import { KYCStatuses, IdentityDocumentType } from './enum'
import { Box } from 'rebass'
import Modal from 'components/Modal'
import { IconButton } from '@material-ui/core'
import { HrLine, PlusButton } from 'pages/CreateNFT/styleds'
import { Plus } from 'react-feather'

type FormSubmitHanderArgs = { 
  createFn: (body: any) => any,
  updateFn: (id: number, body: any) => any, 
  validate: boolean
}

export const FormRow = styled(Row)`
  align-items: flex-start;
  gap: 35px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
  `};
`

export const FormContainer = styled(FormWrapper)`
  flex-grow: 1;
`

export default function IndividualKycForm() {
  const canLeavePage = useRef(false)
  const [cookies] = useCookies(['annoucementsSeen'])
  const [waitingForInitialValues, setWaitingForInitialValues] = useState(true)
  const [updateKycId, setUpdateKycId] = useState<any>(null)
  const [formData, setFormData] = useState<any>(null)
  const [canSubmit, setCanSubmit] = useState(true)
  const [isSubmittedOnce, setIsSubmittedOnce] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const addPopup = useAddPopup()
  const history = useHistory()
  const createIndividualKYC = useCreateIndividualKYC()
  const showError = useShowError()
  const updateIndividualKYC = useUpdateIndividualKYC()
  const { kyc, loadingRequest } = useKYCState()
  const { account } = useActiveWeb3React()
  const { token } = useAuthState()

  const [showTaxModal, setShowTaxModal] = useState(false)
  const [showFATCAModal, setShowFATCAModal] = useState(false)
  const [showSafeguardModal, setShowSafeguardModal] = useState(false)
  const [showOptoutModal, setShowOptoutModal] = useState(false)
  const [showOptoutConfirmationModal, setShowOptoutConfirmationModal] = useState(false)

  const openConfirmationModal = useCallback(() => {
    setShowOptoutModal(false)
    setShowOptoutConfirmationModal(true)
  }, [])

  const confirmOptOut = useCallback((setFieldValue: any) => {
    setShowOptoutConfirmationModal(false)
    setFieldValue('accredited', 0, false)
  }, [])

  const form = useRef<any>(null)

  const isLoggedIn = !!token && !!account

  const prevAccount = usePrevious(account)

  useEffect(() => {
    if (account && prevAccount && account !== prevAccount) {
      history.push('/kyc')
    }
  }, [account, prevAccount, history])

  useEffect(() => {
    setWaitingForInitialValues(true)

    const getProgress = async () => {
      const data = await getIndividualProgress()
      if (data) {
        const transformedData = individualTransformApiData(data)
        setFormData(transformedData)
      }
    }

    if ([KYCStatuses.CHANGES_REQUESTED, KYCStatuses.DRAFT].some(s => s === kyc?.status)) {
      getProgress()
      setUpdateKycId(kyc!.id)
    } else {
      setFormData(individualFormInitialValues)
    }

    setWaitingForInitialValues(false)
  }, [kyc])

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)

    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [])

  const alertUser = (e: any) => {
    e.preventDefault()
    e.returnValue = ''
  }

  const validationSeen = (key: string) => {
    if (errors[key]) {
      const newErrors = { ...errors }
      delete newErrors[key]
      setErrors(newErrors)
      setCanSubmit(true)
    }
  }

  const onChangeInput = (key: string, value: string, values: any, setFieldValue: any) => {
    if (values[key] !== value) {
      setFieldValue(key, value, false)
    }

    validationSeen(key)
  }

  const onSelectChange = (key: string, value: any, setFieldValue: any) => {
    setFieldValue(key, value, false)
    validationSeen(key)
  }

  const onRadioChange = (key: string, value: any, setFieldValue: any) => {
    setFieldValue(key, value, false)
    validationSeen(key)
  }

  const onTaxDeclarationAdd = (value: { country: string; id?: string, reason?: string }, fields: any[], setFieldValue: any) => {
    if (!value.country && (!value.id && !value.reason)) {
      validationSeen('taxCountry')
      validationSeen('taxDeclarations')

      return;
    }

    setFieldValue('taxDeclarations', [...(fields ?? []), value], false)
    setFieldValue('taxCountry', '', false)
    setFieldValue('taxIdentification', '', false)
  }
  
  const onTaxDeclarationRemove = (value: { country: string; id?: string }, fields: any[], setFieldValue: any) => {
    setFieldValue('taxDeclarations', [...(fields ?? [])].filter(f => f.country !== value.country), false)
  }

  const onSourceOfFundsChange = (source: {value: string, label: string}[], fields: any[], setFieldValue: any) => {
    const oldSources = new Set(fields.map(x => x.value))
    const newSources = new Set(source.map(x => x.value))

    const addedSources = new Set(source.filter(x => !oldSources.has(x.value)).map(x => x.value))
    const removedSources = new Set(fields.filter(x => !newSources.has(x.value)).map(x => x.value))
    
    
    const result = fields
      .filter(x => !removedSources.has(x.value))
      .concat(source.filter(x => addedSources.has(x.value)))
      
    if (result.length > 1 && result.some(x => x.label === 'Others')) {
      result.push(result.splice(result.findIndex(x => x.label === 'Others'), 1).pop())
    }

    setFieldValue('sourceOfFunds', result, false)
    validationSeen('sourceOfFunds')
    validationSeen('otherFunds')
  }

  const goBack = (e?: any) => {
    if (e) e.preventDefault()
    history.push('/kyc')
  }

  const handleDropImage = (acceptedFile: any, values: any, key: string, setFieldValue: any) => {
    const file = acceptedFile
    if (file?.size > MAX_FILE_UPLOAD_SIZE) {
      showError(MAX_FILE_UPLOAD_SIZE_ERROR)
    } else {
      const arrayOfFiles = [...values[key]]
      arrayOfFiles.push(file)

      setFieldValue(key, arrayOfFiles, false)
      validationSeen(key)
    }
  }

  const handleImageDelete =
    (values: any, key: string, removedDocuments: any[], setFieldValue: any) => (index: number) => {
      const arrayOfFiles = [...values[key]]

      if (arrayOfFiles[index]?.id) {
        setFieldValue('removedDocuments', [...removedDocuments, arrayOfFiles[index].id])
      }

      arrayOfFiles.splice(index, 1)

      setFieldValue(key, arrayOfFiles, false)
      validationSeen(key)
    }

  const countries = useMemo(() => {
    return countriesList
      ?.map((name, index) => ({ value: ++index, label: name }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [])

  const idTypes = useMemo(() => {
    return Object.values(IdentityDocumentType)?.map((value, index) => ({ value: ++index, label: value }))
  }, [])

  const formSubmitHandler = useCallback(
    async (values: any, { createFn, updateFn, validate = true }: FormSubmitHanderArgs) => {
      try {
        if (validate) {
          await individualErrorsSchema.validate(values, { abortEarly: false })
        }
        
        canLeavePage.current = true
        setCanSubmit(false)
        const body = individualTransformKycDto(values)
        let data: any = null

        if (updateKycId) {
          data = await updateFn(updateKycId, body)
        } else {
          data = await createFn(body)
        }

        if (data?.id) {
          history.push('/kyc')
          addPopup({ info: { success: true, summary: 'KYC was successfully submitted' } })
        } else {
          setCanSubmit(true)
          addPopup({ info: { success: false, summary: 'Something went wrong' } })
        }
      } catch (error: any) {
        const newErrors: any = {}

        error.inner.forEach((e: any) => {
          newErrors[e.path] = e.message
        })

        addPopup({ info: { success: false, summary: 'Please, fill the valid data' } })

        setIsSubmittedOnce(true)
        setErrors(newErrors)
        setCanSubmit(false)

        canLeavePage.current = false
      }
    },
    []
  )

  const saveProgress = useCallback(
    async (values: any) => {
      await formSubmitHandler(values, { 
        createFn: (body) => createIndividualKYC(body, true),
        updateFn: (id, body) => updateIndividualKYC(id, body, true), 
        validate: false 
      });
    },
    [formSubmitHandler]
  )

  return (
    <Loadable loading={!isLoggedIn}>
      <Prompt when={!canLeavePage.current} message={promptValue} />
      <LoadingIndicator isLoading={loadingRequest} />
      <StyledBodyWrapper hasAnnouncement={!cookies.annoucementsSeen}>
        <ButtonText
          style={{ textDecoration: 'none' }}
          display="flex"
          marginBottom={isMobile ? '32px' : '64px'}
          onClick={goBack}
        >
          <ArrowLeft style={{ width: isMobile ? 20 : 26 }} />
          <TYPE.title4 fontSize={isMobile ? 24 : 36} style={{ whiteSpace: 'nowrap' }} marginLeft="10px">
            <Trans>KYC as</Trans>
          </TYPE.title4>
          <TYPE.title4>
            <GradientText style={{ marginLeft: 8, fontSize: isMobile ? 26 : 36 }}>Individual</GradientText>
          </TYPE.title4>
        </ButtonText>

        {!waitingForInitialValues && formData && (
          <Formik
            innerRef={form}
            initialValues={formData}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            isInitialValid={false}
            enableReinitialize
            onSubmit={async (values) => {
              individualErrorsSchema
                .validate(values, { abortEarly: false })
                .then(async () => {
                  canLeavePage.current = true
                  setCanSubmit(false)
                  const body = individualTransformKycDto(values)
                  let data: any = null

                  if (updateKycId) {
                    data = await updateIndividualKYC(updateKycId, body)
                  } else {
                    data = await createIndividualKYC(body)
                  }

                  if (data?.id) {
                    history.push('/kyc')
                    addPopup({
                      info: {
                        success: true,
                        summary: 'KYC was successfully submitted',
                      },
                    })
                  } else {
                    setCanSubmit(true)
                    addPopup({
                      info: {
                        success: false,
                        summary: 'Something went wrong',
                      },
                    })
                  }
                })
                .catch((error) => {
                  const newErrors: any = {}
                  error.inner.forEach((e: any) => {
                    newErrors[e.path] = e.message
                  })
                  addPopup({
                    info: {
                      success: false,
                      summary: 'Please, fill the valid data',
                    },
                  })
                  setIsSubmittedOnce(true)
                  setErrors(newErrors)
                  setCanSubmit(false)
                  canLeavePage.current = false
                })
            }}
          >
            {({ values, handleSubmit, setFieldValue, dirty }) => {
              const shouldValidate = dirty && isSubmittedOnce
              const employmentInfoFilled =
                shouldValidate && !errors.occupation && !errors.employmentStatus && !errors.employer && !errors.income
              const personalFilled =
                shouldValidate &&
                !errors.firstName &&
                !errors.middleName &&
                !errors.lastName &&
                !errors.dateOfBirth &&
                !errors.gender &&
                !errors.nationality &&
                !errors.citizenship &&
                !errors.phoneNumber &&
                !errors.email
              const identityDocumentFilled =
                shouldValidate && !errors.idType && !errors.idNumber && !errors.idIssueDate && !errors.idExpiryDate
              const investorFilled = shouldValidate && !errors.accredited
              const addressFilled =
                shouldValidate && !errors.address && !errors.postalCode && !errors.country && !errors.city
              const fundsFilled = shouldValidate && !errors.sourceOfFunds && !errors.otherFunds
              const fatcaFilled = shouldValidate && !errors.usTin && !errors.isUSTaxPayer
              const filesFilled = shouldValidate && !errors.proofOfIdentity && !errors.proofOfAddress

              const investorStatusAcknowledgementFilled = shouldValidate && !errors.confirmStatusDeclaration

              return (
                <FormRow>
                  <FormContainer onSubmit={handleSubmit} style={{ gap: '35px' }}>
                    <Column style={{ gap: '35px' }}>
                      <FormCard id="personal">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Personal Information</Trans>
                          </TYPE.title6>
                          {personalFilled && <StyledBigPassed />}
                        </RowBetween>
                        <Column style={{ gap: '20px' }}>

                          <FormGrid columns={3}>
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('firstName', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.firstName}
                              label="First Name:"
                              error={errors.firstName && errors.firstName}
                            />
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('middleName', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.middleName}
                              label="Middle Name:"
                              error={errors.middleName && errors.middleName}
                            />
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('lastName', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.lastName}
                              label="Last Name:"
                              error={errors.lastName && errors.lastName}
                            />
                          </FormGrid>

                          <FormGrid>
                            <DateInput
                              maxHeight={60}
                              error={errors.dateOfBirth && errors.dateOfBirth}
                              value={values.dateOfBirth}
                              onChange={(value) => {
                                setFieldValue('dateOfBirth', value, false)
                                validationSeen('dateOfBirth')
                              }}
                              maxDate={moment().subtract(18, 'years')}
                            />
                            <Select
                              error={errors.gender && errors.gender}
                              label="Gender"
                              selectedItem={values.gender}
                              items={genders}
                              onSelect={(gender) => onSelectChange('gender', gender, setFieldValue)}
                            />
                          </FormGrid>

                          <FormGrid>
                            <Select
                              error={errors.nationality && errors.nationality}
                              withScroll
                              label="Nationality"
                              selectedItem={values.nationality}
                              items={countries}
                              onSelect={(nationality) => onSelectChange('nationality', nationality, setFieldValue)}
                            />
                            <Select
                              error={errors.citizenship && errors.citizenship}
                              withScroll
                              label="Citizenship"
                              selectedItem={values.citizenship}
                              items={countries}
                              onSelect={(citizenship) => onSelectChange('citizenship', citizenship, setFieldValue)}
                            />
                          </FormGrid>
                          <FormGrid>
                            <PhoneInput
                              error={errors.phoneNumber && errors.phoneNumber}
                              value={values.phoneNumber}
                              onChange={(value) => {
                                setFieldValue('phoneNumber', value, false)
                                validationSeen('phoneNumber')
                              }}
                            />
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('email', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.email}
                              label="Email address:"
                              error={errors.email && errors.email}
                            />
                          </FormGrid>
                        </Column>
                        <RowBetween marginBottom="32px" marginTop="64px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Address</Trans>
                          </TYPE.title6>
                          {addressFilled && <StyledBigPassed />}
                        </RowBetween>

                        <Column style={{ gap: '20px' }}>
                          <FormGrid>
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('address', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.address}
                              label="Address"
                              error={errors.address && errors.address}
                            />
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('postalCode', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.postalCode}
                              label="Postal Code"
                              error={errors.postalCode && errors.postalCode}
                            />
                          </FormGrid>

                          <FormGrid>
                            <Select
                              withScroll
                              label="Country"
                              selectedItem={values.country}
                              items={countries.filter(
                                ({ label }) =>
                                  !['United States of America', 'United States Minor Outlying Islands'].includes(label)
                              )}
                              onSelect={(country) => onSelectChange('country', country, setFieldValue)}
                              error={errors.country && errors.country}
                            />
                            <TextInput
                              onChange={(e: any) => onChangeInput('city', e.currentTarget.value, values, setFieldValue)}
                              value={values.city}
                              label="City"
                              error={errors.city && errors.city}
                            />
                          </FormGrid>
                        </Column>
                        
                        <RowBetween marginBottom="32px" marginTop="64px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Referral</Trans>
                          </TYPE.title6>
                          {identityDocumentFilled && <StyledBigPassed />}
                        </RowBetween>

                        <TextInput
                          label="Referral code"
                          value={values.referralCode}
                          onChange={e => onChangeInput('referralCode', e.currentTarget.value, values, setFieldValue)}
                        />

                        <RowBetween marginBottom="32px" marginTop="64px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Identification</Trans>
                          </TYPE.title6>
                          {identityDocumentFilled && <StyledBigPassed />}
                        </RowBetween>
                        <Column style={{ gap: '20px' }}>
                          <FormGrid>
                            <Select
                              error={errors.idType}
                              withScroll
                              id="documentTypeDropdown"
                              label="ID Type"
                              selectedItem={values.idType}
                              items={idTypes}
                              onSelect={(idType) => onSelectChange('idType', idType, setFieldValue)}
                            />
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('idNumber', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.idNumber}
                              id="documentNumberField"
                              label="ID Number"
                              error={errors.idNumber}
                            />
                          </FormGrid>

                          <FormGrid>
                            <DateInput
                              label="ID Issueance Date"
                              maxHeight={60}
                              error={errors.idIssueDate}
                              value={values.idIssueDate}
                              onChange={(value) => {
                                setFieldValue('idIssueDate', value, false)
                                validationSeen('idIssueDate')
                              }}
                              maxDate={new Date()}
                            />
                            <DateInput
                              label="ID Expiration Date"
                              maxHeight={60}
                              error={errors.idExpiryDate}
                              value={values.idExpiryDate}
                              onChange={(value) => {
                                setFieldValue('idExpiryDate', value, false)
                                validationSeen('idExpiryDate')
                              }}
                              minDate={new Date()}
                            />
                          </FormGrid>
                        </Column>
                        
                        <RowBetween marginBottom="10px" marginTop="64px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Upload Documents</Trans>
                          </TYPE.title6>
                          {filesFilled && <StyledBigPassed />}
                        </RowBetween>

                        <TYPE.description3>
                          Please upload the following documents. All account statements and documents should be dated within the last 3 months.
                          Type of document format supported is PDF, JPEG, JPG, DOCX and PNG. 
                        </TYPE.description3>

                        <Column style={{ gap: '40px', marginTop: '32px' }}>
                          <Uploader
                            subtitle="Proof of ID - Passport, Singapore NRIC, International Passport, National ID, Driving License or Others."
                            error={errors.proofOfIdentity && errors.proofOfIdentity}
                            title="Proof of Identity"
                            files={values.proofOfIdentity}
                            onDrop={(file) => {
                              handleDropImage(file, values, 'proofOfIdentity', setFieldValue)
                            }}
                            handleDeleteClick={handleImageDelete(
                              values,
                              'proofOfIdentity',
                              values.removedDocuments,
                              setFieldValue
                            )}
                          />

                          <Uploader
                            subtitle="Bank statement, utility bills, driving license (no expiry) within 3 month of issuance."
                            error={errors.proofOfAddress && errors.proofOfAddress}
                            title="Proof of Address"
                            files={values.proofOfAddress}
                            onDrop={(file) => {
                              handleDropImage(file, values, 'proofOfAddress', setFieldValue)
                            }}
                            handleDeleteClick={handleImageDelete(
                              values,
                              'proofOfAddress',
                              values.removedDocuments,
                              setFieldValue
                            )}
                          />
                        </Column>
                      </FormCard>

                      <FormCard id="employment-info">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Financial Information</Trans>
                          </TYPE.title6>
                          {employmentInfoFilled && <StyledBigPassed />}
                        </RowBetween>
                        <Column style={{ gap: '20px' }}>
                          <FormGrid columns={2}>
                            <Select
                              label="Occupation"
                              selectedItem={values.occupation}
                              items={occupationList}
                              onSelect={(status) => onSelectChange('occupation', status, setFieldValue)}
                              error={errors.occupation && errors.occupation}
                            />
                            <Select
                              label="Employment Status"
                              selectedItem={values.employmentStatus}
                              items={empleymentStatuses}
                              onSelect={(status: any) => onSelectChange('employmentStatus', status, setFieldValue)}
                              error={errors.employmentStatus && errors.employmentStatus}
                            />
                          </FormGrid>

                          <FormGrid columns={2}>
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('employer', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.employer}
                              label="Employer"
                              error={errors.employer && errors.employer}
                            />
                            <Select
                              label="Total Income in USD in preceding 12 months"
                              selectedItem={values.income}
                              items={incomes}
                              onSelect={(income) => onSelectChange('income', income, setFieldValue)}
                              error={errors.income && errors.income}
                            />
                          </FormGrid>

                          <Select
                            isMulti
                            withScroll
                            label="Source of Funds"
                            selectedItem={values.sourceOfFunds}
                            items={sourceOfFunds}
                            value={values.sourceOfFunds}
                            onSelect={item => onSourceOfFundsChange(item, values.sourceOfFunds, setFieldValue)}
                          />
                          
                          {values.sourceOfFunds.some((x: any) => x.label === 'Others') && (
                            <TextInput
                              style={{ marginTop: 20 }}
                              placeholder="Other Source of Funds...."
                              onChange={(e: any) =>
                                onChangeInput('otherFunds', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.otherFunds}
                              error={errors.otherFunds && errors.otherFunds}
                            />
                          )}
                          {errors.sourceOfFunds && (
                            <TYPE.small marginTop="8px" color={'red1'}>
                              {errors.sourceOfFunds}
                            </TYPE.small>
                          )}
                        </Column>
                        
                        <RowBetween marginBottom="32px" marginTop="64px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Tax Declaration</Trans>
                          </TYPE.title6>
                          {fatcaFilled && <StyledBigPassed />}
                        </RowBetween>
                        
                        <ExtraInfoCard>
                          <RowBetween>
                            <TYPE.buttonMuted>Why We Need Your Tax Declaration?</TYPE.buttonMuted>
                            <LinkStyledButton type="button" onClick={() => setShowTaxModal(true)}>Learn More</LinkStyledButton>

                            <Modal isOpen={showTaxModal} onDismiss={() => setShowTaxModal(false)}>
                              <FormCard>
                                <Column style={{ alignItems: 'stretch' }}>
                                  <TYPE.mediumHeader>Why We Need Your Tax Declaration?</TYPE.mediumHeader>
                                  
                                  <br />

                                  <TYPE.description2>
                                    Foreign Account Tax Compliance Act aims to collect information on United States (US) 
                                    Tax residents using foreign accounts. It requires Financial Institutions outside the US to report 
                                    customers who are US tax residents to the US tax authorities.

                                    <br />
                                    <br />

                                    IX Swap is collecting information regarding tax residency status of each Account holder in order 
                                    to comply with Income Tax Act and Singapore Income Tax (International Tax Compliance Agreements)
                                    (Common Reporting Standard) Regulations 2016.
                                  </TYPE.description2>

                                  <ButtonGradient onClick={() => setShowTaxModal(false)} style={{ 'width': '100%', marginTop: '32px' }}>
                                    OK
                                  </ButtonGradient>
                                </Column>
                              </FormCard>
                            </Modal>
                          </RowBetween>
                        </ExtraInfoCard>

                        {values.taxDeclarations?.map((tax: any) => (
                          <RowBetween key={`tax-${tax.country}`} width="100%" style={{ padding: '1rem' }}>
                            <FormGrid columns={2} style={{ flexGrow: 1 }}>
                              {/* <TextInput label="Country of Tax Declaration" value={tax.country} /> */}
                              <Select
                                isDisabled
                                withScroll
                                label="Country of Tax Declaration"
                                selectedItem={tax.country}
                                items={countries.filter(
                                  ({ label }) =>
                                    !['United States of America', 'United States Minor Outlying Islands'].includes(label)
                                )}
                                onSelect={(country) => onSelectChange('taxCountry', country, setFieldValue)}
                                error={errors.taxCountry && errors.taxCountry}
                              />
                              <TextInput disabled label="Tax Identification Number (TIN)" value={tax.id} />
                            </FormGrid>
                            
                            <IconButton onClick={() => onTaxDeclarationRemove(tax, values.taxDeclarations, setFieldValue)}>
                              <TrashIcon />
                            </IconButton>
                          </RowBetween>
                        ))}
                        
                        <FormGrid columns={2} style={{ marginTop: "32px" }}>
                          <Select
                            withScroll
                            label="Country of Tax Declaration"
                            selectedItem={values.taxCountry}
                            items={countries.filter(
                              ({ label }) =>
                                !['United States of America', 'United States Minor Outlying Islands'].includes(label)
                            )}
                            onSelect={(country) => onSelectChange('taxCountry', country, setFieldValue)}
                            error={errors.taxCountry && errors.taxCountry}
                          />

                          <TextInput 
                            label="Tax Identification Number (TIN)"
                            value={values.taxIdentification} 
                            disabled={values.taxTinUnavailable}
                            onChange={e => onChangeInput('taxIdentification', e.currentTarget.value, values, setFieldValue)} 
                          />
                        </FormGrid>

                        <br />

                        <LabeledCheckBox>
                          <Checkbox 
                            label={''} 
                            checked={values.taxTinUnavailable}
                            onClick={() => setFieldValue('taxTinUnavailable', !values.taxTinUnavailable, false)}
                          />

                          <TYPE.description3>TIN is not available (please indicate reason):</TYPE.description3>
                        </LabeledCheckBox>

                        {values.taxTinUnavailable && (
                          <TextInput 
                            label="Reason"
                            value={values.taxTinReason}
                            onChange={e => onChangeInput('taxTinReason', e.currentTarget.value, values, setFieldValue)} 
                          />
                        )}

                        <HrLine />

                        <LinkStyledButton 
                          type="button"
                          onClick={() => onTaxDeclarationAdd({ country: values.taxCountry, id: values.taxIdentification }, values.taxDeclarations, setFieldValue)} 
                          style={{ marginTop: "32px", width: "100%" }}
                        >
                          <ExtraInfoCard>
                            <RowBetween>
                              <Box> Add Country </Box>
                              <Plus />
                            </RowBetween>
                          </ExtraInfoCard>
                        </LinkStyledButton>
                          
                        
                        <RowBetween marginBottom="32px" marginTop="64px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>FATCA</Trans>
                          </TYPE.title6>
                          {fatcaFilled && <StyledBigPassed />}
                        </RowBetween>

                        <ExtraInfoCard>
                          <RowBetween>
                            <TYPE.buttonMuted>Declaration of US Citizenship or US residence for FATCA</TYPE.buttonMuted>
                            <LinkStyledButton type="button" onClick={() => setShowFATCAModal(true)}>Learn More</LinkStyledButton>

                            <Modal isOpen={showFATCAModal} onDismiss={() => setShowFATCAModal(false)}>
                              <FormCard>
                                <Column style={{ alignItems: 'stretch' }}>
                                  <TYPE.mediumHeader>Under FATCA, You are Citizen Of The United States Of America if:</TYPE.mediumHeader>

                                  <br />

                                  <TYPE.description2>
                                    You were born in US, Puerto Rico, Guam or the US Virgin Islands;

                                    <ol>
                                      <li>Your parent is a US citizen;</li>
                                      <li>You have been naturalized as a US citizen.</li>
                                    </ol>
                                  </TYPE.description2>

                                  <ButtonGradient onClick={() => setShowFATCAModal(false)} style={{ 'width': '100%', marginTop: '32px' }}>
                                    OK
                                  </ButtonGradient>
                                </Column>
                              </FormCard>
                            </Modal>
                          </RowBetween>
                        </ExtraInfoCard>

                        <Column style={{ gap: '20px', marginTop: 20 }}>
                          <Column style={{ gap: '8px' }}>
                            <Checkbox
                              isRadio
                              checked={values.isUSTaxPayer === 1}
                              onClick={() => onRadioChange('isUSTaxPayer', 1, setFieldValue)}
                              label={`I confirm that I am a US citizen and/or resident in the US for tax purposes and my US federal taxpayer ID number (US TIN) is as follows: `}
                            />
                            {values.isUSTaxPayer === 1 && (
                              <TextInput
                                style={{ width: 284 }}
                                placeholder="ID Number.."
                                value={values.usTin}
                                onChange={(e: any) =>
                                  onChangeInput('usTin', e.currentTarget.value, values, setFieldValue)
                                }
                                error={errors.usTin && errors.usTin}
                              />
                            )}
                          </Column>
                          <Checkbox
                            isRadio
                            checked={values.isUSTaxPayer === 0}
                            onClick={() => onRadioChange('isUSTaxPayer', 0, setFieldValue)}
                            label="I confirm that I am not a US citizen or resident in the US for tax purposes. "
                          />
                          {errors.isUSTaxPayer && (
                            <TYPE.small marginTop="-4px" color={'red1'}>
                              <Trans>Choose one</Trans>
                            </TYPE.small>
                          )}
                        </Column>
                      </FormCard>

                      <FormCard id="investor">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Investor Status Declaration</Trans>
                          </TYPE.title6>
                          {investorFilled && <StyledBigPassed />}
                        </RowBetween>

                        <Column style={{ gap: '34px' }}>
                          <Row style={{ gap: '12px' }} justifyContent="space-evenly">
                            <BorderBox active={values.accredited === 1}>
                              <Checkbox
                                name="accredited"
                                isRadio
                                checked={values.accredited === 1}
                                onClick={() => onRadioChange('accredited', 1, setFieldValue)}
                                label={`I declare I am an Individual Accredited Investor`}
                              />
                            </BorderBox>
                            
                            <BorderBox active={values.accredited === 0}>
                              <Checkbox
                                name="accredited"
                                isRadio
                                checked={values.accredited === 0}
                                onClick={() => onRadioChange('accredited', 0, setFieldValue)}
                                label="I declare I am a Retail Investor"
                              />
                            </BorderBox>
                            {errors.accredited && (
                              <TYPE.small marginTop="-4px" color={'red1'}>
                                <Trans>Choose one</Trans>
                              </TYPE.small>
                            )}
                          </Row>
                        </Column>
                      </FormCard>

                      {values.accredited === 1 && (
                        <>
                          <FormCard>
                            <RowBetween marginBottom="32px">
                              <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                                <Trans>Investor Declaration</Trans>
                              </TYPE.title6>
                              {investorFilled && <StyledBigPassed />}
                            </RowBetween>

                            <Column style={{ margin: '1rem', gap: "1rem" }}>
                              <Checkbox
                                name=""
                                isRadio
                                checked={values.investorDeclaration === 0}
                                label="My total net personal assets (including up to SGD 1 million of your primary residence) exceed SGD 2 million"
                                onClick={() => onRadioChange('investorDeclaration', 0, setFieldValue)}
                              />
                              
                              <Checkbox
                                name=""
                                isRadio
                                checked={values.investorDeclaration === 1}
                                label="My income in the preceding 12 months is not less than SGD 300,000 (or its equivalent in a foreign currency)"
                                onClick={() => onRadioChange('investorDeclaration', 1, setFieldValue)}
                              />
                              
                              <Checkbox
                                name=""
                                isRadio
                                checked={values.investorDeclaration === 2}
                                label="My personal financial asset (e.g. deposits and investment product) exceed SGD 1 million or its equivalent (or its equivalent in foreign currency)"
                                onClick={() => onRadioChange('investorDeclaration', 2, setFieldValue)}
                              />
                              
                              <Checkbox
                                name=""
                                isRadio
                                checked={values.investorDeclaration === 3}
                                label="My jointly held account with my spouse/any individual meets any of the above"
                                onClick={() => onRadioChange('investorDeclaration', 3, setFieldValue)}
                              />
                            </Column>
                            
                            <RowBetween marginTop="64px">
                              <TYPE.title7 style={{ textTransform: 'uppercase' }}>
                                <Trans>Opt-in requirement</Trans>
                              </TYPE.title7>
                            </RowBetween>

                            <Column style={{ gap: '1rem' }}>
                              <TYPE.body3>
                                I confirm to be treated as an “Accredited Investor” by InvestaX
                              </TYPE.body3>

                              <LabeledCheckBox>
                                <Checkbox 
                                  label={''} 
                                  checked={values.confirmSafeguards} 
                                  onClick={() => setFieldValue('confirmSafeguards', !values.confirmSafeguards, false)}
                                />

                                <TYPE.description3>
                                  I have been informed of and understand the consequences of my qualification as an Accredited Investor, 
                                  in particular the reduced regulatory investor 
                                  <LinkStyledButton onClick={() => setShowSafeguardModal(true)}>safeguards</LinkStyledButton> 
                                  for Accredited Investors.
                                </TYPE.description3>

                                <Modal isOpen={showSafeguardModal} onDismiss={() => setShowSafeguardModal(false)}>
                                  <FormCard>
                                    <Column style={{ alignItems: 'stretch' }}>
                                      <TYPE.mediumHeader>Accredited Investors And Their Special Treatment</TYPE.mediumHeader>
                                      
                                      <br />

                                      <TYPE.description2 style={{ overflowY: 'scroll', maxHeight: '50vh' }}>
                                        Accredited investors are considered to be sophisticated investors and hence eligible to enjoy more 
                                        flexible and swift investments not available to the general public. Accredited investors are expected 
                                        to understand more sophisticated investment products and the risks associated with them, and have the 
                                        ability to conduct their own due diligence, therefore, allowing for reduced investor disclosures and 
                                        safeguards, including the following:

                                        <br />
                                        <br />

                                        - We may provide you preliminary documents, and oral or written information in their regard or regarding 
                                        the prospectus, on securities, such as shares and debentures, units in business trusts and collective 
                                        investment schemes (commonly referred to as mutual funds or investment funds) (“Investment Products”) 
                                        before the prospectus or profile statement is registered with the Monetary Authority of Singapore 
                                        (sec. 25(3) and (4)(a), 300(2A) and (2B)(a) SFA). You may thus receive information that may not meet 
                                        regulatory requirements for public distribution.
                                        
                                        <br />
                                        <br />


                                        - We may offer you Investment Products without a prospectus, i.e. without the full disclosures and 
                                        warnings required for public offerings, or with lesser periodic reporting as determined by the issuers 
                                        of the Investment Products in their sole discretion (sec. 275(1), 305, 305A(1)(b), (2)(i)(A) and 
                                        (3)(i)(A) SFA). Conversely, you may purchase Investment Products offered under these limited disclosure 
                                        requirements without additional requirements (sec. 276(1)(b), (2)(b), (3)(i)(A) and (3)(i)(A)SFA).
                                        
                                        <br />
                                        <br />


                                        - We do not hold any investment funds on your behalf, you will not be entitled to any compensation 
                                        for any monetary loss of funds from misappropriation of funds in any Investment Products from us. 
                                        (sec. 186(1) SFA, reg. 7(3) SF(LCB) R).
                                        
                                        <br />
                                        <br />


                                        - We may market and sell Investment Products to you without prior due diligence to ascertain its 
                                        suitability for targeted clients (reg. 18B(9) FAR). We may even expressly or implicity make a 
                                        recommendation with respect to any investment product to you without ascertaining that the investment 
                                        product meets your investment objectives, financial situation and particular needs. When making a 
                                        recommendation to you without such consideration, we will however disclose this fact to you 
                                        (re. 34(1)(a), (2) FAR).
                                        
                                        <br />
                                        <br />


                                        - We provide you research reports and analysis from 3rd party research houses, we are not 
                                        required to accept legal responsibility for the content of such report or analysis (32C(1)(d) FAR).
                                        
                                        <br />
                                        <br />


                                        - We are not required to disclose our interests from investment or underwriting of the 
                                        respective Investment Product, when we offer or recommend such Investment Products to you 
                                        (47A(3)(a)(i)SF(LCB)R).
                                        
                                        <br />
                                        <br />


                                        - A suitable representative of our Company may interact with you on his/her own without 
                                        passing all the examinations required by the Monetary Authority of Singapore for representative 
                                        retail clients (reg. 3A(5)(c)-(e) and (7) SF(LCB)R; reg. 4A(6) FAR.
                                      </TYPE.description2>

                                      <ButtonGradient onClick={() => setShowSafeguardModal(false)} style={{ 'width': '100%', marginTop: '32px' }}>
                                        OK
                                      </ButtonGradient>
                                    </Column>
                                  </FormCard>
                                </Modal>
                              </LabeledCheckBox>
                              
                              <LabeledCheckBox>
                                <Checkbox 
                                  label={''} 
                                  checked={values.confirmOptout}
                                  onClick={() => setFieldValue('confirmOptout', !values.confirmOptout, false)}
                                />

                                <TYPE.description3>
                                  I have been informed of and understand my right to 
                                  <LinkStyledButton onClick={() => setShowOptoutModal(true)}>opt out</LinkStyledButton> 
                                  of the Accredited Investors status
                                </TYPE.description3>

                                <Modal isOpen={showOptoutModal} onDismiss={() => setShowOptoutModal(false)}>
                                  <FormCard>
                                    <Column style={{ alignItems: 'stretch' }}>
                                      <TYPE.mediumHeader>Accredited Investor Opt-Out Form</TYPE.mediumHeader>
                                      
                                      <br />

                                      <TYPE.description2>
                                        I/We (“Accredited Investor” or “AI”) wish to inform that I/WE would like to withdraw 
                                        my/our consent to be treated as an Accredited Investor (as defined in section 4A of 
                                        the Securities and Future Act, Chapter 289 of Singaport) by IX Swap

                                        <br />
                                        <br />
                                        
                                        I/We agree, understand and accept that this withdrawal of consent will be subject 
                                        to a processing time of 30 business days from the date of receipt of this form by 
                                        IX Swap will notify after my/our status has been updated as Non-Accredited Investor 
                                        (“NAI”) in its records and I/we will be treated as an AI until InvestaX notifies 
                                        me/us of the updated status as NAI (“Effective Date”)
                                        
                                        <br />
                                        <br />

                                        From the Effective Date, I/we shall be treated as NAI by IX Swap for all or any 
                                        of the services mentioned above. Any transactions executed by me/us or Services/Products 
                                        availed by me/us prior to the Effective Date will not be affected by such withdrawal of consent.
                                      </TYPE.description2>

                                      <FormGrid columns={2}>
                                        <ButtonGradientBorder onClick={() => setShowOptoutModal(false)} style={{ 'width': '100%', marginTop: '32px' }}>
                                          Cancel
                                        </ButtonGradientBorder>

                                        <ButtonGradient onClick={openConfirmationModal} style={{ 'width': '100%', marginTop: '32px' }}>
                                          Opt Out
                                        </ButtonGradient>
                                        
                                      </FormGrid>
                                    </Column>
                                  </FormCard>
                                </Modal>

                                <Modal isOpen={showOptoutConfirmationModal} onDismiss={() => setShowOptoutConfirmationModal(false)}>
                                  <FormCard>
                                    <Column style={{ alignItems: 'stretch' }}>
                                      <TYPE.mediumHeader>
                                        If you choose to opt-out of the Accredited Investor status, please proceed with KYC by declaring a different investor status.
                                      </TYPE.mediumHeader>
                                      
                                      <br />

                                      <FormGrid columns={2}>
                                        <ButtonGradientBorder onClick={() => setShowOptoutConfirmationModal(false)} style={{ 'width': '100%', marginTop: '32px' }}>
                                          Cancel
                                        </ButtonGradientBorder>

                                        <ButtonGradient onClick={() => confirmOptOut(setFieldValue)} style={{ 'width': '100%', marginTop: '32px' }}>
                                          Ok
                                        </ButtonGradient>
                                        
                                      </FormGrid>
                                    </Column>
                                  </FormCard>
                                </Modal>
                              </LabeledCheckBox>
                            </Column>

                            
                            <RowBetween marginTop="64px">
                              <TYPE.title7 style={{ textTransform: 'uppercase' }}>
                                <Trans>Evidence of Accreditation</Trans>
                              </TYPE.title7>
                            </RowBetween>

                            <Column>
                              <TYPE.body3>
                                Net Personal Asset Copy of latest investment portfolio holdings, e.g. bank, broker, 
                                fund manager account statements, copy bank statement, CPF statement
                              </TYPE.body3>

                              <Uploader
                                title={''}
                                error={errors.proofOfIdentity && errors.proofOfIdentity}
                                files={values.proofOfIdentity}
                                onDrop={(file) => {
                                  handleDropImage(file, values, 'proofOfIdentity', setFieldValue)
                                } }
                                handleDeleteClick={handleImageDelete(
                                  values,
                                  'proofOfIdentity',
                                  values.removedDocuments,
                                  setFieldValue
                                )}
                              />
                            </Column>
                          </FormCard>
                          
                          <FormCard id="investor">
                            <RowBetween marginBottom="32px">
                              <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                                <Trans>Investor Status Declaration Acknowledgement</Trans>
                              </TYPE.title6>
                              {investorStatusAcknowledgementFilled && <StyledBigPassed />}
                            </RowBetween>

                            <LabeledCheckBox>
                              <Checkbox 
                                label={''} 
                                checked={values.confirmStatusDeclaration}
                                onClick={() => setFieldValue('confirmStatusDeclaration', !values.confirmStatusDeclaration, false)}
                              />

                              <TYPE.description3>
                                I understand and acknowledge that any offer made to me via IX Swap is a personal 
                                offer of securities under the small offer exemption in accordance with Section 
                                272 (1) of Securities and Futures Act (289) Singapore and it is not accompanied
                                by a prospectus that is reviewed or vetted by the Monetary Authority of Singapore. 
                                I am interested in receiving and participating in such personal offers.
                              </TYPE.description3>
                            </LabeledCheckBox>
                          </FormCard>
                        </>
                      )}
                    </Column>
                  </FormContainer>

                  <StyledStickyBox>
                    <KYCProgressBar
                      handleSubmit={handleSubmit}
                      handleSaveProgress={() => saveProgress(form?.current?.values)}
                      // disabled={!(dirty && Object.keys(errors).length === 0)}
                      disabled={!dirty || !canSubmit || Object.keys(errors).length !== 0}
                      topics={Object.values({
                        info: {
                          title: 'Personal Information',
                          href: 'personal',
                          passed: personalFilled,
                        },
                        identityDocument: {
                          title: 'Identity Document',
                          href: 'identity-document',
                          passed: identityDocumentFilled,
                        },
                        address: {
                          title: 'Address',
                          href: 'address',
                          passed: addressFilled,
                        },
                        funds: {
                          title: 'Source of Funds',
                          href: 'funds',
                          passed: fundsFilled,
                        },
                        investor: {
                          title: 'Investor Status Declaration',
                          href: 'investor',
                          passed: investorFilled,
                        },
                        fatca: {
                          title: 'FATCA',
                          href: 'fatca',
                          passed: fatcaFilled,
                        },
                        employmentInformation: {
                          title: 'Employment Information',
                          href: 'employment-info',
                          passed: employmentInfoFilled,
                        },
                        upload: {
                          title: 'Upload Documents',
                          href: 'upload',
                          passed: filesFilled,
                        },
                      })}
                      description={kyc?.message || null}
                      reasons={['Last name', 'Gender', 'Middle name']}
                    />
                  </StyledStickyBox>
                </FormRow>
              )
            }}
          </Formik>
        )}
      </StyledBodyWrapper>
    </Loadable>
  )
}

const BorderBox = styled.div<{ active: boolean }>`
  background-clip: padding-box; /* !importanté */
  border: solid 1px transparent;
  border-radius: 10rem;

  padding: 0.5rem 2rem;

  background: ${({ theme }) => theme.bg18};
  position: relative;

  width: 50%;

  :before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -1;
    margin: -3px; /* !importanté */
    border-radius: inherit;
    background: ${({ active }) => active ? 'linear-gradient(86.36deg, #6B2EE6 29.09%, #FF0080 107.32%)' : 'none'};
  }
`

const LabeledCheckBox = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: auto;

  place-items: start;
`