import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { ErrorMessage, FieldArray, Formik } from 'formik'
import { Prompt, useHistory } from 'react-router-dom'
import moment from 'moment'
import dayjs from 'dayjs'
import { isMobile } from 'react-device-detect'
import { useCookies } from 'react-cookie'

import usePrevious from 'hooks/usePrevious'
import Column, { AutoColumn } from 'components/Column'
import { ButtonGradient, ButtonGradientBorder, ButtonIXSGradient, ButtonText } from 'components/Button'
import { LinkStyledButton, TYPE } from 'theme'
import { ReactComponent as TrashIcon } from 'assets/svg/trash-icon.svg'
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
import { HrLine } from 'pages/CreateNFT/styleds'
import { Plus } from 'react-feather'
import { ReactComponent as InvalidFormInputIcon } from 'assets/svg/invalid-form-input-icon.svg'
import { KYCValidationErrors } from './KYCValidationErrors'


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
        const taxDeclarations = transformedData.taxDeclarations?.length === 0
          ? [{ country: null, idNumber: '' }]
          : transformedData.taxDeclarations

        const formData = { ...transformedData, taxDeclarations }

        setFormData(formData)
        form.current.setValues(formData)

        if (kyc?.status === KYCStatuses.DRAFT) {
          setCanSubmit(true)
        }
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

  const validateValue = async (key: string, value: any) => {
    if (form.current.values[key] === value) {
      return
    }
    
    try {
      let root = { [key]: value }

      if (key.startsWith('taxDeclarations[')) {
        const match = /taxDeclarations\[([0-9]+)\]\.(\w+)/.exec(key)!

        const index = match[1]
        const field = match[2]

        const declaration = { ...form.current.values.taxDeclarations[index], [field]: value } 

        root = form.current.values

        root.taxDeclarations[index] = declaration
      }

      await individualErrorsSchema.validateAt(key, root)

      const errorCopy = { ...errors }

      delete errorCopy[key]

      setErrors(errorCopy)
      form.current.setErrors(errorCopy)
    } catch (err: any) {
      setErrors(Object.assign(errors, { [key]: err.message }))
      form.current.setFieldError(key, err.message)
    } 

    form.current.setFieldTouched(key, true)
  }

  const validationSeen = (key: string) => {
    if (errors[key]) {
      const newErrors = { ...errors }
      delete newErrors[key]
      setErrors(newErrors)
    }

    
    setCanSubmit(true)
  }

  const onIsAdditionalChange = async (index: number, setFieldValue: any) => {
    const values = form.current.values

    const declaration = { ...values.taxDeclarations[index] }

    declaration.isAdditional = !values.taxDeclarations[index].isAdditional
    declaration.idNumber = ''
    declaration.reason = ''

    const root = { ...values }

    root.taxDeclarations[index] = declaration


    const fields = [
      `taxDeclarations[${index}].isAdditional`,
      `taxDeclarations[${index}].idNumber`,
      `taxDeclarations[${index}].reason`
    ]

    const validationErrors: Record<string, string> = { }

    for (const field of fields) {
      try {
        await individualErrorsSchema.validateAt(field, root)
      } catch (err: any) {
        validationErrors[field] = err.message
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      const updatedErrors = Object.assign(errors, validationErrors)

      for (const field of fields) {
        if (updatedErrors[field] && !validationErrors[field]) {
          delete updatedErrors[field]
        }
      }

      setErrors(updatedErrors)
      form.current.setErrors(updatedErrors)
    } else {
      const prunedErrors = { ...errors }

      for (const field of fields) {
        delete prunedErrors[field]
      }

      setErrors(prunedErrors)
      form.current.setErrors(prunedErrors)
    }
    
    setFieldValue(`taxDeclarations[${index}].isAdditional`, declaration.isAdditional, false)
    setFieldValue(`taxDeclarations[${index}].idNumber`, declaration.idNumber, false)
    setFieldValue(`taxDeclarations[${index}].reason`, declaration.reason, false)
  }

  const onChangeInput = (key: string, value: any, values: any, setFieldValue: any) => {
    if (values[key] !== value) {
      setFieldValue(key, value, false)
    }

    validateValue(key, value)
    validationSeen(key)
  }

  const onSelectChange = (key: string, value: any, setFieldValue: any) => {
    setFieldValue(key, value, false)
    validateValue(key, value)
    validationSeen(key)
  }

  const onRadioChange = (key: string, value: any, setFieldValue: any) => {
    setFieldValue(key, value, false)
    validateValue(key, value)
    validationSeen(key)
  }

  const onAccreditedChange = (value: number, setFieldValue: any) => {
    setFieldValue('accredited', value, false)
    validationSeen('accredited')

    if (value === 0) {
      const keys = [
        'investorDeclarationStatus',
        'acceptOfQualification',
        'acceptRefusalRight',
        'confirmStatusDeclaration',
        'evidenceOfAccreditation'
      ]

      setFieldValue('investorDeclarationIsFilled', individualFormInitialValues.investorDeclarationIsFilled)
      setFieldValue('acceptOfQualification', individualFormInitialValues.acceptOfQualification)
      setFieldValue('acceptRefusalRight', individualFormInitialValues.acceptRefusalRight)
      setFieldValue('confirmStatusDeclaration', individualFormInitialValues.confirmStatusDeclaration)
      setFieldValue('evidenceOfAccreditation', individualFormInitialValues.evidenceOfAccreditation)

      const newErrors = { ...errors }

      for (const key of keys) {
        delete newErrors[key]
      }

      setErrors(newErrors)
      setCanSubmit(true)
    }
  }

  const onInvestorDeclarationChange = (field: string, value: boolean, values: any, setFieldValue: any) => {
    onChangeInput(field, value, values, setFieldValue)

    const relevantField = [
      'isTotalAssets',
      'isAnnualIncome',
      'isFinancialAssets',
      'isJointIncome',
    ]

    const atLeastOneFieldIsFilled = relevantField.some(f => f === field ? value : values[f])

    // Check whether any of investor declaration fields are checked
    setFieldValue('investorDeclarationIsFilled', atLeastOneFieldIsFilled, false)
    
    validateValue('investorDeclarationIsFilled', value)
    validationSeen('investorDeclarationIsFilled')
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

    validateValue('sourceOfFunds', result)
    // validateValue('otherFunds', value)

    validationSeen('sourceOfFunds')
    validationSeen('otherFunds')
  }

  const removeTaxDeclaration = (values: any, index: number, setFieldValues: any, callback: (idx: number) => void) => {
    if (values.taxDeclarations[index]?.id) {
      setFieldValues('removedTaxDeclarations', [...(values.removedTaxDeclarations ?? []), values.taxDeclarations[index]?.id])
    }

    callback(index)
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
      const arrayOfFiles = [...(values[key] ?? [])]
      arrayOfFiles.push(file)

      setFieldValue(key, arrayOfFiles, false)
      validateValue(key, arrayOfFiles)
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
      validateValue(key, arrayOfFiles)
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
          addPopup({ info: { success: true, summary: 'KYC was successfully saved' } })
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
            initialValues={individualFormInitialValues}
            initialErrors={errors}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            isInitialValid={false}
            enableReinitialize
            onSubmit={async (values) => {
              try {
                await individualErrorsSchema.validate(values, { abortEarly: false })

                canLeavePage.current = true

                setCanSubmit(false)

                const body = individualTransformKycDto(values)
                const data = updateKycId
                  ? await updateIndividualKYC(updateKycId, body)
                  : await createIndividualKYC(body)

                if (data?.id) {
                  history.push('/kyc')

                  addPopup({ info: { success: true, summary: 'KYC was successfully submitted' } })
                } else {
                  addPopup({ info: { success: false, summary: 'Something went wrong' } })
                  setCanSubmit(true)
                }
              } catch (error: any) {
                const newErrors: any = {}

                error.inner.forEach((e: any) => {
                  newErrors[e.path] = e.message
                })

                addPopup({ info: { success: false, summary: 'Please, fill the valid data' } })

                setIsSubmittedOnce(true)
                setErrors(newErrors)
                setCanSubmit(true)

                canLeavePage.current = false
              }
            }}
          >
            {({ values, handleSubmit, setFieldValue, dirty, initialValues }) => {
              const isFilled = (name: string): boolean => values[name] !== initialValues[name] && !errors[name]
              const shouldValidate = dirty

              const personalFilled =
                shouldValidate &&
                isFilled('firstName') &&
                isFilled('middleName') &&
                isFilled('lastName') &&
                isFilled('dateOfBirth') &&
                isFilled('gender') &&
                isFilled('nationality') &&
                isFilled('citizenship') &&
                isFilled('phoneNumber') &&
                isFilled('email')

              const referralFilled = !!values.referralCode

              const financialFilled =
                shouldValidate &&
                isFilled('occupation') &&
                isFilled('employmentStatus') &&
                isFilled('employer') &&
                isFilled('income') &&
                isFilled('sourceOfFunds')

              const statusDeclarationFilled =
                shouldValidate &&
                isFilled('accredited')

              const identityDocumentFilled =
                shouldValidate &&
                isFilled('idType') &&
                isFilled('idNumber') &&
                isFilled('idIssueDate') &&
                isFilled('idExpiryDate')

              const taxDeclarationFilled =
                shouldValidate &&
                isFilled('taxDeclaration')

              const addressFilled =
                shouldValidate &&
                isFilled('address') &&
                isFilled('postalCode') &&
                isFilled('country') &&
                isFilled('city')

              const fatcaFilled = shouldValidate && isFilled('usTin') && isFilled('isUSTaxPayer')
              const filesFilled = shouldValidate && 
                isFilled('proofOfIdentity') &&
                isFilled('proofOfAddress')

              const investorStatusAcknowledgementFilled = shouldValidate && isFilled('confirmStatusDeclaration')

              const personalFailed = (!personalFilled || !addressFilled || !filesFilled)
              const financialFailed = !financialFilled
              const statusDeclarationFailed = !statusDeclarationFilled

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
                          {personalFailed && <InvalidFormInputIcon /> }
                        </RowBetween>
                        <Column style={{ gap: '20px' }}>
                          <FormGrid columns={3}>
                            <TextInput
                              id="firstNameInput"
                              label="First Name:"
                              value={values.firstName}
                              error={errors.firstName}
                              onChange={(e: any) => onChangeInput('firstName', e.currentTarget.value, values, setFieldValue)}
                            />
                            <TextInput
                              id="middleNameInput"
                              label="Middle Name:"
                              value={values.middleName}
                              error={errors.middleName}
                              onChange={(e: any) => onChangeInput('middleName', e.currentTarget.value, values, setFieldValue)}
                            />
                            <TextInput
                              id="lastNameInput"
                              label="Last Name:"
                              value={values.lastName}
                              error={errors.lastName}
                              onChange={(e: any) => onChangeInput('lastName', e.currentTarget.value, values, setFieldValue)}
                            />
                          </FormGrid>

                          <FormGrid>
                            <DateInput
                              maxHeight={60}
                              error={errors.dateOfBirth}
                              value={values.dateOfBirth}
                              id="dateOfBirthButton"
                              onChange={(value) => {
                                setFieldValue('dateOfBirth', dayjs(value).local().format('YYYY-MM-DD'), false)
                                validationSeen('dateOfBirth')
                              }}
                              maxDate={moment().subtract(18, 'years')}
                            />
                            <Select
                              error={errors.gender}
                              id="genderDropdown"
                              label="Gender"
                              selectedItem={values.gender}
                              items={genders}
                              onSelect={(gender) => onSelectChange('gender', gender, setFieldValue)}
                            />
                          </FormGrid>

                          <FormGrid>
                            <Select
                              error={errors.nationality}
                              withScroll
                              id="nationalityDropdown"
                              label="Nationality"
                              selectedItem={values.nationality}
                              items={countries}
                              onSelect={(nationality) => onSelectChange('nationality', nationality, setFieldValue)}
                            />
                            <Select
                              error={errors.citizenship}
                              withScroll
                              id="citizenshipDropdown"
                              label="Citizenship"
                              selectedItem={values.citizenship}
                              items={countries}
                              onSelect={(citizenship) => onSelectChange('citizenship', citizenship, setFieldValue)}
                            />
                          </FormGrid>
                          <FormGrid>
                            <PhoneInput
                              error={errors.phoneNumber}
                              value={values.phoneNumber}
                              onChange={(value) => {
                                setFieldValue('phoneNumber', value, false)
                                validateValue('phoneNumber', value)
                                validationSeen('phoneNumber')
                              }}
                            />
                            <TextInput
                              id="emailAddressField"
                              label="Email address:"
                              value={values.email}
                              error={errors.email}
                              onChange={(e: any) => onChangeInput('email', e.currentTarget.value, values, setFieldValue)}
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
                              label="Address"
                              id="addressField"
                              value={values.address}
                              error={errors.address}
                              onChange={(e: any) => onChangeInput('address', e.currentTarget.value, values, setFieldValue)}
                            />
                            <TextInput
                              label="Postal Code"
                              id="postalCodeField"
                              value={values.postalCode}
                              error={errors.postalCode}
                              onChange={(e: any) => onChangeInput('postalCode', e.currentTarget.value, values, setFieldValue)}
                            />
                          </FormGrid>

                          <FormGrid>
                            <Select
                              withScroll
                              label="Country"
                              id="countryDropdown"
                              selectedItem={values.country}
                              items={countries.filter(
                                ({ label }) =>
                                  !['United States of America', 'United States Minor Outlying Islands'].includes(label)
                              )}
                              onSelect={(country) => onSelectChange('country', country, setFieldValue)}
                              error={errors.country}
                            />
                            <TextInput
                              label="City"
                              id="cityField"
                              value={values.city}
                              error={errors.city}
                              onChange={(e: any) => onChangeInput('city', e.currentTarget.value, values, setFieldValue)}
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
                              label="ID Issuance Date"
                              id="documentIssueDateButton"
                              maxHeight={60}
                              error={errors.idIssueDate}
                              value={values.idIssueDate}
                              onChange={(value) => {
                                setFieldValue('idIssueDate', dayjs(value).local().format('YYYY-MM-DD'), false)
                                validationSeen('idIssueDate')
                              }}
                              maxDate={new Date()}
                            />
                            <DateInput
                              label="ID Expiration Date"
                              id="documentExpiryDateButton"
                              maxHeight={60}
                              error={errors.idExpiryDate}
                              value={values.idExpiryDate}
                              onChange={(value) => {
                                setFieldValue('idExpiryDate', dayjs(value).local().format('YYYY-MM-DD'), false)
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
                            error={errors.proofOfIdentity}
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
                            title="Proof of Address"
                            subtitle="Bank Statement or Utility Bills within 3 months of issuance"
                            error={errors.proofOfAddress}
                            files={values.proofOfAddress}
                            onDrop={(file) => handleDropImage(file, values, 'proofOfAddress', setFieldValue)}
                            handleDeleteClick={handleImageDelete(values, 'proofOfAddress', values.removedDocuments, setFieldValue)}
                          />
                        </Column>
                      </FormCard>

                      <FormCard id="financial">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Financial Information</Trans>
                          </TYPE.title6>
                          {financialFilled && <StyledBigPassed />}
                          {financialFailed && <InvalidFormInputIcon /> }
                        </RowBetween>
                        <Column style={{ gap: '20px' }}>
                          <FormGrid columns={2}>
                            <Select
                              label="Occupation"
                              id="occupationDropdown"
                              selectedItem={values.occupation}
                              items={occupationList}
                              onSelect={(status) => onSelectChange('occupation', status, setFieldValue)}
                              error={errors.occupation}
                            />
                            <Select
                              label="Employment Status"
                              id="employmentStatusDropdown"
                              selectedItem={values.employmentStatus}
                              items={empleymentStatuses}
                              onSelect={(status: any) => onSelectChange('employmentStatus', status, setFieldValue)}
                              error={errors.employmentStatus}
                            />
                          </FormGrid>

                          <FormGrid columns={2}>
                            <TextInput
                              label="Employer"
                              id="employerField"
                              value={values.employer}
                              error={errors.employer}
                              onChange={(e: any) => onChangeInput('employer', e.currentTarget.value, values, setFieldValue)}
                            />
                            <Select
                              label="Total Income (in SGD) in the Last 12 Months"
                              id="incomeUsdDropdown"
                              items={incomes}
                              selectedItem={values.income}
                              onSelect={(income) => onSelectChange('income', income, setFieldValue)}
                              error={errors.income}
                            />
                          </FormGrid>

                          <Select
                            isMulti
                            withScroll
                            label="Source of Funds"
                            id="sourceOfFundsDropdown"
                            selectedItem={values.sourceOfFunds}
                            items={sourceOfFunds}
                            value={values.sourceOfFunds}
                            error={errors.sourceOfFunds}
                            onSelect={item => onSourceOfFundsChange(item, values.sourceOfFunds, setFieldValue)}
                          />
                          
                          {values.sourceOfFunds.some((x: any) => x.label === 'Others' || x === 'Others') && (
                            <TextInput
                              style={{ marginTop: 20 }}
                              placeholder="Other Source of Funds...."
                              value={values.otherFunds}
                              error={errors.otherFunds}
                              onChange={(e: any) => onChangeInput('otherFunds', e.currentTarget.value, values, setFieldValue)}
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
                            <LinkButton type="button" onClick={() => setShowTaxModal(true)}>Learn More</LinkButton>

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

                                  <ButtonIXSGradient type="button" onClick={() => setShowTaxModal(false)} style={{ 'width': '100%', marginTop: '32px' }}>
                                    OK
                                  </ButtonIXSGradient>
                                </Column>
                              </FormCard>
                            </Modal>
                          </RowBetween>
                        </ExtraInfoCard>

                        <FieldArray name="taxDeclarations">
                          {({ insert, remove, push }) => (
                            <>
                              {values.taxDeclarations?.map((tax: any, index: number) => (
                                <>
                                  <RowBetween key={`tax-${tax.country}`} width="100%" style={{ padding: '1rem' }} alignItems="center">
                                    <FormGrid columns={2} style={{ flexGrow: 1 }}>
                                      <div>
                                        <Select
                                          withScroll
                                          label="Country of Tax Declaration"
                                          id="countryOfTaxDeclaration"
                                          selectedItem={values.taxDeclarations[index].country}
                                          items={countries.filter(
                                            ({ label }) =>
                                              !['United States of America', 'United States Minor Outlying Islands'].includes(label)
                                          )}
                                          onSelect={(country) => onSelectChange(`taxDeclarations[${index}].country`, country, setFieldValue)}
                                          error={errors[`taxDeclarations[${index}].country`]}
                                        />

                                        {errors[`taxDeclarations[${index}].country`] && (
                                          <TYPE.small marginTop="8px" color={'red1'}>
                                            {errors[`taxDeclarations[${index}].country`]}
                                          </TYPE.small>
                                        )}
                                      </div>

                                      <div>
                                        <TextInput 
                                          label="Tax Identification Number (TIN)"
                                          id="taxIdentificationNumberField"
                                          value={values.taxDeclarations[index].idNumber} 
                                          error={errors[`taxDeclarations[${index}].idNumber`]}
                                          disabled={values.taxDeclarations[index].isAdditional}
                                          onChange={e => onChangeInput(`taxDeclarations[${index}].idNumber`, e.currentTarget.value, values, setFieldValue)} 
                                        />
                                        {errors[`taxDeclarations[${index}].idNumber`] && (
                                          <TYPE.small marginTop="8px" color={'red1'}>
                                            {errors[`taxDeclarations[${index}].idNumber`]}
                                          </TYPE.small>
                                        )}
                                      </div>
                                    </FormGrid>
                                    
                                    {index > 0 && (
                                      <IconButton 
                                        onClick={() => removeTaxDeclaration(values, index, setFieldValue, remove)} 
                                        style={{ padding: '0 1rem', marginTop: '2rem' }}
                                      >
                                        <TrashIcon />
                                      </IconButton>
                                    )}
                                  </RowBetween>
                                  <br />

                                  <LabeledCheckBox>
                                    <Checkbox 
                                      label={''} 
                                      checked={values.taxDeclarations[index].isAdditional}
                                      onClick={() => onIsAdditionalChange(index, setFieldValue)}
                                    />

                                    <TYPE.description3>TIN is not available (please indicate reason):</TYPE.description3>
                                  </LabeledCheckBox>

                                  {values.taxDeclarations[index].isAdditional && (
                                    <>
                                      <TextInput 
                                        label="Reason"
                                        value={values.taxDeclarations[index].reason}
                                        onChange={e => onChangeInput(`taxDeclarations[${index}].reason`, e.currentTarget.value, values, setFieldValue)} 
                                      />
                                      
                                      {errors[`taxDeclarations[${index}].reason`] && (
                                        <TYPE.small marginTop="8px" color={'red1'}>
                                          {errors[`taxDeclarations[${index}].reason`]}
                                        </TYPE.small>
                                      )}
                                    </>
                                  )}
                                </>
                              ))}
                              
                              <HrLine />

                              <LinkButton 
                                type="button"
                                onClick={() => push({ country: null, idNumber: '', isAdditional: false})} 
                                style={{ marginTop: "32px", width: "100%" }}
                              >
                                <ExtraInfoCard>
                                  <RowBetween>
                                    <Box> Add Country </Box>
                                    <Plus />
                                  </RowBetween>
                                </ExtraInfoCard>
                              </LinkButton>
                              
                              {errors.taxDeclarations && (
                                <TYPE.small marginTop="8px" color={'red1'}>
                                  {errors.taxDeclarations}
                                </TYPE.small>
                              )}
                            </>
                          )}
                        </FieldArray>
                        
                        <RowBetween marginBottom="32px" marginTop="64px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>FATCA</Trans>
                          </TYPE.title6>
                          {fatcaFilled && <StyledBigPassed />}
                        </RowBetween>

                        <ExtraInfoCard>
                          <RowBetween>
                            <TYPE.buttonMuted>Declaration of US Citizenship or US residence for FATCA</TYPE.buttonMuted>
                            <LinkButton type="button" onClick={() => setShowFATCAModal(true)}>Learn More</LinkButton>

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

                                  <ButtonIXSGradient type="button" onClick={() => setShowFATCAModal(false)} style={{ 'width': '100%', marginTop: '32px' }}>
                                    OK
                                  </ButtonIXSGradient>
                                </Column>
                              </FormCard>
                            </Modal>
                          </RowBetween>
                        </ExtraInfoCard>

                        <Column style={{ gap: '20px', marginTop: 20 }}>
                          <Column style={{ gap: '8px' }}>
                            <Checkbox
                              isRadio
                              id="citizenOfUS"
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
                            id="notCitizenOfUS"
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

                      <FormCard id="status-declaration">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Investor Status Declaration</Trans>
                          </TYPE.title6>
                          {statusDeclarationFilled && <StyledBigPassed />}
                          {statusDeclarationFailed && <InvalidFormInputIcon /> }
                        </RowBetween>

                        <Column style={{ gap: '34px' }}>
                          <Row style={{ gap: '12px' }} justifyContent="space-evenly">
                            <BorderBox active={values.accredited === 1}>
                              <Checkbox
                                name="accredited"
                                isRadio
                                checked={values.accredited === 1}
                                onClick={() => onAccreditedChange(1, setFieldValue)}
                                label={`I declare I am an Individual Accredited Investor`}
                              />
                            </BorderBox>
                            
                            <BorderBox active={values.accredited === 0}>
                              <Checkbox
                                name="accredited"
                                id="retailInvestor"
                                isRadio
                                checked={values.accredited === 0}
                                onClick={() => onAccreditedChange(0, setFieldValue)}
                                label="I declare I am a Retail Investor"
                              />
                            </BorderBox>
                          </Row>
                          
                          {errors.accredited && (
                            <TYPE.small marginTop="-4px" color={'red1'}>
                              <Trans>Choose one</Trans>
                            </TYPE.small>
                          )}
                        </Column>
                      </FormCard>

                      {values.accredited === 1 && (
                        <>
                          <FormCard id="investor-declaration">
                            <RowBetween marginBottom="32px">
                              <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                                <Trans>Investor Declaration</Trans>
                              </TYPE.title6>
                            </RowBetween>

                            <Column style={{ margin: '1rem', marginLeft: 0, gap: "1rem" }}>
                              <LabeledCheckBox>
                                <Checkbox
                                  name=""
                                  label=""
                                  checked={values.isTotalAssets}
                                  onClick={() => onInvestorDeclarationChange('isTotalAssets', !values.isTotalAssets, values, setFieldValue)}
                                />
                                <TYPE.description3>
                                  My total net personal assets (including up to SGD 1 million of your primary residence) exceed SGD 2 million
                                </TYPE.description3>
                              </LabeledCheckBox>

                              <LabeledCheckBox>
                                <Checkbox
                                  name=""
                                  label=""
                                  checked={values.isAnnualIncome}
                                  onClick={() => onInvestorDeclarationChange('isAnnualIncome', !values.isAnnualIncome, values, setFieldValue)}
                                />
                                <TYPE.description3>
                                  My income in the preceding 12 months is not less than SGD 300,000 (or its equivalent in a foreign currency)
                                </TYPE.description3>
                              </LabeledCheckBox>

                              <LabeledCheckBox>
                                <Checkbox
                                  name=""
                                  label=""
                                  checked={values.isFinancialAssets}
                                  onClick={() => onInvestorDeclarationChange('isFinancialAssets', !values.isFinancialAssets, values, setFieldValue)}
                                />
                                <TYPE.description3>
                                  My personal financial asset (e.g. deposits and investment product) exceed SGD 1 million or 
                                  its equivalent (or its equivalent in foreign currency)
                                </TYPE.description3>
                              </LabeledCheckBox>
                              
                              <LabeledCheckBox>
                                <Checkbox
                                  name=""
                                  label=""
                                  checked={values.isJointIncome}
                                  onClick={() => onInvestorDeclarationChange('isJointIncome', !values.isJointIncome, values, setFieldValue)}
                                />
                                <TYPE.description3>
                                  My jointly held account with my spouse/any individual meets any of the above
                                </TYPE.description3>
                              </LabeledCheckBox>
                              
                              
                              
                            </Column>

                            {errors.investorDeclarationIsFilled && (
                              <TYPE.small marginTop="-4px" color={'red1'}>
                                <Trans>{errors.investorDeclarationIsFilled}</Trans>
                              </TYPE.small>
                            )}
                            
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
                                  checked={values.acceptOfQualification} 
                                  onClick={() => onChangeInput('acceptOfQualification', !values.acceptOfQualification, values, setFieldValue)}
                                />

                                <TYPE.description3>
                                  I have been informed of and understand the consequences of my qualification as an Accredited Investor, 
                                  in particular the reduced regulatory investor 
                                  <InlineLinkButton type="button" onClick={() => setShowSafeguardModal(true)}>safeguards</InlineLinkButton> 
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

                                      <ButtonIXSGradient type="button" onClick={() => setShowSafeguardModal(false)} style={{ 'width': '100%', marginTop: '32px' }}>
                                        OK
                                      </ButtonIXSGradient>
                                    </Column>
                                  </FormCard>
                                </Modal>
                              </LabeledCheckBox>

                              {errors.acceptOfQualification && (
                                <TYPE.small marginTop="-4px" color={'red1'}>
                                  <Trans>{errors.acceptOfQualification}</Trans>
                                </TYPE.small>
                              )}
                              
                              
                              <LabeledCheckBox>
                                <Checkbox 
                                  label={''} 
                                  checked={values.acceptRefusalRight}
                                  onClick={() => onChangeInput('acceptRefusalRight', !values.acceptRefusalRight, values, setFieldValue)}
                                />

                                <TYPE.description3>
                                  I have been informed of and understand my right to 
                                  <InlineLinkButton type="button" onClick={() => setShowOptoutModal(true)}>opt out</InlineLinkButton> 
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
                                        <ButtonGradientBorder type="button" onClick={() => setShowOptoutModal(false)} style={{ 'width': '100%', marginTop: '32px' }}>
                                          Cancel
                                        </ButtonGradientBorder>

                                        <ButtonIXSGradient type="button" onClick={openConfirmationModal} style={{ 'width': '100%', marginTop: '32px' }}>
                                          Opt Out
                                        </ButtonIXSGradient>
                                        
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
                                        <ButtonGradientBorder type="button" onClick={() => setShowOptoutConfirmationModal(false)} style={{ 'width': '100%', marginTop: '32px' }}>
                                          Cancel
                                        </ButtonGradientBorder>

                                        <ButtonIXSGradient type="button" onClick={() => confirmOptOut(setFieldValue)} style={{ 'width': '100%', marginTop: '32px' }}>
                                          Ok
                                        </ButtonIXSGradient>
                                        
                                      </FormGrid>
                                    </Column>
                                  </FormCard>
                                </Modal>
                              </LabeledCheckBox>
                              
                              {errors.acceptRefusalRight && (
                                <TYPE.small marginTop="-4px" color={'red1'}>
                                  <Trans>{errors.acceptRefusalRight}</Trans>
                                </TYPE.small>
                              )}
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
                                error={errors.evidenceOfAccreditation}
                                files={values.evidenceOfAccreditation}
                                onDrop={(file) => handleDropImage(file, values, 'evidenceOfAccreditation', setFieldValue)}
                                handleDeleteClick={handleImageDelete(values, 'evidenceOfAccreditation', values.removedDocuments, setFieldValue)}
                              />
                            </Column>
                          </FormCard>
                          
                          <FormCard id="acknowledgement">
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
                                onClick={() => onChangeInput('confirmStatusDeclaration', !values.confirmStatusDeclaration, values, setFieldValue)}
                              />

                              <TYPE.description3>
                                I understand and acknowledge that any offer made to me via IX Swap is an exempt offer of securities in
                                accordance with Section 275 of the Securities and Futures Act 2001 of Singapore and is not accompanied by a
                                prospectus that is reviewed or vetted by the Monetary Authority of Singapore. I am interested in receiving and
                                participating in such offers.
                              </TYPE.description3>
                            </LabeledCheckBox>

                            {errors.confirmStatusDeclaration && (
                              <TYPE.small marginTop="8px" color={'red1'}>
                                {errors.confirmStatusDeclaration}
                              </TYPE.small>
                            )}
                          </FormCard>
                        </>
                      )}
                    </Column>
                  </FormContainer>

                  <StyledStickyBox>
                    <KYCValidationErrors fields={Object.keys(errors)} />
                    <KYCProgressBar
                      handleSubmit={handleSubmit}
                      handleSaveProgress={() => saveProgress(form?.current?.values)}
                      // disabled={!(dirty && Object.keys(errors).length === 0)}
                      disabled={!canSubmit || Object.keys(errors).length !== 0}
                      topics={[
                        { title: 'Personal Information', href: 'personal', passed: personalFilled && addressFilled && filesFilled && identityDocumentFilled, failed: personalFailed },
                        { title: 'Financial Information', href: 'financial', passed: financialFilled, failed: financialFailed },
                        { title: 'Investor Status Declaration', href: 'status-declaration', passed: statusDeclarationFilled, failed: statusDeclarationFailed },
                        // { title: 'Investor Declaration', href: 'investor-declaration', passed: investorFilled },
                        // { title: 'Acknowledgement', href: 'acknowledgement', passed: investorStatusAcknowledgementFilled },
                      ]}
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

const LinkButton = styled(LinkStyledButton)`
  color: #4C88FF;
`

const InlineLinkButton = styled(LinkStyledButton)`
  color: #AC83FF;
`
