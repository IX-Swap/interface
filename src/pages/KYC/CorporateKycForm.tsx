import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import { FileWithPath } from 'react-dropzone'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import { isMobile } from 'react-device-detect'
import { useCookies } from 'react-cookie'
import { Prompt } from 'react-router-dom'
import { ReactComponent as TrashIcon } from 'assets/images/newDelete.svg'
import usePrevious from 'hooks/usePrevious'
import Column from 'components/Column'
import { ButtonText, ButtonIXSGradient } from 'components/Button'
import { TYPE } from 'theme'
import { GradientText } from 'pages/CustodianV2/styleds'
import { StyledBodyWrapper } from 'pages/SecurityTokens'
import { RowBetween, RowCenter } from 'components/Row'
import { PhoneInput } from 'components/PhoneInput'
import { Checkbox } from 'components/Checkbox'
import { Loadable } from 'components/LoaderHover'
import { useAuthState } from 'state/auth/hooks'
import { useAddPopup, useShowError } from 'state/application/hooks'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { ReactComponent as ArrowLeft } from 'assets/images/newBack.svg'
import { getCorporateProgress, useCreateCorporateKYC, useKYCState, useUpdateCorporateKYC } from 'state/kyc/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { countriesList } from 'constants/countriesList'
import { MAX_FILE_UPLOAD_SIZE, MAX_FILE_UPLOAD_SIZE_ERROR } from 'constants/constants'
import { DateInput } from 'components/DateInput'

import { Select, TextInput, Uploader } from './common'
import { KYCProgressBar } from './KYCProgressBar'
import { corporateSourceOfFunds, legalEntityTypes, corporateFormInitialValues, promptValue } from './mock'
import {
  FormCard,
  FormGrid,
  ExtraInfoCard,
  Divider,
  StyledStickyBox,
  StyledBigPassed,
  ExtraInfoCardCountry,
} from './styleds'
import { ChooseFile, BeneficialOwnersTable, DeleteRow } from './common'
import { FormContainer, FormRow } from './IndividualKycForm'
import { corporateErrorsSchema } from './schema'
import { KYCStatuses } from './enum'
import { corporateTransformApiData, corporateTransformKycDto } from './utils'
import { Box } from 'rebass'
import { Plus } from 'react-feather'
import { IconButton } from '@material-ui/core'

type FormSubmitHanderArgs = {
  createFn: (body: any) => any
  updateFn: (id: number, body: any) => any
  validate: boolean
}

export default function CorporateKycForm() {
  const canLeavePage = useRef(false)
  const [cookies] = useCookies(['annoucementsSeen'])
  const [waitingForInitialValues, setWaitingForInitialValues] = useState(true)
  const [updateKycId, setUpdateKycId] = useState<any>(null)
  const [formData, setFormData] = useState<any>(null)
  const [canSubmit, setCanSubmit] = useState(true)
  const [isSubmittedOnce, setIsSubmittedOnce] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const history = useHistory()
  const { kyc, loadingRequest } = useKYCState()
  const showError = useShowError()
  const addPopup = useAddPopup()
  const createCorporateKYC = useCreateCorporateKYC()
  const updateCorporateKYC = useUpdateCorporateKYC()
  const { account } = useActiveWeb3React()
  const { token } = useAuthState()
  const [isTaxNumberDisabled, setIsTaxNumberDisabled] = useState<boolean>(false)

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

    // const getProgress = async () => {
    //   const data = await getCorporateProgress()
    //   if (data) {
    //     const transformedData = corporateTransformApiData(data)
    //     setFormData(transformedData)
    //     if (!data.taxIdAvailable) {
    //       setIsTaxNumberDisabled(true)
    //     }
    //   }
    // }

    const getProgress = async () => {
      const data = await getCorporateProgress()
      if (data) {
        const transformedData = corporateTransformApiData(data)
        const formData = { ...transformedData }

        setFormData(formData)
        form.current.setValues(formData)

        if (kyc?.status === KYCStatuses.DRAFT) {
          setCanSubmit(true)
        }
      }
    }

    if (kyc?.status === KYCStatuses.CHANGES_REQUESTED || kyc?.status === KYCStatuses.DRAFT) {
      getProgress()
      setUpdateKycId(kyc.id)
    } else {
      setFormData(corporateFormInitialValues)
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

  const goBack = (e?: any) => {
    if (e) e.preventDefault()
    history.push('/kyc')
  }

  const changeBeneficiar = (
    fieldName: string,
    value: string | FileWithPath | null,
    index: number,
    owners: any,
    setFieldValue: any,
    specificErrorField: string
  ) => {
    const beneficiar = owners[index]
    const newData = [...owners]

    if (value && typeof value === 'object' && value?.size > MAX_FILE_UPLOAD_SIZE) {
      showError(MAX_FILE_UPLOAD_SIZE_ERROR)
      return
    }

    if (beneficiar[fieldName]?.id) {
      setFieldValue('removedDocuments', [beneficiar[fieldName].id])
    }
    newData.splice(index, 1, { ...beneficiar, [fieldName]: value })

    setFieldValue('beneficialOwners', newData, false)
    validationSeen(specificErrorField)
    validationSeen('beneficialOwners')
  }

  const addBeneficiary = (owners: any, setFieldValue: any) => {
    setFieldValue(
      'beneficialOwners',
      [...owners, { fullName: '', shareholding: '', proofOfAddress: null, proofOfIdentity: null }],
      false
    )
  }

  const deleteBeneficiar = (index: number, owners: any, removedBeneficialOwners: any[], setFieldValue: any) => {
    const newData = [...owners]
    if (newData[index]?.id) {
      setFieldValue('removedBeneficialOwners', [...removedBeneficialOwners, newData[index].id])
    }
    newData.splice(index, 1)

    if (!newData.length) {
      newData.push({ fullName: '', shareholding: '', proofOfAddress: null, proofOfIdentity: null })
    }
    setFieldValue('beneficialOwners', newData, false)
  }

  const onSourceOfFundsChange = (source: string, fields: any[], setFieldValue: any) => {
    fields = fields ?? []
    const newSources = [...fields]
    const indexOfSource = fields.indexOf(source)

    // check for existence
    if (indexOfSource > -1) {
      newSources.splice(indexOfSource, 1)
    } else if (fields.includes('Others')) {
      const othersIndex = fields.indexOf('Others')
      newSources.splice(othersIndex - 1, 0, source)
    } else {
      newSources.push(source)
    }

    setFieldValue('sourceOfFunds', newSources, false)
    validationSeen('sourceOfFunds')
    validationSeen('otherFunds')
  }

  const countries = useMemo(() => {
    return countriesList.map((label, index) => ({ id: ++index, label })).sort((a, b) => a.label.localeCompare(b.label))
  }, [])

  const validationSeen = (key: string) => {
    if (errors[key]) {
      const newErrors = { ...errors }
      delete newErrors[key]
      setErrors(newErrors)
      setCanSubmit(true)
    }
  }

  const onChangeInput = (key: string, value: string | boolean, values: any, setFieldValue: any) => {
    if (values[key] !== value) {
      setFieldValue(key, value, false)
    }

    validationSeen(key)
  }

  const onSelectChange = (key: string, value: any, setFieldValue: any) => {
    setFieldValue(key, value, false)
    validationSeen(key)
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

  const formSubmitHandler = useCallback(
    async (values: any, { createFn, updateFn, validate = true }: FormSubmitHanderArgs) => {
      try {
        if (validate) {
          await corporateErrorsSchema.validate(values, { abortEarly: false })
        }

        canLeavePage.current = true
        setCanSubmit(false)
        const body = corporateTransformKycDto(values)
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

        // console.log(error, 'kjkjkjkjkj')

        error?.inner.forEach((e: any) => {
          newErrors[e.path] = e?.message
        })

        addPopup({ info: { success: false, summary: 'Please, fill the valid data' } })

        setIsSubmittedOnce(true)
        setErrors(newErrors)
        setCanSubmit(false)

        canLeavePage.current = false
      }
    },
    [updateKycId]
  )

  const saveProgress = useCallback(
    async (values: any) => {
      await formSubmitHandler(values, {
        createFn: (body) => createCorporateKYC(body, true),
        updateFn: (id, body) => updateCorporateKYC(id, body, true),
        validate: false,
      })
    },
    [formSubmitHandler]
  )

  return (
    <Loadable loading={!isLoggedIn}>
      <Prompt when={!canLeavePage.current} message={promptValue} />
      <LoadingIndicator isLoading={loadingRequest} />

      <StyledBodyWrapper style={{ background: 'none', boxShadow: 'none' }} hasAnnouncement={!cookies.annoucementsSeen}>
        {/* <ButtonText
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
            <GradientText style={{ marginLeft: 8, fontSize: isMobile ? 26 : 36 }}>Corporate</GradientText>
          </TYPE.title4>
        </ButtonText> */}

        {/* <ButtonText
          style={{ textDecoration: 'none' }}
          display="flex"
          marginBottom={isMobile ? '0px' : '30px'}
          marginTop={isMobile ? '80px' : '10px'}
          onClick={goBack}
        >
          <ArrowLeft style={{ width: isMobile ? 20 : 26 }} />
          <TYPE.title4
            fontWeight={'800'}
            fontSize={isMobile ? 24 : 24}
            style={{ whiteSpace: 'nowrap' }}
            marginLeft="10px"
          >
            <Trans>KYC as Corporate</Trans>
          </TYPE.title4>
        </ButtonText> */}

        {!waitingForInitialValues && formData && (
          <Formik
            innerRef={form}
            initialValues={corporateFormInitialValues}
            initialErrors={errors}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            isInitialValid={false}
            enableReinitialize
            onSubmit={async (values) => {
              try {
                await corporateErrorsSchema.validate(values, { abortEarly: false })
                // .then(async () => {
                canLeavePage.current = true
                setCanSubmit(false)
                if (values?.taxIdAvailable === false) {
                  values.taxNumber = ''
                } else {
                  values.reason = ''
                }
                const body = corporateTransformKycDto(values)
                const data = updateKycId ? await updateCorporateKYC(updateKycId, body) : await createCorporateKYC(body)

                // let data: any = null

                // if (updateKycId) {
                //   data = await updateCorporateKYC(updateKycId, body)
                // } else {
                //   data = await createCorporateKYC(body)
                // }

                if (data?.id) {
                  history.push('/kyc')
                  addPopup({
                    info: {
                      success: true,
                      summary: `KYC was successfully ${updateKycId ? 'updated' : 'submitted'}`,
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
              // })
              // .catch((error) => {
              //   const newErrors: any = {}
              //   error.inner.forEach((e: any) => {
              //     newErrors[e.path] = e.message
              //   })
              // addPopup({
              //   info: {
              //     success: false,
              //     summary: 'Please, fill the valid data',
              //   },
              // })
              // setIsSubmittedOnce(true)
              // setErrors(newErrors)
              // setCanSubmit(false)
              // canLeavePage.current = false
              // })
            }}
          >
            {({ values, setFieldValue, dirty, handleSubmit }) => {
              if (values?.taxIdAvailable === undefined) {
                if (values === null) {
                  values = {}
                }

                values.taxIdAvailable = true
              }
              if (!values.reason) values.reason = 'A'
              {
                /* {({ values, setFieldValue, dirty, handleSubmit }) => {
              if (values.taxIdAvailable === undefined) values.taxIdAvailable = true
              if (!values.reason) values.reason = 'A' */
              }

              const shouldValidate = dirty && isSubmittedOnce
              const infoFilled =
                shouldValidate &&
                !errors.corporateName &&
                !errors.countryOfIncorporation &&
                !errors.businessActivity &&
                !errors.registrationNumber &&
                !errors.incorporationDate &&
                !errors.inFatfJurisdiction
              const authorizedPersonnelFilled =
                shouldValidate &&
                !errors.personnelName &&
                !errors.designation &&
                !errors.email &&
                !errors.phoneNumber &&
                !errors.authorizationDocuments
              const addressFilled =
                shouldValidate && !errors.address && !errors.postalCode && !errors.city && !errors.country
              const residentialAddressFilled =
                shouldValidate &&
                !errors.residentialAddressAddress &&
                !errors.residentialAddressPostalCode &&
                !errors.residentialAddressCountry &&
                !errors.residentialAddressCity
              const fundsFilled = shouldValidate && !errors.sourceOfFunds && !errors.otherFunds
              const fatcaFilled = shouldValidate && !errors.usTin && !errors.isUSTaxPayer
              // const investorFilled = shouldValidate && !errors.accredited
              const taxDeclarationFilled = values.taxIdAvailable
                ? shouldValidate && !errors.taxCountry && !errors.taxNumber
                : shouldValidate
              const filesFilled = shouldValidate && !errors.financialDocuments && !errors.corporateDocuments
              const beneficialOwnersFilled =
                shouldValidate && !Object.keys(errors).some((errorField) => errorField.startsWith('beneficialOwners'))

              return (
                <FormRow>
                  <FormContainer onSubmit={handleSubmit} style={{ gap: '35px' }}>
                    <Column style={{ gap: '35px' }}>
                      <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="info">
                        <ButtonText
                          style={{ textDecoration: 'none' }}
                          display="flex"
                          marginBottom={isMobile ? '32px' : '30px'}
                          marginTop={isMobile ? '20px' : '10px'}
                          onClick={goBack}
                        >
                          <ArrowLeft style={{ width: isMobile ? 20 : 26 }} />
                          <TYPE.title4
                            fontWeight={'800'}
                            fontSize={isMobile ? 24 : 24}
                            style={{ whiteSpace: 'nowrap' }}
                            marginLeft="10px"
                          >
                            <Trans>KYC as Corporate</Trans>
                          </TYPE.title4>
                        </ButtonText>
                        <RowBetween marginBottom="32px">
                          <TYPE.title7>
                            <Trans>Corporate Information</Trans>
                          </TYPE.title7>
                          {infoFilled && <StyledBigPassed />}
                        </RowBetween>

                        <Column style={{ gap: '20px' }}>
                          <FormGrid columns={3}>
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('corporateName', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.corporateName}
                              label="Corporate Name"
                              placeholder="Corporate Name"
                              error={errors.corporateName && errors.corporateName}
                            />
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('registrationNumber', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.registrationNumber}
                              label="Registration Number"
                              placeholder="Registration Number"
                              error={errors.registrationNumber && errors.registrationNumber}
                            />
                            <Select
                              withScroll
                              placeholder="Country of Incorporation"
                              label="Country of Incorporation"
                              selectedItem={values.countryOfIncorporation}
                              items={countries}
                              onSelect={(country) => onSelectChange('countryOfIncorporation', country, setFieldValue)}
                              error={errors.countryOfIncorporation && errors.countryOfIncorporation}
                            />
                          </FormGrid>

                          <FormGrid columns={2}>
                            <TextInput
                              label="Business Activity"
                              placeholder="Business Activity"
                              value={values.businessActivity}
                              onChange={(e: any) =>
                                onChangeInput('businessActivity', e.currentTarget.value, values, setFieldValue)
                              }
                              error={errors.businessActivity && errors.businessActivity}
                            />
                            <Select
                              withScroll
                              label="Type of legal entity"
                              placeholder="Type of legal entity"
                              selectedItem={values.typeOfLegalEntity}
                              items={legalEntityTypes}
                              onSelect={(entityType) => onSelectChange('typeOfLegalEntity', entityType, setFieldValue)}
                              error={errors.typeOfLegalEntity && errors.typeOfLegalEntity}
                            />
                          </FormGrid>
                          <FormGrid>
                            <DateInput
                              label="Date of Incorporation"
                              placeholder="Date of Incorporation"
                              maxHeight={60}
                              error={errors.incorporationDate}
                              value={values.incorporationDate}
                              onChange={(value) => {
                                setFieldValue('incorporationDate', value, false)
                                validationSeen('incorporationDate')
                              }}
                              maxDate={new Date()}
                            />
                          </FormGrid>
                          <FormGrid columns={1}>
                            <Checkbox
                              checked={values.inFatfJurisdiction}
                              onClick={() =>
                                onChangeInput('inFatfJurisdiction', !values.inFatfJurisdiction, values, setFieldValue)
                              }
                              label="Is The Ultimate Holding Company A Regulated Entity Or Listed Company In a FATF Jurisdiction?"
                            />
                          </FormGrid>
                        </Column>
                      </FormCard>

                      <FormCard id="authorizedPersonnel">
                        <RowBetween marginBottom="32px">
                          <TYPE.title7>
                            <Trans>Company Authorized Personnel</Trans>
                          </TYPE.title7>
                          {authorizedPersonnelFilled && <StyledBigPassed />}
                        </RowBetween>

                        <Column style={{ gap: '20px' }}>
                          <FormGrid>
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('personnelName', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.personnelName}
                              label="Full Name"
                              placeholder="Full Name"
                              error={errors.personnelName && errors.personnelName}
                            />
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('designation', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.designation}
                              label="Designation"
                              placeholder="Designation"
                              error={errors.designation && errors.designation}
                            />
                          </FormGrid>

                          <FormGrid>
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('email', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.email}
                              label="Email address"
                              placeholder="Email address"
                              error={errors.email && errors.email}
                            />
                            <PhoneInput
                              onChange={(value) => onChangeInput('phoneNumber', value, values, setFieldValue)}
                              value={values.phoneNumber}
                              label="Phone Number"
                              error={errors.phoneNumber && errors.phoneNumber}
                            />
                          </FormGrid>
                          <FormGrid columns={1}>
                            <Uploader
                              title="Authorization Document"
                              subtitle="Board Resolution, Power of Attorney, Partnership Deed, Trust Deed, and Others"
                              files={values.authorizationDocuments}
                              onDrop={(file) => {
                                handleDropImage(file, values, 'authorizationDocuments', setFieldValue)
                              }}
                              error={errors.authorizationDocuments && errors.authorizationDocuments}
                              handleDeleteClick={handleImageDelete(
                                values,
                                'authorizationDocuments',
                                values.removedDocuments,
                                setFieldValue
                              )}
                            />
                          </FormGrid>
                        </Column>
                      </FormCard>

                      <FormCard id="address">
                        <RowBetween marginBottom="32px">
                          <TYPE.title7>
                            <Trans>Address</Trans>
                          </TYPE.title7>
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
                              placeholder="Address"
                              error={errors.address && errors.address}
                            />
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('postalCode', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.postalCode}
                              label="Postal Code"
                              placeholder="Postal Code"
                              error={errors.postalCode && errors.postalCode}
                            />
                          </FormGrid>

                          <FormGrid>
                            <Select
                              withScroll
                              label="Country"
                              selectedItem={values.country}
                              items={countries}
                              onSelect={(country) => onSelectChange('country', country, setFieldValue)}
                              error={errors.country && errors.country}
                            />
                            <TextInput
                              onChange={(e: any) => onChangeInput('city', e.currentTarget.value, values, setFieldValue)}
                              value={values.city}
                              label="City"
                              placeholder="City"
                              error={errors.city && errors.city}
                            />
                          </FormGrid>
                        </Column>
                      </FormCard>

                      <FormCard id="residentialAddress">
                        <RowBetween marginBottom="32px">
                          <TYPE.title7>
                            <Trans>Residential Address</Trans>
                          </TYPE.title7>
                          {residentialAddressFilled && <StyledBigPassed />}
                        </RowBetween>

                        <Column style={{ gap: '20px' }}>
                          <FormGrid>
                            <TextInput
                              placeholder="Address"
                              onChange={(e: any) =>
                                onChangeInput('residentialAddressAddress', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.residentialAddressAddress}
                              label="Address"
                              error={errors.residentialAddressAddress && errors.residentialAddressAddress}
                            />
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput(
                                  'residentialAddressPostalCode',
                                  e.currentTarget.value,
                                  values,
                                  setFieldValue
                                )
                              }
                              placeholder="Postal Code"
                              value={values.residentialAddressPostalCode}
                              label="Postal Code"
                              error={errors.residentialAddressPostalCode && errors.residentialAddressPostalCode}
                            />
                          </FormGrid>

                          <FormGrid>
                            <Select
                              withScroll
                              label="Country"
                              placeholder="Country"
                              selectedItem={values.residentialAddressCountry}
                              items={countries}
                              onSelect={(country) =>
                                onSelectChange('residentialAddressCountry', country, setFieldValue)
                              }
                              error={errors.residentialAddressCountry && errors.residentialAddressCountry}
                            />
                            <TextInput
                              onChange={(e: any) =>
                                onChangeInput('residentialAddressCity', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.residentialAddressCity}
                              label="City"
                              placeholder="City"
                              error={errors.residentialAddressCity && errors.residentialAddressCity}
                            />
                          </FormGrid>
                        </Column>
                      </FormCard>

                      <FormCard id="funds">
                        <RowBetween marginBottom="32px">
                          <TYPE.title7>
                            <Trans>Source of Funds</Trans>
                          </TYPE.title7>
                          {fundsFilled && <StyledBigPassed />}
                        </RowBetween>
                        <FormGrid columns={3}>
                          {corporateSourceOfFunds.map(({ value, label }: any) => (
                            <Checkbox
                              checked={values?.sourceOfFunds?.includes(label)}
                              onClick={() => onSourceOfFundsChange(label, values.sourceOfFunds, setFieldValue)}
                              key={`funds-${value}`}
                              label={label}
                            />
                          ))}
                        </FormGrid>
                        {values?.sourceOfFunds?.includes('Others') && (
                          <TextInput
                            style={{ marginTop: 20 }}
                            placeholder="Other Source of Funds...."
                            onChange={(e: any) =>
                              onChangeInput('otherFunds', e.currentTarget.value, values, setFieldValue)
                            }
                            value={values.otherFunds || ''}
                            error={errors.otherFunds && errors.otherFunds}
                          />
                        )}
                        {errors.sourceOfFunds && (
                          <TYPE.small marginTop="8px" color={'red1'}>
                            {errors.sourceOfFunds}
                          </TYPE.small>
                        )}
                      </FormCard>

                      {/* <FormCard id="corporate">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Investor Status Declaration</Trans>
                          </TYPE.title6>
                          {investorFilled && <StyledBigPassed />}
                        </RowBetween>

                        <Column style={{ gap: '34px' }}>
                          <Column style={{ gap: '12px' }}>
                            <Checkbox
                              name="accredited"
                              isRadio
                              checked={values.accredited === 0}
                              onClick={() => onSelectChange('accredited', 0, setFieldValue)}
                              label="I am not an accredited investor"
                            />
                            <Checkbox
                              name="accredited"
                              isRadio
                              checked={values.accredited === 1}
                              onClick={() => onSelectChange('accredited', 1, setFieldValue)}
                              label={`I declare that I am “individual accredited Investor"`}
                            />
                            {errors.accredited && (
                              <TYPE.small marginTop="-4px" color={'red1'}>
                                <Trans>Choose one</Trans>
                              </TYPE.small>
                            )}
                          </Column>
                        </Column>
                      </FormCard> */}

                      <FormCard id="fatca">
                        <RowBetween marginBottom="32px">
                          <TYPE.title7>
                            <Trans>FATCA</Trans>
                          </TYPE.title7>
                          {fatcaFilled && <StyledBigPassed />}
                        </RowBetween>

                        <ExtraInfoCard>
                          <TYPE.buttonMuted>Declaration of US Citizenship or US residence for FATCA</TYPE.buttonMuted>
                        </ExtraInfoCard>

                        <Column style={{ gap: '20px', marginTop: 20 }}>
                          <Column style={{ gap: '8px' }}>
                            <Checkbox
                              isRadio
                              checked={values.isUSTaxPayer === 1}
                              onClick={() => onSelectChange('isUSTaxPayer', 1, setFieldValue)}
                              label={`I confirm that I am a US citizen and/or resident in the US for tax purposes and my US federal taxpayer ID number (US TIN) is as follows: `}
                            />
                            {values.isUSTaxPayer === 1 && (
                              <TextInput
                                style={{ width: 284 }}
                                placeholder="ID Number.."
                                value={values.usTin || ''}
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
                            onClick={() => onSelectChange('isUSTaxPayer', 0, setFieldValue)}
                            label="I confirm that I am not a US citizen or resident in the US for tax purposes "
                          />
                          {errors.isUSTaxPayer && (
                            <TYPE.small marginTop="-4px" color={'red1'}>
                              <Trans>Choose one</Trans>
                            </TYPE.small>
                          )}
                        </Column>
                      </FormCard>

                      <FormCard id="tax-declaration">
                        <RowBetween marginBottom="32px">
                          <TYPE.title7>
                            <Trans>Tax Declaration</Trans>
                          </TYPE.title7>
                          {taxDeclarationFilled && <StyledBigPassed />}
                        </RowBetween>

                        <ExtraInfoCard>
                          <TYPE.buttonMuted>
                            Please list all jurisdictions where the Entity is a resident for tax purposes and the
                            respective TIN for each jurisdiction.
                          </TYPE.buttonMuted>
                        </ExtraInfoCard>

                        <Column style={{ gap: '20px', marginTop: 20 }}>
                          <FormGrid>
                            <Select
                              withScroll
                              label="Country of tax residency"
                              placeholder="Country of tax residency"
                              selectedItem={values.taxCountry}
                              items={countries}
                              onSelect={(country) => onSelectChange('taxCountry', country, setFieldValue)}
                              error={errors.taxCountry && errors.taxCountry}
                            />
                            <TextInput
                              value={values.taxNumber}
                              label="Tax Indentification Number"
                              placeholder="Tax Indentification Number"
                              disabled={isTaxNumberDisabled}
                              onChange={(e: any) =>
                                onChangeInput('taxNumber', e.currentTarget.value, values, setFieldValue)
                              }
                              error={errors.taxNumber && errors.taxNumber}
                            />
                          </FormGrid>
                        </Column>

                        <Column style={{ gap: '20px', marginTop: 20 }}>
                          <FormGrid columns={1}>
                            <Checkbox
                              checked={!values.taxIdAvailable}
                              onClick={() => {
                                onChangeInput('taxIdAvailable', !values.taxIdAvailable, values, setFieldValue)
                                if (values.taxIdAvailable === true) {
                                  setFieldValue('taxNumber', '', false)
                                  setIsTaxNumberDisabled(true)
                                } else {
                                  setIsTaxNumberDisabled(false)
                                }
                              }}
                              label="TIN Is Not Available"
                            />
                          </FormGrid>
                        </Column>

                        {!values.taxIdAvailable && (
                          <Column style={{ gap: '20px', marginTop: 20 }}>
                            <FormGrid columns={1}>
                              <Checkbox
                                isRadio
                                checked={values.reason === 'A'}
                                onClick={() => onSelectChange('reason', 'A', setFieldValue)}
                                label={`Reason A - The country/jurisdiction where the Account Holder is resident does not issue TINs to its residents`}
                              />
                              <Checkbox
                                isRadio
                                checked={values.reason === 'B'}
                                onClick={() => onSelectChange('reason', 'B', setFieldValue)}
                                label="Reason B - The Account Holder is otherwise unable to obtain a TIN or equivalent number (Please explain why your are unable to obtain a TIN in the below table if you have selected this reason)"
                              />
                              <Checkbox
                                isRadio
                                checked={values.reason === 'C'}
                                onClick={() => onSelectChange('reason', 'C', setFieldValue)}
                                label="Reason C - No TIN is required. (Note. Only select this reason if the domestic law of the relevant jurisdiction does not require the collection of the TIN issued by such jurisdiction)"
                              />
                            </FormGrid>
                          </Column>
                        )}
                      </FormCard>

                      <FormCard id="beneficial-owners">
                        <RowBetween marginBottom="32px">
                          <TYPE.title7>
                            <Trans>Beneficial Owners Information</Trans>
                          </TYPE.title7>
                          {beneficialOwnersFilled && <StyledBigPassed />}
                        </RowBetween>
                        <ExtraInfoCard style={{ marginBottom: 20 }}>
                          <TYPE.buttonMuted>
                            Please upload the Proof of Identity and Proof of Address for Beneficial Owner. All account
                            statements and documents should be dated within 3 months.
                          </TYPE.buttonMuted>
                        </ExtraInfoCard>
                        <BeneficialOwnersTable data={values.beneficialOwners} />
                        <Column style={{ gap: '20px' }}>
                          {values.beneficialOwners?.map((beneficiar: Record<string, string | any>, index: number) => (
                            <>
                              <FormGrid columns={5} key={index}>
                                {/* <DeleteRow
                                  onClick={() =>
                                    deleteBeneficiar(
                                      index,
                                      values?.beneficialOwners,
                                      values?.removedBeneficialOwners,
                                      setFieldValue
                                    )
                                  }
                                > */}
                                <TextInput
                                  value={beneficiar.fullName}
                                  placeholder={isMobile ? 'Full Name' : ''}
                                  onChange={(e: any) =>
                                    changeBeneficiar(
                                      'fullName',
                                      e.currentTarget.value,
                                      index,
                                      values.beneficialOwners,
                                      setFieldValue,
                                      `beneficialOwners[${index}].fullName`
                                    )
                                  }
                                  error={
                                    errors[`beneficialOwners[${index}].fullName`] &&
                                    errors[`beneficialOwners[${index}].fullName`]
                                  }
                                />
                                {/* </DeleteRow> */}
                                <TextInput
                                  type="number"
                                  onWheel={() => (document.activeElement as HTMLElement).blur()}
                                  style={{ textAlign: 'center', fontSize: '20px' }}
                                  placeholder={isMobile ? '% Shareholding' : ''}
                                  value={beneficiar.shareholding}
                                  onChange={(e: any) =>
                                    changeBeneficiar(
                                      'shareholding',
                                      e.currentTarget.value,
                                      index,
                                      values.beneficialOwners,
                                      setFieldValue,
                                      `beneficialOwners[${index}].shareholding`
                                    )
                                  }
                                  error={errors[`beneficialOwners[${index}].shareholding`] && 'Required'}
                                />
                                <ChooseFile
                                  file={beneficiar.proofOfAddress}
                                  label={isMobile ? 'Proof of Address' : null}
                                  onDrop={(file) =>
                                    changeBeneficiar(
                                      'proofOfAddress',
                                      file,
                                      index,
                                      values.beneficialOwners,
                                      setFieldValue,
                                      `beneficialOwners[${index}].proofOfAddress`
                                    )
                                  }
                                  error={
                                    errors[`beneficialOwners[${index}].proofOfAddress`] &&
                                    errors[`beneficialOwners[${index}].proofOfAddress`]
                                  }
                                  handleDeleteClick={() =>
                                    changeBeneficiar(
                                      'proofOfAddress',
                                      null,
                                      index,
                                      values.beneficialOwners,
                                      setFieldValue,
                                      `beneficialOwners[${index}].proofOfAddress`
                                    )
                                  }
                                />
                                <ChooseFile
                                  file={beneficiar.proofOfIdentity}
                                  label={isMobile ? 'Proof of Identity' : null}
                                  onDrop={(file) =>
                                    changeBeneficiar(
                                      'proofOfIdentity',
                                      file,
                                      index,
                                      values.beneficialOwners,
                                      setFieldValue,
                                      `beneficialOwners[${index}].proofOfIdentity`
                                    )
                                  }
                                  error={
                                    errors[`beneficialOwners[${index}].proofOfIdentity`] &&
                                    errors[`beneficialOwners[${index}].proofOfIdentity`]
                                  }
                                  handleDeleteClick={() =>
                                    changeBeneficiar(
                                      'proofOfIdentity',
                                      null,
                                      index,
                                      values.beneficialOwners,
                                      setFieldValue,
                                      `beneficialOwners[${index}].proofOfIdentity`
                                    )
                                  }
                                />
                                {/* <IconButton
                                onClick={() => removeTaxDeclaration(values, index, setFieldValue, remove)}
                                style={{ padding: '0 1rem', marginTop: '2rem' }}
                                > */}
                                <TrashIcon
                                  style={{ cursor: 'pointer', marginTop: '5px' }}
                                  onClick={() =>
                                    deleteBeneficiar(
                                      index,
                                      values?.beneficialOwners,
                                      values?.removedBeneficialOwners,
                                      setFieldValue
                                    )
                                  }
                                />
                                {/* </IconButton> */}
                              </FormGrid>
                              {values.beneficialOwners.length - 1 > index && <Divider />}
                            </>
                          ))}
                        </Column>
                        {errors.beneficialOwners && (
                          <TYPE.small marginTop="4px" color={'red1'}>{t`${errors.beneficialOwners}`}</TYPE.small>
                        )}
                        <ExtraInfoCardCountry
                          // type="button"
                          style={{ marginTop: 32, fontSize: 16, padding: 15 }}
                          onClick={() => addBeneficiary(values.beneficialOwners, setFieldValue)}
                        >
                          <RowCenter style={{ color: '#6666FF' }}>
                            <Plus style={{ width: '20px', marginRight: '5px', cursor: 'pointer' }} />
                            <Box> Add Beneficiary </Box>
                          </RowCenter>
                        </ExtraInfoCardCountry>
                      </FormCard>

                      <FormCard id="upload">
                        <RowBetween marginBottom="32px">
                          <TYPE.title7>
                            <Trans>Corporate Documents</Trans>
                          </TYPE.title7>
                          {filesFilled && <StyledBigPassed />}
                        </RowBetween>

                        <Column style={{ gap: '40px' }}>
                          <Uploader
                            title="Corporate documents"
                            subtitle="Company Registry Profile, Certificate of Incorporation, Memorandum and article association, Corporate registry profile, Company Organization Chart, Register of shareholders and directors and Partnership Deed, Trust Deed."
                            files={values.corporateDocuments}
                            onDrop={(file) => {
                              handleDropImage(file, values, 'corporateDocuments', setFieldValue)
                            }}
                            error={errors.corporateDocuments && errors.corporateDocuments}
                            handleDeleteClick={handleImageDelete(
                              values,
                              'corporateDocuments',
                              values.removedDocuments,
                              setFieldValue
                            )}
                          />

                          <Uploader
                            title="Financial Documents"
                            subtitle="Please upload your balance sheet , P&L statement or Annual Returns"
                            files={values.financialDocuments}
                            onDrop={(file) => {
                              handleDropImage(file, values, 'financialDocuments', setFieldValue)
                            }}
                            error={errors.financialDocuments && errors.financialDocuments}
                            handleDeleteClick={handleImageDelete(
                              values,
                              'financialDocuments',
                              values.removedDocuments,
                              setFieldValue
                            )}
                          />
                        </Column>
                      </FormCard>
                    </Column>
                  </FormContainer>

                  <StyledStickyBox
                    style={{ width: isMobile ? '100%' : 296, maxWidth: isMobile ? '100%' : 296 }}
                    offsetTop={100}
                  >
                    <KYCProgressBar
                      handleSubmit={handleSubmit}
                      handleSaveProgress={() => saveProgress(form?.current?.values)}
                      // disabled={!dirty || !canSubmit || Object.keys(errors).length !== 0}
                      disabled={!canSubmit || Object.keys(errors).length !== 0}
                      topics={Object.values({
                        info: {
                          title: 'Corporate Information',
                          href: 'info',
                          passed: infoFilled,
                        },
                        authorizedPersonnel: {
                          title: 'Company Authorized Personnel',
                          href: 'authorizedPersonnel',
                          passed: authorizedPersonnelFilled,
                        },
                        address: {
                          title: 'Address',
                          href: 'address',
                          passed: addressFilled,
                        },
                        residentialAddress: {
                          title: 'Residential Address',
                          href: 'residentialAddress',
                          passed: residentialAddressFilled,
                        },
                        funds: {
                          title: 'Source of Funds',
                          href: 'funds',
                          passed: fundsFilled,
                        },
                        fatca: {
                          title: 'FATCA',
                          href: 'fatca',
                          passed: fatcaFilled,
                        },
                        taxDeclaration: {
                          title: 'Tax Declaration',
                          href: 'tax-declaration',
                          passed: taxDeclarationFilled,
                        },
                        beneficialOwners: {
                          title: 'Beneficial Owners Information',
                          href: 'beneficial-owners',
                          passed: beneficialOwnersFilled,
                        },
                        upload: {
                          title: 'Corporate Documents',
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
