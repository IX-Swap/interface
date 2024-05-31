import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useAddPopup } from 'state/application/hooks'
import { useGenerateEmailVerifyCode, useVerifyIndividualCode, useResendEmail } from 'state/kyc/hooks'
import { resendEmail } from 'state/admin/hooks'
import { PinnedContentButton } from 'components/Button'
import { isMobile } from 'react-device-detect'

interface Props {
  verificationSecation?: string
  email: string
  error?: boolean
  onSuccess?: () => void
  emailType: string
  personalInfo?: {
    firstName: string
    middleName: string
    lastName: string
    email: string
  }
}

const EmailVerificationSection: React.FC<Props> = ({ error, personalInfo, onSuccess, emailType }) => {
  const generateEmailVerifyCode = useGenerateEmailVerifyCode()
  const resendEmail = useResendEmail()
  const addPopup = useAddPopup()
  const [timer, setTimer] = useState(0)
  const [hasCodeError, setHasCodeError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [resetCodeInput, setResetCodeInput] = useState(false)
  const [buttonText, setButtonText] = useState('Send Code')

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  const handleSendCode = async () => {
    if (!personalInfo) {
      addPopup({ info: { success: false, summary: 'Personal information is missing' } })
      return
    }
    try {
      const result = await generateEmailVerifyCode(personalInfo)
      if (result.success) {
        addPopup({ info: { success: true, summary: 'The verification code has been successfully sent to your email' } })
        localStorage.setItem('newKyc', 'newKyc')
        setResetCodeInput(false)
        setButtonText('Verify Code')
      } else {
        handleError(result.error.message)
      }
    } catch (error) {
      handleError('An unexpected error occurred')
    }
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

  return (
    <EmailVerificationContainer>
      <ContentContainer>
        <ModalContent>
          <Title>Enter the code</Title>
          <SubTitle>
            A 6-digit verification code has been sent to your email. Enter the code below to verify your email.
          </SubTitle>
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
          />
          <TimerContainer>
            {timer > 0 ? (
              <TimerText>{`Get new code (${timer} seconds)`}</TimerText>
            ) : (
              <span style={{ cursor: 'pointer' }} onClick={handleGetNewCodeClick}>
                {hasCodeError ? 'Get New Code' : ''}
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
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([])
  const [code, setCode] = useState(Array(numberOfBoxes).fill(''))
  const verifyIndividualCode = useVerifyIndividualCode()
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
    newCode[index] = value
    setCode(newCode)
    if (value && index < numberOfBoxes - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleVerifyCode = async () => {
    const verificationCode = code.join('')
    try {
      const result = await verifyIndividualCode(verificationCode)
      if (result.success) {
        if (onSuccess) onSuccess()
        addPopup({ info: { success: true, summary: 'Verification successful!' } })
      } else {
        handleError(result.error.message)
        setVerifyError(true)
        setTimer(60)
      }
    } catch (error) {
      handleError('An unexpected error occurred')
      setVerifyError(true)
      setTimer(60)
    }
  }

  const handleButtonClick = () => {
    if (buttonText === 'Send Code') {
      handleSendCode()
    } else {
      handleVerifyCode()
    }
  }

  return (
    <CodeInputContainer key={reset}>
      <CodeRow>
        {code.map((_, index) => (
          <CodeBox
            key={index}
            placeholder="0"
            value={code[index]}
            onChange={(e) => handleCodeChange(index, e.target.value)}
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
      <PinnedContentButton disabled={error} onClick={handleButtonClick}>
        {buttonText}
      </PinnedContentButton>
    </CodeInputContainer>
  )
}

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

export default EmailVerificationSection
