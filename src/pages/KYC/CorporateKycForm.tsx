import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import { getNames } from 'country-list'
import { FileWithPath } from 'react-dropzone'
import { useHistory } from 'react-router-dom'
import StickyBox from 'react-sticky-box'
import { Formik } from 'formik'

import Column from 'components/Column'
import { KYCProgressBar } from './KYCProgressBar'
import { ButtonText, ButtonIXSGradient } from 'components/Button'
import { TYPE } from 'theme'
import { GradientText, StyledBodyWrapper } from 'pages/CustodianV2/styleds'
import { RowBetween } from 'components/Row'
import { Select, TextInput, Uploader } from './common'
import { PhoneInput } from 'components/PhoneInput'
import { Checkbox } from 'components/Checkbox'
import { Loadable } from 'components/LoaderHover'
import { LOGIN_STATUS, useLogin } from 'state/auth/hooks'
import { useAddPopup, useShowError } from 'state/application/hooks'

import { corporateSourceOfFunds, legalEntityTypes, corporateFormInitialValues, promptValue } from './mock'
import { FormCard, FormGrid, ExtraInfoCard, Divider } from './styleds'
import { ReactComponent as ArrowLeft } from 'assets/images/arrow-back.svg'
import { ReactComponent as BigPassed } from 'assets/images/check-success-big.svg'
import { ChooseFile, BeneficialOwnersTable, DeleteRow } from './common'
import { FormContainer, FormRow } from './IndividualKycForm'
import { corporateErrorsSchema } from './schema'
import { getCorporateProgress, useCreateCorporateKYC, useKYCState, useUpdateCorporateKYC } from 'state/kyc/hooks'
import { KYCStatuses } from './enum'
import { corporateTransformApiData, corporateTransformKycDto } from './utils'
import { LoadingIndicator } from 'components/LoadingIndicator'

export default function CorporateKycForm() {
  const [waitingForInitialValues, setWaitingForInitialValues] = useState(true)
  const [updateKycId, setUpdateKycId] = useState<any>(null)
  const [isLogged, setAuthState] = useState(false)
  const [formData, setFormData] = useState<any>(null)
  const [canSubmit, setCanSubmit] = useState(true)
  const [isSubmittedOnce, setIsSubmittedOnce] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const [pending, setPending] = useState(false)
  const history = useHistory()
  const { kyc, loadingRequest } = useKYCState()
  const login = useLogin({ mustHavePreviousLogin: false })
  const showError = useShowError()
  const addPopup = useAddPopup()
  const createCorporateKYC = useCreateCorporateKYC()
  const updateCorporateKYC = useUpdateCorporateKYC()

  useEffect(() => {
    setWaitingForInitialValues(true)

    const getProgress = async () => {
      const data = await getCorporateProgress()
      if (data) {
        const transformedData = corporateTransformApiData(data)
        setFormData(transformedData)
      }
    }

    if (kyc?.data.status === KYCStatuses.CHANGES_REQUESTED) {
      getProgress()
      setUpdateKycId(kyc.data.id)
    } else {
      setFormData(corporateFormInitialValues)
    }

    setWaitingForInitialValues(false)
  }, [kyc])

  const checkAuthorization = useCallback(async () => {
    setPending(true)
    const status = await login()

    if (status !== LOGIN_STATUS.SUCCESS) {
      showError(t`To pass KYC you need to login. Please try again`)
      history.push('/swap')
    }

    setAuthState(true)
    setPending(false)
  }, [login, setAuthState, history, showError])

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)

    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [])

  useEffect(() => {
    if (!isLogged && !pending) {
      const timerFunc = setTimeout(checkAuthorization, 3000)

      return () => clearTimeout(timerFunc)
    }
  }, [isLogged, checkAuthorization])

  const alertUser = (e: any) => {
    e.preventDefault()
    e.returnValue = ''
  }

  const goBack = (e?: any) => {
    if (e) e.preventDefault()
    if (confirm(promptValue)) {
      history.push('/kyc')
    }
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
    const newSources = [...fields]
    const indexOfSource = fields.indexOf(source)

    // check for existence
    if (indexOfSource > -1) {
      newSources.splice(indexOfSource, 1)
    } else {
      newSources.push(source)
    }

    setFieldValue('sourceOfFunds', newSources, false)
    validationSeen('sourceOfFunds')
  }

  const countries = useMemo(() => {
    return getNames()
      .filter((label) => !['United States of America', 'United States Minor Outlying Islands'].includes(label))
      .map((label, index) => ({ id: ++index, label }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [])

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

  const handleDropImage = (acceptedFile: any, values: any, key: string, setFieldValue: any) => {
    const file = acceptedFile
    if (file?.size > 10 ** 7) {
      showError(t`Max size of 10Mb`)
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

  return (
    <Loadable loading={pending}>
      <LoadingIndicator isLoading={loadingRequest} />

      <StyledBodyWrapper>
        <ButtonText style={{ textDecoration: 'none' }} display="flex" marginBottom="64px" onClick={goBack}>
          <ArrowLeft />
          <TYPE.title4 display="flex" marginLeft="10px">
            <Trans>
              KYC as <GradientText style={{ marginLeft: 8 }}>Corporate</GradientText>
            </Trans>
          </TYPE.title4>
        </ButtonText>

        {!waitingForInitialValues && formData && (
          <Formik
            initialValues={formData}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            isInitialValid={false}
            enableReinitialize
            onSubmit={async (values) => {
              corporateErrorsSchema
                .validate(values, { abortEarly: false })
                .then(async () => {
                  setCanSubmit(false)
                  const body = corporateTransformKycDto(values)
                  let data: any = null

                  if (updateKycId) {
                    data = await updateCorporateKYC(updateKycId, body)
                  } else {
                    data = await createCorporateKYC(body)
                  }

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
                })
            }}
          >
            {({ values, setFieldValue, dirty, handleSubmit }) => {
              const shouldValidate = dirty && isSubmittedOnce
              const infoFilled =
                shouldValidate &&
                !errors.corporateName &&
                !errors.typeOfLegalEntity &&
                !errors.registrationNumber &&
                !errors.countryOfIncorporation &&
                !errors.otherEntity &&
                !errors.businessActivity
              const authorizedPersonnelFilled =
                shouldValidate &&
                !errors.personnelName &&
                !errors.designation &&
                !errors.email &&
                !errors.phoneNumber &&
                !errors.authorizationDocuments
              const addressFilled = shouldValidate && !errors.line1 && !errors.line2 && !errors.city && !errors.country
              const residentialAddressFilled =
                shouldValidate &&
                !errors.residentialAddressLine1 &&
                !errors.residentialAddressLine2 &&
                !errors.residentialAddressCountry &&
                !errors.residentialAddressCity
              const fundsFilled = shouldValidate && !errors.sourceOfFunds && !errors.otherFunds
              const fatcaFilled = shouldValidate && !errors.usTin && !errors.isUSTaxPayer
              const investorFilled = shouldValidate && !errors.accredited
              const taxDeclarationFilled = shouldValidate && !errors.taxCountry && !errors.taxNumber
              const filesFilled =
                shouldValidate &&
                !errors.financialDocuments &&
                !errors.corporateDocuments &&
                !errors.evidenceOfAccreditation
              const beneficialOwnersFilled =
                shouldValidate && !Object.keys(errors).some((errorField) => errorField.startsWith('beneficialOwners'))

              return (
                <FormRow>
                  <FormContainer onSubmit={handleSubmit} style={{ gap: '35px' }}>
                    <Column style={{ gap: '35px' }}>
                      <FormCard id="info">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Corporate Information</Trans>
                          </TYPE.title6>
                          {infoFilled && <BigPassed />}
                        </RowBetween>

                        <Column style={{ gap: '20px' }}>
                          <FormGrid columns={3}>
                            <TextInput
                              onChange={(e) =>
                                onChangeInput('corporateName', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.corporateName}
                              label="Corporate Name"
                              error={errors.corporateName && errors.corporateName}
                            />
                            <TextInput
                              onChange={(e) =>
                                onChangeInput('registrationNumber', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.registrationNumber}
                              label="Registration Number"
                              error={errors.registrationNumber && errors.registrationNumber}
                            />
                            <Select
                              withScroll
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
                              value={values.businessActivity}
                              onChange={(e) =>
                                onChangeInput('businessActivity', e.currentTarget.value, values, setFieldValue)
                              }
                              error={errors.businessActivity && errors.businessActivity}
                            />
                            <Select
                              withScroll
                              label="Type of legal entity"
                              selectedItem={values.typeOfLegalEntity}
                              items={legalEntityTypes}
                              onSelect={(entityType) => onSelectChange('typeOfLegalEntity', entityType, setFieldValue)}
                              error={errors.typeOfLegalEntity && errors.typeOfLegalEntity}
                            />
                          </FormGrid>
                          <FormGrid columns={1}>
                            {values.typeOfLegalEntity?.value === legalEntityTypes.length && (
                              <TextInput
                                label="Other Entity"
                                onChange={(e) =>
                                  onChangeInput('otherEntity', e.currentTarget.value, values, setFieldValue)
                                }
                                value={values.otherEntity}
                                error={errors.otherEntity && errors.otherEntity}
                              />
                            )}
                          </FormGrid>
                          {/* <FormGrid columns={1}>
                            <Checkbox
                              checked={values.incorporated}
                              onClick={() => setFieldValue('incorporated', !values.incorporated, false)}
                              label="Is Incorporated"
                            />
                          </FormGrid> */}
                        </Column>
                      </FormCard>

                      <FormCard id="authorizedPersonnel">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Company Authorized Personnel</Trans>
                          </TYPE.title6>
                          {authorizedPersonnelFilled && <BigPassed />}
                        </RowBetween>

                        <Column style={{ gap: '20px' }}>
                          <FormGrid>
                            <TextInput
                              onChange={(e) =>
                                onChangeInput('personnelName', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.personnelName}
                              label="Full Name"
                              error={errors.personnelName && errors.personnelName}
                            />
                            <TextInput
                              onChange={(e) =>
                                onChangeInput('designation', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.designation}
                              label="Designation"
                              error={errors.designation && errors.designation}
                            />
                          </FormGrid>

                          <FormGrid>
                            <TextInput
                              onChange={(e) => onChangeInput('email', e.currentTarget.value, values, setFieldValue)}
                              value={values.email}
                              label="Email address"
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
                              subtitle="Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus."
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
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Address</Trans>
                          </TYPE.title6>
                          {addressFilled && <BigPassed />}
                        </RowBetween>

                        <Column style={{ gap: '20px' }}>
                          <FormGrid>
                            <TextInput
                              onChange={(e) => onChangeInput('line1', e.currentTarget.value, values, setFieldValue)}
                              value={values.line1}
                              label="Line 1"
                              error={errors.line1 && errors.line1}
                            />
                            <TextInput
                              onChange={(e) => onChangeInput('line2', e.currentTarget.value, values, setFieldValue)}
                              value={values.line2}
                              label="Line 2"
                              error={errors.line2 && errors.line2}
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
                              onChange={(e) => onChangeInput('city', e.currentTarget.value, values, setFieldValue)}
                              value={values.city}
                              label="City"
                              error={errors.city && errors.city}
                            />
                          </FormGrid>
                        </Column>
                      </FormCard>

                      <FormCard id="residentialAddress">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Residential Address</Trans>
                          </TYPE.title6>
                          {residentialAddressFilled && <BigPassed />}
                        </RowBetween>

                        <Column style={{ gap: '20px' }}>
                          <FormGrid>
                            <TextInput
                              onChange={(e) =>
                                onChangeInput('residentialAddressLine1', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.residentialAddressLine1}
                              label="Line 1"
                              error={errors.residentialAddressLine1 && errors.residentialAddressLine1}
                            />
                            <TextInput
                              onChange={(e) =>
                                onChangeInput('residentialAddressLine2', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.residentialAddressLine2}
                              label="Line 2"
                              error={errors.residentialAddressLine2 && errors.residentialAddressLine2}
                            />
                          </FormGrid>

                          <FormGrid>
                            <Select
                              withScroll
                              label="Country"
                              selectedItem={values.residentialAddressCountry}
                              items={countries}
                              onSelect={(country) =>
                                onSelectChange('residentialAddressCountry', country, setFieldValue)
                              }
                              error={errors.residentialAddressCountry && errors.residentialAddressCountry}
                            />
                            <TextInput
                              onChange={(e) =>
                                onChangeInput('residentialAddressCity', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.residentialAddressCity}
                              label="City"
                              error={errors.residentialAddressCity && errors.residentialAddressCity}
                            />
                          </FormGrid>
                        </Column>
                      </FormCard>

                      <FormCard id="funds">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Source of Funds</Trans>
                          </TYPE.title6>
                          {fundsFilled && <BigPassed />}
                        </RowBetween>
                        <FormGrid columns={3}>
                          {corporateSourceOfFunds.map(({ value, label }: any) => (
                            <Checkbox
                              checked={values.sourceOfFunds.includes(label)}
                              onClick={() => onSourceOfFundsChange(label, values.sourceOfFunds, setFieldValue)}
                              key={`funds-${value}`}
                              label={label}
                            />
                          ))}
                        </FormGrid>
                        {values.sourceOfFunds.includes('Others') && (
                          <TextInput
                            style={{ marginTop: 20 }}
                            placeholder="Other Source of Funds...."
                            onChange={(e) => onChangeInput('otherFunds', e.currentTarget.value, values, setFieldValue)}
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

                      <FormCard id="corporate">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Investor Status Declaration</Trans>
                          </TYPE.title6>
                          {investorFilled && <BigPassed />}
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
                      </FormCard>

                      <FormCard id="fatca">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>FATCA</Trans>
                          </TYPE.title6>
                          {fatcaFilled && <BigPassed />}
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
                                onChange={(e) => onChangeInput('usTin', e.currentTarget.value, values, setFieldValue)}
                                error={errors.usTin && errors.usTin}
                              />
                            )}
                          </Column>
                          <Checkbox
                            isRadio
                            checked={values.isUSTaxPayer === 0}
                            onClick={() => onSelectChange('isUSTaxPayer', 0, setFieldValue)}
                            label="I confirm that I am not a US citizen or resident in the US for tax purposes. "
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
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Tax Declaration</Trans>
                          </TYPE.title6>
                          {taxDeclarationFilled && <BigPassed />}
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
                              selectedItem={values.taxCountry}
                              items={countries}
                              onSelect={(country) => onSelectChange('taxCountry', country, setFieldValue)}
                              error={errors.taxCountry && errors.taxCountry}
                            />
                            <TextInput
                              value={values.taxNumber}
                              label="Tax Indentification Number"
                              onChange={(e) => onChangeInput('taxNumber', e.currentTarget.value, values, setFieldValue)}
                              error={errors.taxNumber && errors.taxNumber}
                            />
                          </FormGrid>
                        </Column>
                      </FormCard>

                      <FormCard id="beneficial-owners">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Beneficial Owners Information</Trans>
                          </TYPE.title6>
                          {beneficialOwnersFilled && <BigPassed />}
                        </RowBetween>
                        <ExtraInfoCard>
                          <TYPE.buttonMuted>
                            Please upload the Proof of Identity and Proof of Address for Beneficial Owner. All account
                            statements and documents should be dated within 3 months.
                          </TYPE.buttonMuted>
                        </ExtraInfoCard>
                        <BeneficialOwnersTable data={values.beneficialOwners} />
                        <Column style={{ gap: '20px' }}>
                          {values.beneficialOwners.map((beneficiar: Record<string, string | any>, index: number) => (
                            <>
                              <FormGrid columns={4} key={index}>
                                <DeleteRow
                                  onClick={() =>
                                    deleteBeneficiar(
                                      index,
                                      values.beneficialOwners,
                                      values.removedBeneficialOwners,
                                      setFieldValue
                                    )
                                  }
                                >
                                  <TextInput
                                    value={beneficiar.fullName}
                                    onChange={(e) =>
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
                                </DeleteRow>
                                <TextInput
                                  type="number"
                                  style={{ textAlign: 'center', fontSize: '20px' }}
                                  value={beneficiar.shareholding}
                                  onChange={(e) =>
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
                              </FormGrid>
                              {values.beneficialOwners.length - 1 > index && <Divider />}
                            </>
                          ))}
                        </Column>
                        {errors.beneficialOwners && (
                          <TYPE.small marginTop="4px" color={'red1'}>{t`${errors.beneficialOwners}`}</TYPE.small>
                        )}
                        <ButtonIXSGradient
                          type="button"
                          style={{ marginTop: 32, height: 40, fontSize: 16 }}
                          onClick={() => addBeneficiary(values.beneficialOwners, setFieldValue)}
                        >
                          <Trans> Add Beneficiary</Trans>
                        </ButtonIXSGradient>
                      </FormCard>

                      <FormCard id="upload">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Corporate Documents</Trans>
                          </TYPE.title6>
                          {filesFilled && <BigPassed />}
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

                          {Boolean(values.accredited) && (
                            <Uploader
                              title="Evidence of Accreditation"
                              subtitle={
                                <ul>
                                  <li>
                                    <Trans>Copy of the most recent audited balance sheet of the corporation.</Trans>
                                  </li>
                                  <li>
                                    <Trans>
                                      Where the corporation is not required to prepare audited account regularly, a
                                      balance sheet of the corporation certified by the corporation as giving a true and
                                      fair view of the state of affairs of the corporation as of the date of the balance
                                      sheet, of which date shall be within the preceding 12 months.
                                    </Trans>
                                  </li>
                                </ul>
                              }
                              files={values.evidenceOfAccreditation}
                              onDrop={(file) => {
                                handleDropImage(file, values, 'evidenceOfAccreditation', setFieldValue)
                              }}
                              optional={values.accredited !== 1}
                              error={errors.evidenceOfAccreditation && errors.evidenceOfAccreditation}
                              handleDeleteClick={handleImageDelete(
                                values,
                                'evidenceOfAccreditation',
                                values.removedDocuments,
                                setFieldValue
                              )}
                            />
                          )}
                        </Column>
                      </FormCard>
                    </Column>
                  </FormContainer>

                  <StickyBox offsetTop={100}>
                    <KYCProgressBar
                      handleSubmit={handleSubmit}
                      disabled={false}
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
                      description={kyc?.data?.message || null}
                      reasons={['Last name', 'Gender', 'Middle name']}
                    />
                  </StickyBox>
                </FormRow>
              )
            }}
          </Formik>
        )}
      </StyledBodyWrapper>
    </Loadable>
  )
}
