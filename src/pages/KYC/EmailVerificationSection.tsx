import React, { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { useAddPopup } from 'state/application/hooks'
import { useEmailVerify, useEmailVerifyCode } from 'state/kyc/hooks'
import { useHistory } from 'react-router-dom'
import { resendEmail } from 'state/admin/hooks'
import { PinnedContentButton } from 'components/Button'
import { isMobile } from 'react-device-detect'


interface Props {
  verificationSecation?: string
  email: string
  error?: boolean
}

export const EmailVerificationSection = ({ verificationSecation, email , error}: Props) => {
  const [step, setStep] = useState(1)
  const emailVerify = useEmailVerify()
  const codeVerify = useEmailVerifyCode()
  const addPopup = useAddPopup()
  const [timer, setTimer] = useState(60)
  const [hasCodeError, setHasCodeError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()
  const [boxBorderColor, setBoxBorderColor] = useState('#E6E6FF')
  const [resetCodeInput, setResetCodeInput] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [step, timer])

  const handleNextClick = async (verificationCode: string) => {
    try {
      const result = await codeVerify(verificationCode)

      if (result.success) {
        localStorage.setItem('newKyc', 'newKyc')
        history.push(email)
        window.location.reload()

        setTimer(60)
        setResetCodeInput(false)
      } else {
        setHasCodeError(true)
        setErrorMessage(String(result.error.message))
      }
    } catch (error) {
      console.error(error)
      addPopup({ info: { success: false, summary: 'An unexpected error occurred' } })
    }
  }

//   const submit = useCallback(
//     async (values: { email: string }) => {
//       try {
//         if (step === 1) {
//           if (kycType) {
//             const result = await emailVerify(values.email, kycType)

//             if (result.success) {
//               setStep(2)
//             } else {
//               addPopup({ info: { success: false, summary: result.error.message || 'Email verification failed' } })
//             }
//           }
//         }
//       } catch (err) {
//         console.error('Error during email verification:', err)
//         addPopup({ info: { success: false, summary: 'An error occurred during email verification' } })
//       }
//     },
//     [step, addPopup, emailVerify, kycType]
//   )

  const handleGetNewCodeClick = async () => {
    try {
      setHasCodeError(false)
      setResetCodeInput((prevValue) => !prevValue)
      const result = await resendEmail()
      setBoxBorderColor('#E6E6FF')
      addPopup({
        info: {
          success: true,
          summary:
            'Your email verification code has been successfully resent. Please check your inbox and complete the verification process.',
        },
      })
      setTimer(60)
    } catch (error) {
      console.error(error)
      setHasCodeError(true)
      setErrorMessage('An unexpected error occurred')
    }
  }

  console.log(email, error, verificationSecation, 'referralCode')

  return (
    <EmailVerificationContainer>
      <ContentContainer>
        <ModalContent>
          <Title>Enter the code</Title>
          <SubTitleSub>
            A 6-digit verification code has been sent to your email. Enter the code below to verify your email.
          </SubTitleSub>

          <>
            <CodeInput
              key={resetCodeInput}
              numberOfBoxes={6}
              boxBackgroundColor="#F7F7FA"
              boxBorderColor={hasCodeError ? 'red' : boxBorderColor}
              gapBetweenBoxes={5}
              handleNextClick={handleNextClick}
              reset={resetCodeInput}
            />

            <TimerContainer>
              {timer > 0 ? (
                <TimerText>{`Get new code (${timer} seconds)`}</TimerText>
              ) : (
                <span onClick={handleGetNewCodeClick}>Get New Code</span>
              )}
            </TimerContainer>
          </>
          {hasCodeError && <ErrorText>{errorMessage}</ErrorText>}
        </ModalContent>
      </ContentContainer>
    </EmailVerificationContainer>
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

const SubTitleSub = styled.div`
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

interface CodeBoxProps {
  gap: number
  backgroundColor: string
  borderColor: string
}
const CodeBox = styled.input.attrs((props: { gap: any; backgroundColor: any; borderColor: any; value: string }) => ({
  style: {
    width: isMobile ? '40px' : '80px',
    height: isMobile ? '80px' : '80px',
    textAlign: 'center',
    marginRight: `10px`,
    background: props.backgroundColor,
    border: `1px solid ${props.borderColor}`,
    borderRadius: '5px',
    gap: '5px',
    color: props.value ? '#292933' : 'gray',
    fontSize: '32px',
    fontWeight: '700'
  },
  maxLength: 1,
  type: 'tel',
  pattern: '[0-9]*',
  color: 'red',
  key: props.borderColor,
}))<{ onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; borderColor: string; backgroundColor: string }>`
  &::placeholder {
    font-weight: 700;
    color: #b8b8cc;
    font-size: 32px;
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

const CodeInput = ({ numberOfBoxes, boxBackgroundColor, boxBorderColor, reset, handleNextClick }: any) => {
  const inputRefs = Array.from({ length: numberOfBoxes }, () => React.createRef<HTMLInputElement>())
  const [code, setCode] = React.useState(Array(numberOfBoxes).fill(''))

  React.useEffect(() => {
    if (reset) {
      setCode(Array(numberOfBoxes).fill(''))
    }
  }, [reset, numberOfBoxes])

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code]

    if (newCode[index] !== value) {
      newCode[index] = ''
    }

    if (/^[a-zA-Z0-9]*$/.test(value)) {
      newCode[index] = value
      setCode(newCode)
      if (value && index < numberOfBoxes - 1) {
        inputRefs[index + 1].current?.focus()
      }
    }
  }

  const isCodeComplete = code.every((value) => value !== '')

  const handleCodeSubmit = () => {
    const verificationCode = code.join('')
    if (verificationCode.length === numberOfBoxes) {
      setTimeout(() => {
        setCode(Array(numberOfBoxes).fill(''))
      }, 1000)
      handleNextClick(verificationCode)
    } else {
      setTimeout(() => {
        setCode(Array(numberOfBoxes).fill(''))
      }, 2000)
    }
  }

  return (
    <CodeInputContainer key={reset}>
      <CodeRow>
        {Array.from({ length: numberOfBoxes }).map((_, index) => (
          <CodeBox
            placeholder="0"
            key={index}
            value={code[index]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCodeChange(index, e.target.value)}
            borderColor={boxBorderColor}
            backgroundColor={boxBackgroundColor}
            ref={inputRefs[index]}
          />
        ))}
      </CodeRow>

      <PinnedContentButton disabled={!isCodeComplete} onClick={handleCodeSubmit}>
        Send Code
      </PinnedContentButton>
    </CodeInputContainer>
  )
}
