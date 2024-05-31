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
import { useKYCState } from 'state/kyc/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { useAuthState } from 'state/auth/hooks'
import { Loadable } from 'components/LoaderHover'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { useAddPopup } from 'state/application/hooks'
import { KycSelect as Select, KycTextInput as TextInput } from './common'
import { KYCProgressBar } from './KYCProgressBar'
import { individualFormInitialValues, individualFormV2InitialValues, promptValue } from './mock'
import { FormCard, FormGrid, FormWrapper, StyledStickyBox } from './styleds'
import { individualErrorsSchemaV2 } from './schema'
import { KYCValidationErrors } from './KYCValidationErrors'
import { Line } from 'components/Line'
// import { EmailVerificationSection } from './EmailVerificationSection'
import { ReactComponent as CheckIcon } from 'assets/images/newRoundCheck.svg'
import EmailVerificationSection from './EmailVerificationSection'

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
  gap: 16px;
  margin-bottom: 20px;
`

const CheckboxLabel = styled.label<{ selected: boolean }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  border: 1px solid ${(props) => (props.selected ? '#6666FFCC' : '#e6e6ff')};
  padding: 16px;
  border-radius: 6px;
  width: 250px;
  justify-content: space-between;
  cursor: pointer;
  svg {
    // fill: ${(props) => (props.selected ? '#6666FF' : '')};
  }
`

const BoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const CheckboxInput = styled.input`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #e6e6ff;

  appearance: none;
  cursor: pointer;

  &:checked {
    background-color: none;
    border: 5px solid #6666FF};
  }
`
const Container = styled.div`
  border: 1px solid #24e49f;
  margin-top: 28px;
  height: 252px;
  padding: 64px;
  background: #e9fcf5;
`

const CenteredDiv = styled.div`
  text-align: center;
`

const StyledButton = styled(PinnedContentButton)`
  background: none;
  border: 1px solid #24e49f;
  margin-top: 20px;
  pointer-events: none;
`

const FlexDiv = styled.div`
  display: flex;
  gap: 5px;
  place-items: center;
`

export default function IndividualKycFormV2() {
  const canLeavePage = useRef(false)
  const [cookies] = useCookies(['annoucementsSeen'])
  const [errors, setErrors] = useState<any>({})
  const addPopup = useAddPopup()
  const history = useHistory()
  const { kyc, loadingRequest } = useKYCState()
  const { account } = useActiveWeb3React()
  const { token } = useAuthState()
  const [selectedCheckbox, setSelectedCheckbox] = useState(null)
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const form = useRef<any>(null)
  const isLoggedIn = !!token && !!account
  const prevAccount = usePrevious(account)
  const [isVerified, setIsVerified] = useState(false)

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

  const validateValue = async (key: string, value: any) => {
    if (form.current.values[key] === value) {
      return
    }

    try {
      let root = { [key]: value }
      await individualErrorsSchemaV2.validateAt(key, root)
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

  const onChangeInput = (key: string, value: any, values: any, setFieldValue: any) => {
    if (values[key] !== value) {
      setFieldValue(key, value, false)
    }
    validateValue(key, value)
  }

  const handleCheckboxChange = (event: { target: { value: any } }) => {
    const { value } = event.target
    setSelectedCheckbox(value)
  }

  const handleSuccess = () => {
    setIsVerified(true)
  }

  console.log(isVerified, 'kyckyckyckyc11')

  return (
    <Loadable loading={!isLoggedIn}>
      <Prompt when={!canLeavePage.current} message={promptValue} />
      <LoadingIndicator isLoading={loadingRequest} />
      <StyledBodyWrapper style={{ background: 'none', boxShadow: 'none' }} hasAnnouncement={!cookies.annoucementsSeen}>
        {
          <Formik
            innerRef={form}
            initialValues={individualFormV2InitialValues}
            validationSchema={individualErrorsSchemaV2}
            initialErrors={errors}
            validateOnBlur={true}
            validateOnChange={true}
            validateOnMount={true}
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
                addPopup({ info: { success: false, summary: 'Please, fill the valid data' } })
                setErrors(newErrors)
                canLeavePage.current = false
              }
            }}
          >
            {({ values, handleSubmit, setFieldValue, errors, touched, isValid }) => {
              console.log(isVerified, 'kyckyckyckyc12')
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
                              kycVersion={'v2'}
                              id="firstNameInput"
                              label="First Name"
                              placeholder="First Name"
                              value={kyc?.individual?.firstName || values.firstName}
                              error={touched.firstName && errors.firstName}
                              onChange={(e: any) =>
                                onChangeInput('firstName', e.currentTarget.value, values, setFieldValue)
                              }
                            />
                            <TextInput
                              id="middleNameInput"
                              kycVersion={'v2'}
                              label="Middle Name"
                              placeholder="Middle Name"
                              value={kyc?.individual?.middleName || values.middleName}
                              error={touched.middleName && errors.middleName}
                              onChange={(e: any) =>
                                onChangeInput('middleName', e.currentTarget.value, values, setFieldValue)
                              }
                            />
                            <TextInput
                              id="lastNameInput"
                              kycVersion={'v2'}
                              label="Last Name"
                              placeholder="Last Name"
                              value={kyc?.individual?.lastName || values.lastName}
                              error={touched.lastName && errors.lastName}
                              onChange={(e: any) =>
                                onChangeInput('lastName', e.currentTarget.value, values, setFieldValue)
                              }
                            />
                          </FormGrid>
                          <TextInput
                            placeholder="Email address"
                            kycVersion={'v2'}
                            id="emailAddressField"
                            label="Email address"
                            value={kyc?.individual?.email || values.email}
                            error={touched.email && errors.email}
                            onChange={(e: any) => onChangeInput('email', e.currentTarget.value, values, setFieldValue)}
                          />
                        </Column>
                        {!kyc?.individual?.email && !isVerified && (
                          <EmailVerificationSection
                            error={!isValid}
                            verificationSecation="Personal Information"
                            email={values.email}
                            emailType={'primary-email'}
                            personalInfo={{
                              firstName: values.firstName,
                              middleName: values.middleName,
                              lastName: values.lastName,
                              email: values.email,
                            }}
                            onSuccess={handleSuccess}
                          />
                        )}

                        {isVerified || kyc?.individual?.email ? (
                          <Container>
                            <CenteredDiv>
                              <TYPE.title9 lineHeight={'30px'} fontSize={'20px'}>
                                Verification code has been <br /> confirmed successfully.
                              </TYPE.title9>
                              <StyledButton>
                                <FlexDiv>
                                  <CheckIcon /> <TYPE.black fontSize={'14px'}>Confirmed</TYPE.black>
                                </FlexDiv>
                              </StyledButton>
                            </CenteredDiv>
                          </Container>
                        ) : null}
                      </FormCard>

                      <FormCard id="secondary-contact">
                        <div>
                          <RowStart>
                            <TYPE.title7>
                              <Trans>Secondary Contact Details</Trans>
                            </TYPE.title7>
                          </RowStart>
                          <RowStart>
                            <CheckboxContainer>
                              <CheckboxLabel selected={selectedCheckbox === 'BusinessEmail'}>
                                <BoxWrapper>
                                  <KYCEmailIcon />
                                  <TYPE.subHeader1>Business Email</TYPE.subHeader1>
                                </BoxWrapper>

                                <CheckboxInput
                                  type="checkbox"
                                  value="BusinessEmail"
                                  checked={selectedCheckbox === 'BusinessEmail'}
                                  onChange={handleCheckboxChange}
                                />
                              </CheckboxLabel>
                              <CheckboxLabel selected={selectedCheckbox === 'Telegram'}>
                                <BoxWrapper>
                                  <TelegramIcon style={{ marginTop: '3px' }} />
                                  <TYPE.subHeader1> Telegram</TYPE.subHeader1>
                                </BoxWrapper>

                                <CheckboxInput
                                  type="checkbox"
                                  value="Telegram"
                                  checked={selectedCheckbox === 'Telegram'}
                                  onChange={handleCheckboxChange}
                                />
                              </CheckboxLabel>
                              <CheckboxLabel selected={selectedCheckbox === 'ProofOfAddress'}>
                                <BoxWrapper>
                                  <AddressIcon />
                                  <TYPE.subHeader1> Proof of Address</TYPE.subHeader1>
                                </BoxWrapper>

                                <CheckboxInput
                                  type="checkbox"
                                  value="ProofOfAddress"
                                  checked={selectedCheckbox === 'ProofOfAddress'}
                                  onChange={handleCheckboxChange}
                                />
                              </CheckboxLabel>
                            </CheckboxContainer>
                          </RowStart>

                          {selectedCheckbox === 'BusinessEmail' && (
                            <>
                              <Column>
                                <TextInput
                                  placeholder="Email address"
                                  id="emailAddressField"
                                  label="Email address"
                                  value={values.email}
                                  error={errors.email}
                                  onChange={(e: any) =>
                                    onChangeInput('email', e.currentTarget.value, values, setFieldValue)
                                  }
                                />
                              </Column>
                              <EmailVerificationSection
                                emailType={'secondary-email'}
                                error={!isValid}
                                verificationSecation="Business Email"
                                email={values.email}
                              />
                            </>
                          )}
                          {selectedCheckbox === 'Telegram' && (
                            <>
                              <Column>
                                <TextInput
                                  placeholder="Telegram"
                                  id="telegram"
                                  label="Telegram"
                                  value={values.telegram}
                                  error={errors.telegram}
                                  onChange={(e: any) =>
                                    onChangeInput('telegram', e.currentTarget.value, values, setFieldValue)
                                  }
                                />
                              </Column>
                              <EmailVerificationSection
                                emailType={'secondary-email'}
                                error={!isValid}
                                verificationSecation="Telegram"
                                email={values.telegram}
                              />
                            </>
                          )}
                        </div>
                      </FormCard>

                      <FormCard id="verify-documents">
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
                        <PinnedContentButton>Verify Documents</PinnedContentButton>
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
