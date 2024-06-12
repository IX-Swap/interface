import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useAddPopup } from 'state/application/hooks'
import {
  useGenerateEmailVerifyCode,
  useVerifyIndividualCode,
  useResendEmail,
  useGenerateSecondaryEmailVerifyCode,
  useVerifySecondaryEmailCode,
  useSocialAccountVerificationStatus,
} from 'state/kyc/hooks'
import { PinnedContentButton } from 'components/Button'
import { isMobile } from 'react-device-detect'
import { EmailType, SuccessType } from './enum'
import { TYPE } from 'theme'
import { ReactComponent as CopyIcon } from 'assets/images/copy.svg'

interface Props {
  verificationSecation?: string
  email?: string
  error?: boolean
  onSuccess?: (section: string) => void
  emailType: string
  isVerifiedPersonalInfo?: boolean
  isVerifiedBusinessEmail?: boolean
  personalInfo?: {
    firstName: string
    middleName: string
    lastName: string
    email: string
    referralCode?: string | null
  }
  businessEmail?: any
}

const SecondaryContactOption: React.FC<Props> = ({
  error,
  personalInfo,
  onSuccess,
  emailType,
  isVerifiedPersonalInfo,
  isVerifiedBusinessEmail,
  businessEmail,
  verificationSecation,
}) => {
  const generateEmailVerifyCode = useGenerateEmailVerifyCode()
  const resendEmail = useResendEmail()
  const generateSecondaryEmailVerifyCode = useGenerateSecondaryEmailVerifyCode()
  const addPopup = useAddPopup()
  const [timer, setTimer] = useState(0)
  const [hasCodeError, setHasCodeError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [resetCodeInput, setResetCodeInput] = useState(false)
  const [initialEmail, setInitialEmail] = useState(personalInfo?.email || '')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [socialAccountOTP, SetsocialAccountOTP] = useState()
  const telegramBotUsername = process.env.REACT_APP_TELEGRAM_VERIFICATION_BOT
  const telegramUrl = `https://t.me/${telegramBotUsername}`
  const getButtonText = (section: string | undefined) => {
    return section === 'Telegram' ? 'Get Code' : 'Send Code'
  }
  const [buttonText, setButtonText] = useState(getButtonText(verificationSecation))
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  useEffect(() => {
    if (personalInfo?.email !== initialEmail) {
      setInitialEmail(personalInfo?.email || '')
      setHasCodeError(false)
      setErrorMessage('')
    }
  }, [personalInfo?.email, initialEmail])
  const handleSendCode = async () => {
    if (error) {
      return null;
    }
    setIsButtonDisabled(true)

    try {
      const result =
        !isVerifiedPersonalInfo && !isVerifiedBusinessEmail
          ? await sendPrimaryEmailVerification()
          : await sendSecondaryEmailVerification()
      result.success ? handleSuccess() : handleError(result.error.message)
    } catch (error) {
      handleError('An unexpected error occurred')
    } finally {
      setIsButtonDisabled(false)
      setTimer(60)
    }
  }

  const sendPrimaryEmailVerification = async () => {
    if (!personalInfo) throw new Error('Personal information is missing')
    return await generateEmailVerifyCode(personalInfo)
  }

  const sendSecondaryEmailVerification = async () => {
    if (!emailType) throw new Error('Email type or business email is missing')
    const response = await generateSecondaryEmailVerifyCode(emailType, businessEmail)
    if (emailType === EmailType.SOCIAL_ACCOUNT) {
      SetsocialAccountOTP(response?.response?.data?.otp)
    }
    return response
  }

  const handleSuccess = () => {
    addPopup({ info: { success: true, summary: 'The verification code has been successfully sent to your email' } })
    localStorage.setItem('newKyc', 'newKyc')
    setResetCodeInput(false)
    setButtonText('Verify Code')
  }

  const handleError = (message: string) => {
    setErrorMessage(message)
    setHasCodeError(true)
    addPopup({ info: { success: false, summary: message } })
  }

  const handleGetNewCodeClick = async () => {
    setHasCodeError(false)
    setResetCodeInput(!resetCodeInput)
    try {
      const result = await resendEmail(emailType)
      if (result.success) {
        addPopup({
          info: {
            success: true,
            summary:
              'Your email verification code has been successfully resent. Please check your inbox and complete the verification process.',
          },
        })

        setTimer(60)
      } else {
        handleError(result.error.message)
      }
    } catch (error) {
      handleError('An unexpected error occurred')
    }
  }
  const handleTelegramRedirect = () => {
    window.open(telegramUrl, '_blank')
  }
  return (
    <EmailVerificationContainer>
      <ContentContainer>
        <ModalContent>
          {emailType === EmailType.SOCIAL_ACCOUNT ? (
            <>
              <SocialAccountTitle>Instruction</SocialAccountTitle>
              <SocialAccountSubTitle>1. Open the Telegram App</SocialAccountSubTitle>
              <SocialAccountSubTitle>
                2. Start a chat with{' '}
                <span onClick={handleTelegramRedirect} style={{ color: '#6666FF', cursor: 'pointer' }}>
                  @{telegramBotUsername}
                </span>
              </SocialAccountSubTitle>
              <SocialAccountSubTitle>3. Get Verification Code</SocialAccountSubTitle>
            </>
          ) : (
            <>
              <Title>Enter the code</Title>
              <SubTitle>
                A 6-digit verification code has been sent to your email. Enter the code below to verify your email.
              </SubTitle>
            </>
          )}

          <CodeInput
            error={error}
            key={resetCodeInput}
            numberOfBoxes={6}
            handleSendCode={handleSendCode}
            buttonText={buttonText}
            reset={resetCodeInput}
            onSuccess={onSuccess}
            handleError={handleError}
            setTimer={setTimer}
            isVerifiedPersonalInfo={isVerifiedPersonalInfo}
            isVerifiedBusinessEmail={isVerifiedBusinessEmail}
            emailType={emailType}
            verificationSecation={verificationSecation}
            socialAccountOTP={socialAccountOTP}
            isButtonDisabled={isButtonDisabled}
            setIsButtonDisabled={setIsButtonDisabled}
          />
          <TimerContainer>
            {timer > 0 ? (
              <TimerText>{`Get new code (${timer} seconds)`}</TimerText>
            ) : (
              <span style={{ cursor: 'pointer' }} onClick={handleGetNewCodeClick}>
                {buttonText === 'Verify Code' ? 'Get New Code' : ''}
              </span>
            )}
          </TimerContainer>
          {hasCodeError && <ErrorText>{errorMessage}</ErrorText>}
        </ModalContent>
      </ContentContainer>
    </EmailVerificationContainer>
  )
}

const CodeInput: React.FC<any> = ({
  numberOfBoxes,
  reset,
  error,
  handleSendCode,
  buttonText,
  onSuccess,
  handleError,
  setTimer,
  isVerifiedPersonalInfo,
  isVerifiedBusinessEmail,
  emailType,
  verificationSecation,
  socialAccountOTP,
  isButtonDisabled,
  setIsButtonDisabled,
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([])
  const [code, setCode] = useState(Array(numberOfBoxes).fill(''))
  const verifyIndividualCode = useVerifyIndividualCode()
  const verifySecondaryEmailCode = useVerifySecondaryEmailCode()
  const verifySocialAccountCode = useSocialAccountVerificationStatus()
  const addPopup = useAddPopup()
  const [verifyError, setVerifyError] = useState(false)

  useEffect(() => {
    if (reset) {
      setCode(Array(numberOfBoxes).fill(''))
    }
  }, [reset, numberOfBoxes])

  const handleCodeChange = (index: number, value: string) => {
    if (!/^[a-zA-Z0-9]*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value.slice(-1)
    setCode(newCode)

    if (index < numberOfBoxes - 1 && value) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      if (code[index]) {
        const newCode = [...code]
        newCode[index] = ''
        setCode(newCode)
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    } else {
      inputRefs.current[index].select()
    }
  }

  const handleVerifyCode = async () => {
    const verificationCode = code.join('')
    setIsButtonDisabled(true)
    try {
      const verifyCode =
        !isVerifiedPersonalInfo && !isVerifiedBusinessEmail ? verifyIndividualCode : verifySecondaryEmailCode

      const result = await verifyCode(verificationCode)

      if (result.success) {
        handleVerificationSuccess()
      } else {
        handleVerificationError(result.error.message)
        setVerifyError(true)
        setTimer(60)
      }
    } catch (error) {
      handleVerificationError('An unexpected error occurred')
      setVerifyError(true)
      setTimer(60)
    } finally {
      setIsButtonDisabled(false)
    }
  }

  const handleVerificationSuccess = () => {
    if (onSuccess) {
      const successType = emailType === EmailType.PRIMARY ? SuccessType.PERSONAL : SuccessType.BUSINESS
      onSuccess(successType)
    }
    addPopup({ info: { success: true, summary: 'Verification successful!' } })
  }

  const handleVerificationError = (errorMessage: string) => {
    handleError(errorMessage)
  }

  const handleButtonClick = () => {  
    if (buttonText === 'Send Code' || buttonText === 'Get Code') {
      handleSendCode();
    } else {
      handleVerifyCode();
    }
  }
  

  const handleCopyClick = async () => {
    navigator.clipboard.writeText(socialAccountOTP)
    addPopup({ info: { success: true, summary: 'Code copied to clipboard!' } })
  }

  useEffect(() => {
    if (socialAccountOTP) {
      const cleanup = startVerificationInterval(verifySocialAccountCode, handleVerificationSuccess)
      return cleanup
    }
  }, [socialAccountOTP])

  const startVerificationInterval = (verifySocialAccountCode: any, handleVerificationSuccess: any) => {
    const interval = setInterval(async () => {
      const result = await verifySocialAccountCode()
      if (result.status === 1) {
        clearInterval(interval)
        handleVerificationSuccess()
      }
    }, 5000)

    return () => clearInterval(interval)
  }

  return (
    <>
      <CodeInputContainer key={reset}>
        {emailType === EmailType.SOCIAL_ACCOUNT ? (
          ''
        ) : (
          <CodeRow>
            {code.map((_, index) => (
              <CodeBox
                key={index}
                placeholder="0"
                value={code[index]}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                borderColor={verifyError ? '#FF6D6D80' : '#E6E6FF'}
                backgroundColor={verifyError ? '#F8E9EC' : '#F7F7FA'}
                color={verifyError ? '#FF6D6D' : '#292933'}
                placeholderColor={verifyError ? '#FF6D6D' : '#B8B8CC'}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el as HTMLInputElement
                  }
                }}
              />
            ))}
          </CodeRow>
        )}

        {socialAccountOTP ? (
          <Container>
            <TYPE.title7>{socialAccountOTP}</TYPE.title7>
            <CopyIcon style={{ width: '30px', height: '18px', cursor: 'pointer' }} onClick={handleCopyClick} />
          </Container>
        ) : (
          <PinnedContentButton disabled={isButtonDisabled} onClick={handleButtonClick}>
            {buttonText}
          </PinnedContentButton>
        )}
      </CodeInputContainer>
      {emailType === EmailType.SOCIAL_ACCOUNT && (
        <SocialAccountSubTitle style={{ marginTop: '20px' }}>4. Send the code to the Bot</SocialAccountSubTitle>
      )}
    </>
  )
}
const Container = styled.div`
  background: #ffffff;
  border: 1px solid #e6e6ff;
  padding: 24px 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  place-items: center;
  border-radius: 8px;
`

const EmailVerificationContainer = styled.div`
  background: #f7f7fa;
  margin-top: 30px;
  border: 1px solid #e6e6ff;
  padding: 20px 40px;
  border-radius: 6px;
  @media (max-width: 768px) {
    width: calc(100% - 24px);
    padding: 0px;
    border-radius: 12px;
    margin: 0 auto;
  }
`

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
`

const ModalContent = styled.div`
  width: 100%;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  color: #292933;
  margin-top: 20px;
  @media (max-width: 768px) {
    font-size: 13px;
    margin-top: 20px;
  }
`

const SocialAccountTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  text-align: left;
  color: #292933;
  margin-top: 20px;
  @media (max-width: 768px) {
    font-size: 13px;
    margin-top: 20px;
  }
`

const SubTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: #666680;
  margin: 10px 220px;
  line-height: 20px;
  @media (max-width: 768px) {
    font-size: 13px;
    margin-top: 10px;
  }
`

const SocialAccountSubTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  text-align: left;
  color: #666680;
  margin: 10px 0px;
  line-height: 20px;
  @media (max-width: 768px) {
    font-size: 13px;
    margin-top: 10px;
  }
`

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  text-align: center;
`

const TimerContainer = styled.div`
  margin-top: 40px;
  text-align: center;
`

const TimerText = styled.span`
  color: #666680;
  font-size: 14px;
`

const CodeBox = styled.input.attrs(
  (props: { borderColor: string; backgroundColor: string; color: string; placeholderColor: string }) => ({
    style: {
      width: isMobile ? '40px' : '80px',
      height: '80px',
      textAlign: 'center',
      marginRight: '10px',
      background: props.backgroundColor,
      border: `1px solid ${props.borderColor}`,
      borderRadius: '5px',
      fontSize: '32px',
      fontWeight: '700',
      color: props.color,
    },
    maxLength: 1,
    type: 'tel',
    pattern: '[0-9]*',
  })
)<{ borderColor: string; backgroundColor: string; placeholderColor: string }>`
  &::placeholder {
    color: ${(props) => props.placeholderColor};
  }
`

const CodeInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

const CodeRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  flex-direction: row;
`

export default SecondaryContactOption
