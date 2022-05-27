import React, { useMemo, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { Formik } from 'formik'
import { Prompt, useHistory } from 'react-router-dom'
import moment from 'moment'
import { isMobile } from 'react-device-detect'
import { useCookies } from 'react-cookie'

import usePrevious from 'hooks/usePrevious'
import Column from 'components/Column'
import { ButtonText } from 'components/Button'
import { TYPE } from 'theme'
import { GradientText, StyledBodyWrapper } from 'pages/CustodianV2/styleds'
import Row, { RowBetween } from 'components/Row'
import { Select, TextInput, Uploader } from './common'
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
import { ReactComponent as BigPassed } from 'assets/images/check-success-big.svg'
import { useAddPopup, useShowError } from 'state/application/hooks'

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
import { FormCard, FormGrid, ExtraInfoCard, FormWrapper, StyledStickyBox } from './styleds'
import { individualErrorsSchema } from './schema'
import { individualTransformApiData, individualTransformKycDto } from './utils'
import { KYCStatuses, IdentityDocumentType } from './enum'

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

    if (kyc?.status === KYCStatuses.CHANGES_REQUESTED) {
      getProgress()
      setUpdateKycId(kyc.id)
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

  const onRadioChange = (key: string, value: number, setFieldValue: any) => {
    setFieldValue(key, value, false)
    validationSeen(key)
  }

  const onSourceOfFundsChange = (source: string, fields: any[], setFieldValue: any) => {
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
      .map((name, index) => ({ value: ++index, label: name }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [])

  const idTypes = useMemo(() => {
    return Object.values(IdentityDocumentType).map((value, index) => ({ value: ++index, label: value }))
  }, [])

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

              return (
                <FormRow>
                  <FormContainer onSubmit={handleSubmit} style={{ gap: '35px' }}>
                    <Column style={{ gap: '35px' }}>
                      <FormCard id="personal">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Personal Information</Trans>
                          </TYPE.title6>
                          {personalFilled && <BigPassed />}
                        </RowBetween>
                        <Column style={{ gap: '20px' }}>
                          <FormGrid columns={3}>
                            <TextInput
                              onChange={(e) => onChangeInput('firstName', e.currentTarget.value, values, setFieldValue)}
                              value={values.firstName}
                              label="First Name:"
                              error={errors.firstName && errors.firstName}
                            />
                            <TextInput
                              onChange={(e) =>
                                onChangeInput('middleName', e.currentTarget.value, values, setFieldValue)
                              }
                              value={values.middleName}
                              label="Middle Name:"
                              error={errors.middleName && errors.middleName}
                            />
                            <TextInput
                              onChange={(e) => onChangeInput('lastName', e.currentTarget.value, values, setFieldValue)}
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
                              onChange={(e) => onChangeInput('email', e.currentTarget.value, values, setFieldValue)}
                              value={values.email}
                              label="Email address:"
                              error={errors.email && errors.email}
                            />
                          </FormGrid>
                        </Column>
                      </FormCard>
                      <FormCard id="identity-document">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Identity Document</Trans>
                          </TYPE.title6>
                          {identityDocumentFilled && <BigPassed />}
                        </RowBetween>
                        <Column style={{ gap: '20px' }}>
                          <FormGrid>
                            <Select
                              error={errors.idType}
                              withScroll
                              label="Document Type"
                              selectedItem={values.idType}
                              items={idTypes}
                              onSelect={(idType) => onSelectChange('idType', idType, setFieldValue)}
                            />
                            <TextInput
                              onChange={(e) => onChangeInput('idNumber', e.currentTarget.value, values, setFieldValue)}
                              value={values.idNumber}
                              label="Document Number"
                              error={errors.idNumber}
                            />
                          </FormGrid>
                          <FormGrid>
                            <DateInput
                              label="Document Issue Date"
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
                              label="Document Expiry Date"
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
                              onChange={(e) => onChangeInput('address', e.currentTarget.value, values, setFieldValue)}
                              value={values.address}
                              label="Address"
                              error={errors.address && errors.address}
                            />
                            <TextInput
                              onChange={(e) =>
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
                              onChange={(e) => onChangeInput('city', e.currentTarget.value, values, setFieldValue)}
                              value={values.city}
                              label="City"
                              error={errors.city && errors.city}
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
                          {sourceOfFunds.map(({ value, label }: any) => (
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
                            value={values.otherFunds}
                            error={errors.otherFunds && errors.otherFunds}
                          />
                        )}
                        {errors.sourceOfFunds && (
                          <TYPE.small marginTop="8px" color={'red1'}>
                            {errors.sourceOfFunds}
                          </TYPE.small>
                        )}
                      </FormCard>

                      <FormCard id="investor">
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
                              onClick={() => onRadioChange('accredited', 0, setFieldValue)}
                              label="I am not an accredited investor"
                            />
                            <Checkbox
                              name="accredited"
                              isRadio
                              checked={values.accredited === 1}
                              onClick={() => onRadioChange('accredited', 1, setFieldValue)}
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
                              onClick={() => onRadioChange('isUSTaxPayer', 1, setFieldValue)}
                              label={`I confirm that I am a US citizen and/or resident in the US for tax purposes and my US federal taxpayer ID number (US TIN) is as follows: `}
                            />
                            {values.isUSTaxPayer === 1 && (
                              <TextInput
                                style={{ width: 284 }}
                                placeholder="ID Number.."
                                value={values.usTin}
                                onChange={(e) => onChangeInput('usTin', e.currentTarget.value, values, setFieldValue)}
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

                      <FormCard id="employment-info">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Employment Information</Trans>
                          </TYPE.title6>
                          {employmentInfoFilled && <BigPassed />}
                        </RowBetween>
                        <Column style={{ gap: '20px' }}>
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
                            onSelect={(status) => onSelectChange('employmentStatus', status, setFieldValue)}
                            error={errors.employmentStatus && errors.employmentStatus}
                          />
                          <TextInput
                            onChange={(e) => onChangeInput('employer', e.currentTarget.value, values, setFieldValue)}
                            value={values.employer}
                            label="Employer"
                            error={errors.employer && errors.employer}
                          />
                          <Select
                            label="Income in USD in preceding 12 months"
                            selectedItem={values.income}
                            items={incomes}
                            onSelect={(income) => onSelectChange('income', income, setFieldValue)}
                            error={errors.income && errors.income}
                          />
                        </Column>
                      </FormCard>

                      <FormCard id="upload">
                        <RowBetween marginBottom="32px">
                          <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                            <Trans>Upload Documents</Trans>
                          </TYPE.title6>
                          {filesFilled && <BigPassed />}
                        </RowBetween>

                        <Column style={{ gap: '40px' }}>
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
                      {/* <FormCard>
                      <TYPE.title6 marginBottom="12px">
                        <Trans>ACCOUNT ON INVESTAX</Trans>
                      </TYPE.title6>

                      <Checkbox checked={true} onClick={() => null} label="Create account for me on InvestaX" />
                    </FormCard> */}
                    </Column>
                  </FormContainer>

                  <StyledStickyBox>
                    <KYCProgressBar
                      handleSubmit={handleSubmit}
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
