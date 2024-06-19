import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { Formik } from 'formik'
import { Prompt, useHistory } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { useCookies } from 'react-cookie'
import usePrevious from 'hooks/usePrevious'
import Column from 'components/Column'
import { PinnedContentButton } from 'components/Button'
import { TYPE } from 'theme'
import { ReactComponent as KYCEmailIcon } from 'assets/images/newEmailgray.svg'
import { ReactComponent as TelegramIcon } from 'assets/images/telegramNewIcon.svg'
import { ReactComponent as AddressIcon } from 'assets/images/addressIcon.svg'
import { StyledBodyWrapper } from 'pages/SecurityTokens'
import Row, { RowCenter, RowStart } from 'components/Row'
import { useKYCState, useVerifyIdentity, useGetMyKyc } from 'state/kyc/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { useAuthState } from 'state/auth/hooks'
import { Loadable } from 'components/LoaderHover'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { KycSelect as Select, KycTextInput as TextInput } from './common'
import { KYCProgressBar } from './KYCProgressBar'
import { individualFormV2InitialValues, initialValuesBusinessEmail, promptValue } from './mock'
import { FormCard, FormGrid, FormWrapper, StyledStickyBox } from './styleds'
import { businessEmailSchema, individualErrorsSchemaV2 } from './schema'
import { Line } from 'components/Line'
import VerificationConfirmation from './VerificationConfirmation'
import { EmailType, SecondaryContactTypeV2, SuccessType } from './enum'
import SecondaryContactOption from './SecondaryContactOption'
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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled(TYPE.title4)`
  font-weight: 800;
  font-size: 32px;
  white-space: nowrap;
  margin-left: 10px;
`

const ReferralCode = styled.span`
  border: 1px solid #e6e6ff;
  background: #f7f7f8;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  margin-left: 20px;
  font-weight: 600;
  align-self: center;
  color: #b8b8cc;
`

const ReferralCodeText = styled.span`
  color: #6666ff;
`

const CheckboxContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
`

const CheckboxLabel = styled.label<{ selected: boolean; disabled: boolean }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  border: 1px solid ${(props) => (props.selected ? '#6666FFCC' : '#e6e6ff')};
  padding: 16px;
  border-radius: 6px;
  width: 250px;
  justify-content: space-between;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  svg {
    // fill: ${(props) => (props.selected ? '#6666FF' : '')};
  }
`

const BoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const CheckboxInput = styled.input<{ disabled: boolean }>`
  margin-right: 8px;  
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #e6e6ff;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  appearance: none;
  cursor: pointer;

  &:checked {
    background-color: none;
    border: 5px solid #6666FF};
  }
`

interface Individual {
  email?: string
  firstName?: string
  middleName?: string
  lastName?: string
  isEmailVerified?: boolean
}

export default function IndividualKycFormV2() {
  const canLeavePage = useRef(false)
  const [cookies] = useCookies(['annoucementsSeen'])
  const [errors, setErrors] = useState<any>({})
  const history = useHistory()
  const { kyc, loadingRequest } = useKYCState()
  const { account } = useActiveWeb3React()
  const { token } = useAuthState()
  const verifyIdentity = useVerifyIdentity()
  const [selectedCheckbox, setSelectedCheckbox] = useState<SecondaryContactTypeV2 | null>(null)
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const form = useRef<any>(null)
  const isLoggedIn = !!token && !!account
  const prevAccount = usePrevious(account)
  const [isPersonalVerified, setIsPersonalVerified] = useState(false)
  const [isBusinessEmailVerified, setIsBusinessEmailVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialValues, setInitialValues] = useState(individualFormV2InitialValues)
  const getMyKyc = useGetMyKyc()

  useEffect(() => {
    const code = new URL(window.location.href).href?.split('=')[1]
    const storedReferralCode = localStorage.getItem('referralCode')
    if (code) {
      setReferralCode(code)
      localStorage.setItem('referralCode', code)
    } else if (storedReferralCode) {
      setReferralCode(storedReferralCode)
    }
    if (account && prevAccount && account !== prevAccount) {
      history.push('/kyc')
    }
  }, [account, prevAccount, history])

  useEffect(() => {
    const { individual } = kyc || {}
    const isEmailVerified = individual?.isEmailVerified
    const isSecondaryContactVerified = individual?.isSecondaryContactVerified
    const secondaryContact = individual?.secondaryContact

    const checkboxTypeMap = [
      {
        condition: (isEmailVerified || isPersonalVerified) && !(isBusinessEmailVerified || isSecondaryContactVerified),
        type: SecondaryContactTypeV2.PROOF_OF_ADDRESS,
      },
      {
        condition: secondaryContact === EmailType.SECONDARY,
        type: SecondaryContactTypeV2.BUSINESS_EMAIL,
      },
      {
        condition: secondaryContact === EmailType.SOCIAL_ACCOUNT,
        type: SecondaryContactTypeV2.TELEGRAM,
      },
    ]

    const selectedCheckboxType = checkboxTypeMap.find((entry) => entry.condition)?.type

    if (selectedCheckboxType) {
      setSelectedCheckbox(selectedCheckboxType)
    }
  }, [
    isBusinessEmailVerified,
    kyc?.individual?.isSecondaryContactVerified,
    kyc?.individual?.isEmailVerified,
    isPersonalVerified,
  ])

  const fetchKYCData = async () => {
    await getMyKyc()
  }

  useEffect(() => {
    fetchKYCData()
  }, [account])

  useEffect(() => {
    const individual: Individual = kyc?.individual || {}
    const { email, firstName, middleName, lastName, isEmailVerified } = individual
    if (isEmailVerified) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        ...initialValuesBusinessEmail,
        email: email || '',
        firstName: firstName || '',
        middleName: middleName || '',
        lastName: lastName || '',
      }))
    } else {
      setInitialValues((prevValues) => ({
        ...prevValues,
        email: email || '',
        firstName: firstName || '',
        middleName: middleName || '',
        lastName: lastName || '',
      }))
    }
  }, [kyc?.individual])

  const validateValue = async (key: string, value: any) => {
    if (form.current.values[key] === value) {
      return
    }

    try {
      let root = { [key]: value }
      const schema = key === 'businessEmail' ? businessEmailSchema : individualErrorsSchemaV2
      await schema.validateAt(key, root)
      setErrors((prevErrors: any) => {
        const updatedErrors = { ...prevErrors }
        delete updatedErrors[key]
        return updatedErrors
      })
      form.current.setFieldError(key, '')
    } catch (err: any) {
      setErrors((prevErrors: any) => ({ ...prevErrors, [key]: err.message }))
      form.current.setFieldError(key, err.message)
    }

    form.current.setFieldTouched(key, true)
  }

  const onChangeInput = (key: string, value: any, values: any, setFieldValue: any) => {
    if (values[key] !== value) {
      setFieldValue(key, value, true)
    }
    if (errors[key] || form.current.touched[key]) {
      validateValue(key, value)
    }
  }

  const handleCheckboxChange = (event: { target: { value: any } }) => {
    const { value } = event.target
    setSelectedCheckbox(value)
  }

  const handleSuccess = (section: string) => {
    if (section === SuccessType.PERSONAL) {
      setIsPersonalVerified(true)
    } else if (section === SuccessType.BUSINESS) {
      setIsBusinessEmailVerified(true)
    }
  }
  const handleVerifyDocuments = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setLoading(true)
    const result = await verifyIdentity()
    if (result.success) {
      const redirectUrl = result?.response?.data?.redirectUrl
      setLoading(false)
      window.open(redirectUrl, '_self')
    } else {
      console.error('Verification failed', result.error)
      setLoading(false)
    }
  }

  const getValidationSchema = (selectedCheckbox: any) => {
    if (selectedCheckbox === SecondaryContactTypeV2.BUSINESS_EMAIL) {
      return businessEmailSchema
    }
    if (selectedCheckbox !== SecondaryContactTypeV2.TELEGRAM) {
      return individualErrorsSchemaV2
    }
    return
  }

  return (
    <Loadable loading={!isLoggedIn}>
      <Prompt when={!canLeavePage.current} message={promptValue} />
      <LoadingIndicator isLoading={loadingRequest} />
      <StyledBodyWrapper style={{ background: 'none', boxShadow: 'none' }} hasAnnouncement={!cookies.annoucementsSeen}>
        {
          <Formik
            innerRef={form}
            initialValues={initialValues}
            validationSchema={getValidationSchema(selectedCheckbox)}
            initialErrors={errors}
            validateOnBlur={true}
            validateOnChange={true}
            validateOnMount={true}
            enableReinitialize={true}
            onSubmit={async (values) => {
              try {
                localStorage.removeItem('newKyc')
                await individualErrorsSchemaV2.validate(values, { abortEarly: false })
                canLeavePage.current = true
              } catch (error: any) {
                const newErrors: any = {}

                error.inner.forEach((e: any) => {
                  newErrors[e.path] = e.message
                })
                // addPopup({ info: { success: false, summary: 'Please, fill the valid data' } })
                setErrors(newErrors)
                canLeavePage.current = false
              }
            }}
          >
            {({ values, handleSubmit, setFieldValue, errors, touched, isValid }) => {
              return (
                <FormRow>
                  <FormContainer onSubmit={handleSubmit} style={{ gap: '35px' }}>
                    <Column style={{ gap: '35px' }}>
                      <FormCard style={{ marginTop: isMobile ? '90px' : '0px' }} id="personal">
                        <HeaderContainer>
                          <Title>
                            <Trans>Individual KYC</Trans>
                          </Title>
                          {referralCode && (
                            <ReferralCode>
                              Referred by <ReferralCodeText>{referralCode}</ReferralCodeText>
                            </ReferralCode>
                          )}
                        </HeaderContainer>

                        <Line style={{ margin: '40px 0px', opacity: '0.1' }} />
                        <RowStart marginBottom="32px">
                          <TYPE.title7>
                            <Trans>Personal Information</Trans>
                          </TYPE.title7>
                        </RowStart>
                        <Column style={{ gap: '20px' }}>
                          <FormGrid columns={3}>
                            <TextInput
                              disabled={kyc?.individual?.isEmailVerified || isPersonalVerified}
                              kycVersion={'v2'}
                              id="firstNameInput"
                              label="First Name *"
                              placeholder="First Name"
                              value={values.firstName}
                              error={touched.firstName && errors.firstName}
                              onChange={(e: any) =>
                                onChangeInput('firstName', e.currentTarget.value, values, setFieldValue)
                              }
                            />
                            <TextInput
                              disabled={kyc?.individual?.isEmailVerified || isPersonalVerified}
                              id="middleNameInput"
                              kycVersion={'v2'}
                              label="Middle Name"
                              placeholder="Middle Name"
                              value={values.middleName}
                              error={touched.middleName && errors.middleName}
                              onChange={(e: any) =>
                                onChangeInput('middleName', e.currentTarget.value, values, setFieldValue)
                              }
                            />
                            <TextInput
                              disabled={kyc?.individual?.isEmailVerified || isPersonalVerified}
                              id="lastNameInput"
                              kycVersion={'v2'}
                              label="Last Name *"
                              placeholder="Last Name"
                              value={values.lastName}
                              error={touched.lastName && errors.lastName}
                              onChange={(e: any) =>
                                onChangeInput('lastName', e.currentTarget.value, values, setFieldValue)
                              }
                            />
                          </FormGrid>
                          <TextInput
                            disabled={kyc?.individual?.isEmailVerified || isPersonalVerified}
                            placeholder="Email address"
                            kycVersion={'v2'}
                            id="emailAddressField"
                            label="Email address *"
                            value={values.email}
                            error={touched.email && errors.email}
                            onChange={(e: any) => onChangeInput('email', e.currentTarget.value, values, setFieldValue)}
                          />
                        </Column>
                        {!kyc?.individual?.isEmailVerified && !isPersonalVerified && (
                          <SecondaryContactOption
                            error={!isValid}
                            verificationSecation="Personal Information"
                            email={values.email}
                            emailType={'primary_email'}
                            isVerifiedPersonalInfo={false}
                            isVerifiedBusinessEmail={false}
                            personalInfo={{
                              firstName: values.firstName,
                              middleName: values.middleName,
                              lastName: values.lastName,
                              email: values.email,
                              referralCode: referralCode,
                            }}
                            onSuccess={() => handleSuccess('personal')}
                          />
                        )}

                        {isPersonalVerified || kyc?.individual?.isEmailVerified ? <VerificationConfirmation /> : null}
                      </FormCard>
                      <FormCard
                        id="secondary-contact"
                        style={
                          !kyc?.individual?.isEmailVerified && !isPersonalVerified
                            ? { filter: 'blur(5px)', pointerEvents: 'none' }
                            : {}
                        }
                      >
                        <div>
                          <RowStart>
                            <TYPE.title7>
                              <Trans>Secondary Contact Details</Trans>
                            </TYPE.title7>
                          </RowStart>
                          <RowStart>
                            <CheckboxContainer>
                              <CheckboxLabel
                                selected={selectedCheckbox === SecondaryContactTypeV2.PROOF_OF_ADDRESS}
                                disabled={
                                  selectedCheckbox !== null &&
                                  selectedCheckbox !== SecondaryContactTypeV2.PROOF_OF_ADDRESS &&
                                  (kyc?.individual?.isSecondaryContactVerified || isBusinessEmailVerified)
                                }
                              >
                                <BoxWrapper>
                                  <AddressIcon />
                                  <TYPE.subHeader1> Proof of Address</TYPE.subHeader1>
                                </BoxWrapper>

                                <CheckboxInput
                                  type="checkbox"
                                  value="ProofOfAddress"
                                  checked={selectedCheckbox === SecondaryContactTypeV2.PROOF_OF_ADDRESS}
                                  disabled={
                                    selectedCheckbox !== null &&
                                    selectedCheckbox !== SecondaryContactTypeV2.PROOF_OF_ADDRESS &&
                                    (kyc?.individual?.isSecondaryContactVerified || isBusinessEmailVerified)
                                  }
                                  onChange={handleCheckboxChange}
                                />
                              </CheckboxLabel>
                              <CheckboxLabel
                                selected={selectedCheckbox === SecondaryContactTypeV2.BUSINESS_EMAIL}
                                disabled={
                                  selectedCheckbox !== null &&
                                  selectedCheckbox !== SecondaryContactTypeV2.BUSINESS_EMAIL &&
                                  (kyc?.individual?.isSecondaryContactVerified || isBusinessEmailVerified)
                                }
                              >
                                <BoxWrapper>
                                  <KYCEmailIcon />
                                  <TYPE.subHeader1>Business Email</TYPE.subHeader1>
                                </BoxWrapper>

                                <CheckboxInput
                                  type="checkbox"
                                  value="BusinessEmail"
                                  checked={selectedCheckbox === SecondaryContactTypeV2.BUSINESS_EMAIL}
                                  disabled={
                                    selectedCheckbox !== null &&
                                    selectedCheckbox !== SecondaryContactTypeV2.BUSINESS_EMAIL &&
                                    (kyc?.individual?.isSecondaryContactVerified || isBusinessEmailVerified)
                                  }
                                  onChange={handleCheckboxChange}
                                />
                              </CheckboxLabel>
                              <CheckboxLabel
                                selected={selectedCheckbox === SecondaryContactTypeV2.TELEGRAM}
                                disabled={
                                  selectedCheckbox !== null &&
                                  selectedCheckbox !== SecondaryContactTypeV2.TELEGRAM &&
                                  (kyc?.individual?.isSecondaryContactVerified || isBusinessEmailVerified)
                                }
                              >
                                <BoxWrapper>
                                  <TelegramIcon style={{ marginTop: '3px' }} />
                                  <TYPE.subHeader1> {SecondaryContactTypeV2.TELEGRAM}</TYPE.subHeader1>
                                </BoxWrapper>

                                <CheckboxInput
                                  type="checkbox"
                                  value="Telegram"
                                  checked={selectedCheckbox === SecondaryContactTypeV2.TELEGRAM}
                                  onChange={handleCheckboxChange}
                                  disabled={
                                    selectedCheckbox !== null &&
                                    selectedCheckbox !== SecondaryContactTypeV2.TELEGRAM &&
                                    (kyc?.individual?.isSecondaryContactVerified || isBusinessEmailVerified)
                                  }
                                />
                              </CheckboxLabel>
                            </CheckboxContainer>
                          </RowStart>

                          {selectedCheckbox === SecondaryContactTypeV2.BUSINESS_EMAIL && (
                            <>
                              <Column>
                                <TextInput
                                  kycVersion={'v2'}
                                  placeholder="Business Email"
                                  id="emailAddressField"
                                  label="Business Email *"
                                  disabled={kyc?.individual?.isSecondaryContactVerified || isBusinessEmailVerified}
                                  value={values.businessEmail || kyc?.individual?.secondaryContactDetails}
                                  error={touched.businessEmail && errors.businessEmail}
                                  // error={errors.businessEmail}
                                  onChange={(e: any) =>
                                    onChangeInput('businessEmail', e.currentTarget.value, values, setFieldValue)
                                  }
                                />
                              </Column>

                              {!kyc?.individual?.isSecondaryContactVerified && !isBusinessEmailVerified && (
                                <SecondaryContactOption
                                  emailType={'secondary_email'}
                                  error={!isValid}
                                  verificationSecation="Business Email"
                                  email={values.businessEmail}
                                  isVerifiedBusinessEmail={false}
                                  isVerifiedPersonalInfo={true}
                                  businessEmail={values.businessEmail}
                                  onSuccess={() => handleSuccess('businessEmail')}
                                />
                              )}

                              {(isBusinessEmailVerified || kyc?.individual?.isSecondaryContactVerified) && (
                                <VerificationConfirmation />
                              )}
                            </>
                          )}
                          {selectedCheckbox === SecondaryContactTypeV2.TELEGRAM && (
                            <>
                              {!kyc?.individual?.isSecondaryContactVerified && !isBusinessEmailVerified && (
                                <SecondaryContactOption
                                  emailType={'social_account'}
                                  error={false}
                                  verificationSecation={SecondaryContactTypeV2.TELEGRAM}
                                  isVerifiedBusinessEmail={false}
                                  isVerifiedPersonalInfo={true}
                                  onSuccess={() => handleSuccess('businessEmail')}
                                />
                              )}
                              {(isBusinessEmailVerified || kyc?.individual?.isSecondaryContactVerified) && (
                                <VerificationConfirmation />
                              )}
                            </>
                          )}
                        </div>
                      </FormCard>

                      <FormCard
                        id="verify-documents"
                        style={
                          !isBusinessEmailVerified &&
                          !kyc?.individual?.isSecondaryContactVerified &&
                          selectedCheckbox !== SecondaryContactTypeV2.PROOF_OF_ADDRESS
                            ? { filter: 'blur(5px)', pointerEvents: 'none' }
                            : {}
                        }
                      >
                        <RowCenter marginBottom="10px" marginTop="20px">
                          <TYPE.title7>
                            <Trans>Verify Documents</Trans>
                          </TYPE.title7>
                        </RowCenter>
                        <RowCenter>
                          <TYPE.description3 style={{ margin: '0px 190px 30px 190px', textAlign: 'center' }}>
                            Please note that your documents will be verified through the ComplyCube service. This
                            process may take some time, and you will be notified within 10-15 minutes.
                          </TYPE.description3>
                        </RowCenter>
                        <PinnedContentButton onClick={handleVerifyDocuments} disabled={loading}>
                          {loading ? 'Verifying...' : 'Verify Documents'}
                        </PinnedContentButton>
                      </FormCard>
                    </Column>
                  </FormContainer>

                  <StyledStickyBox>
                    <KYCProgressBar
                      isKycV2={true}
                      topics={[
                        {
                          title: 'Personal Information',
                          href: 'personal',
                        },
                        {
                          title: 'Secondary Contact Details',
                          href: 'secondary-contact',
                        },
                        {
                          title: 'Verify Documents',
                          href: 'verify-documents',
                        },
                      ]}
                      description={kyc?.message || null}
                      reasons={['Last name', 'Gender', 'Middle name']}
                    />
                  </StyledStickyBox>
                </FormRow>
              )
            }}
          </Formik>
        }
      </StyledBodyWrapper>
    </Loadable>
  )
}
