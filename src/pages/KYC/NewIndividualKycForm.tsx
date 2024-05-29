import React, { useState, useEffect, useRef, useCallback } from 'react'
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
import { useCreateIndividualKYC, useKYCState, useUpdateIndividualKYC } from 'state/kyc/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { useAuthState } from 'state/auth/hooks'
import { Loadable } from 'components/LoaderHover'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { useAddPopup } from 'state/application/hooks'
import { KycSelect as Select, KycTextInput as TextInput } from './common'
import { KYCProgressBar } from './KYCProgressBar'
import { individualFormInitialValues, promptValue } from './mock'
import { FormCard, FormGrid, FormWrapper, StyledStickyBox } from './styleds'
import { individualErrorsSchemaV2 } from './schema'
import { individualTransformKycDto } from './utils'

import { KYCValidationErrors } from './KYCValidationErrors'

import { Line } from 'components/Line'
import { EmailVerificationSection } from './EmailVerificationSection'

type FormSubmitHanderArgs = {
  createFn: (body: any) => any
  updateFn: (id: number, body: any) => any
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

export default function NewIndividualKycForm() {
  const canLeavePage = useRef(false)
  const [cookies] = useCookies(['annoucementsSeen'])
  const [updateKycId, setUpdateKycId] = useState<any>(null)
  const [canSubmit, setCanSubmit] = useState(true)
  const [errors, setErrors] = useState<any>({})
  const addPopup = useAddPopup()
  const history = useHistory()
  const createIndividualKYC = useCreateIndividualKYC()
  const updateIndividualKYC = useUpdateIndividualKYC()
  const { kyc, loadingRequest } = useKYCState()
  const { account } = useActiveWeb3React()
  const { token } = useAuthState()
  const [selectedCheckbox, setSelectedCheckbox] = useState(null)
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const form = useRef<any>(null)
  const isLoggedIn = !!token && !!account
  const prevAccount = usePrevious(account)

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

  const validationSeen = (key: string) => {
    if (errors[key]) {
      const newErrors = { ...errors }
      delete newErrors[key]
      setErrors(newErrors)
    }
    setCanSubmit(true)
  }

  const onChangeInput = (key: string, value: any, values: any, setFieldValue: any) => {
    if (values[key] !== value) {
      setFieldValue(key, value, false)
    }
    validateValue(key, value)
    validationSeen(key)
  }

  const formSubmitHandler = useCallback(async (values: any, { validate = true }: FormSubmitHanderArgs) => {
    localStorage.removeItem('newKyc')
    try {
      if (validate) {
        await individualErrorsSchemaV2.validate(values, { abortEarly: false })
      }
      canLeavePage.current = true
      setCanSubmit(false)
    } catch (error: any) {
      const newErrors: any = {}
      error.inner.forEach((e: any) => {
        newErrors[e.path] = e.message
      })
      addPopup({ info: { success: false, summary: 'Please, fill the valid data' } })
      setErrors(newErrors)
      setCanSubmit(false)
      canLeavePage.current = false
    }
  }, [])

  const handleCheckboxChange = (event: { target: { value: any } }) => {
    const { value } = event.target
    setSelectedCheckbox(value)
  }
  const checkForErrorsAndEmptyFields = (values: any, errors: any) => {
    return !values.firstName || !values.lastName || !values.email || errors.firstName || errors.lastName || errors.email
  }

  return (
    <Loadable loading={!isLoggedIn}>
      <Prompt when={!canLeavePage.current} message={promptValue} />
      <LoadingIndicator isLoading={loadingRequest} />
      <StyledBodyWrapper style={{ background: 'none', boxShadow: 'none' }} hasAnnouncement={!cookies.annoucementsSeen}>
        {
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
                localStorage.removeItem('newKyc')
                await individualErrorsSchemaV2.validate(values, { abortEarly: false })
                canLeavePage.current = true
                setCanSubmit(false)
                const body = individualTransformKycDto(values, referralCode)
                const data = updateKycId
                  ? await updateIndividualKYC(updateKycId, body)
                  : await createIndividualKYC(body)

                if (data?.id) {
                  history.push('/kyc')
                  addPopup({ info: { success: true, summary: 'KYC was successfully submitted' } })
                  localStorage.removeItem('referralCode')
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
                setErrors(newErrors)
                setCanSubmit(true)
                canLeavePage.current = false
              }
            }}
          >
            {({ values, handleSubmit, setFieldValue }) => {
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
                              id="firstNameInput"
                              label="First Name"
                              placeholder="First Name"
                              value={values.firstName}
                              error={errors.firstName}
                              onChange={(e: any) =>
                                onChangeInput('firstName', e.currentTarget.value, values, setFieldValue)
                              }
                            />
                            <TextInput
                              id="middleNameInput"
                              label="Middle Name"
                              placeholder="Middle Name"
                              value={values.middleName}
                              error={errors.middleName}
                              onChange={(e: any) =>
                                onChangeInput('middleName', e.currentTarget.value, values, setFieldValue)
                              }
                            />
                            <TextInput
                              id="lastNameInput"
                              label="Last Name"
                              placeholder="Last Name"
                              value={values.lastName}
                              error={errors.lastName}
                              onChange={(e: any) =>
                                onChangeInput('lastName', e.currentTarget.value, values, setFieldValue)
                              }
                            />
                          </FormGrid>
                          <TextInput
                            placeholder="Email address"
                            id="emailAddressField"
                            label="Email address"
                            value={values.email}
                            error={errors.email}
                            onChange={(e: any) => onChangeInput('email', e.currentTarget.value, values, setFieldValue)}
                          />
                        </Column>
                        <EmailVerificationSection
                          error={checkForErrorsAndEmptyFields(values, errors)}
                          verificationSecation="Personal Information"
                          email={values.email}
                        />
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
                              <EmailVerificationSection verificationSecation="Business Email" email={values.email} />
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
                              <EmailVerificationSection verificationSecation="Telegram" email={values.telegram} />
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
                    <KYCValidationErrors fields={Object.keys(errors)} />
                    <KYCProgressBar
                      isNewKycV2={true}
                      handleSubmit={handleSubmit}
                      // handleSaveProgress={() => saveProgress(form?.current?.values)}
                      disabled={!canSubmit || Object.keys(errors).length !== 0}
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
  alignitems: center;
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
