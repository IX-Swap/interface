import React from 'react'
import styled from 'styled-components'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { text12, text1, text8 } from 'components/LaunchpadMisc/typography'
import { CloseIcon, MEDIA_WIDTHS } from 'theme'
import { isMobile } from 'react-device-detect'
import { PinnedContentButton } from 'components/Button'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useSubscribeToOffer } from 'state/launchpad/hooks'
import { useAddPopup } from 'state/application/hooks'
import { useEmailVerify, useEmailVerifyCode } from 'state/kyc/hooks'
import { ReactComponent as ArrowBack } from 'assets/images/newBack.svg'
import { useHistory } from 'react-router-dom'

interface Props {
  isModalOpen: boolean
  closeModal: () => void
  kycType?: string
}

export const EmailVerification = ({ isModalOpen, closeModal, kycType }: Props) => {
  const [active, setActive] = React.useState(false)
  const [step, setStep] = React.useState(1)
  const [stepHistory, setStepHistory] = React.useState([1])
  const emailVerify = useEmailVerify()
  const codeVerify = useEmailVerifyCode()
  const addPopup = useAddPopup()
  const [timer, setTimer] = React.useState(60)
  const [hasCodeError, setHasCodeError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [email, setEmail] = React.useState('')
  const history = useHistory()
  React.useEffect(() => {
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

  const handleEmailInput = React.useCallback((text: string, setFieldValue: any) => {
    setActive(text !== '')
    setFieldValue('email', text)
  }, [])

  const initialValues = {
    email: '',
  }

  const handleNextClick = async (verificationCode: string) => {
    try {
      // Call the codeVerify function with the verification code
      const result = await codeVerify(verificationCode)

      if (result.success) {
        if (kycType === 'individual') {
          // Redirect to the individual KYC page
          history.push('/kyc/individual')
          window.location.reload();
        } else if (kycType === 'corporate') {
          // Redirect to the corporate KYC page
          history.push('/kyc/corporate')
          window.location.reload();
        }
        setTimer(60)
      } else {
        // Handle error
        console.error(result.error)
        setHasCodeError(true)
        setErrorMessage('Invalid code. Please try again or get a new code.')
      }
    } catch (error) {
      console.error(error)
      addPopup({ info: { success: false, summary: `An unexpected error occurred` } })
    }
  }

  const handleBackClick = () => {
    // Go back to the previous step
    setHasCodeError(false) // Reset code error status
    setErrorMessage('') // Reset error message
    setStep((prevStep) => Math.max(1, prevStep - 1))
  }

  const schema = object().shape({
    email: string()
      .required('Invalid email address. Please try again.')
      .email('Invalid email address. Please try again.'),
  })

  const submit = React.useCallback(
    async (values: { email: string }) => {
      try {
        if (step === 1) {
          if (kycType) {
            // Assuming emailVerify is an asynchronous function
            const result = await emailVerify(values.email, kycType);
  
            if (result.success) {
              setEmail(values.email);
              console.log(values.email, kycType,result, 'kycType');
              setStep(2);
            } else {
              // Handle the case when verification is not successful
              addPopup({ info: { success: false, summary: 'Email verification failed' } });
            }
          }
        } else if (step === 2) {
          // Handle step 2 logic or actions if needed
        }
  
        // addPopup({ info: { success: true, summary: `You have subscribed successfully` } })
      } catch (err) {
        console.error('Error during email verification:', err);
        addPopup({ info: { success: false, summary: 'An error occurred during email verification' } });
      }
    },
    [step, addPopup, emailVerify, kycType]
  );
  

  const handleGetNewCodeClick = async () => {
    try {
      // Log values.email and kycType
      if (email && kycType) {
        await emailVerify(email, kycType)
        console.log(kycType, email, 'kycType')
      }

      // Reset the timer to 60 seconds
      setTimer(60)
    } catch (error) {
      console.error(error)
      // Handle error if necessary
    }
  }

  // console.log(isModalOpen, initialValues, 'isModalOpenisModalOpen')
  return (
    <RedesignedWideModal maxHeight={'100vh'} isOpen={isModalOpen} onDismiss={closeModal}>
      <ModalContainer style={{ width: '100%' }}>
        <CloseIcon
          style={{ position: 'absolute', right: '30px', color: '#B8B8CC', top: isMobile ? '30px' : '40px' }}
          data-testid="cross"
          onClick={closeModal}
        />
        <ModalContent style={{ width: '100%' }}>
          {step === 1 && <IXSTitle>Welcome to IX Swap</IXSTitle>}
          {step === 2 && (
            <FlexContainer>
              <ArrowBack
                style={{ position: 'absolute', left: '55px', top: '100px', cursor: 'pointer' }}
                onClick={handleBackClick}
              />
              <IXSTitle>Welcome to IX Swap</IXSTitle>
            </FlexContainer>
          )}

          {step === 1 && <IXSSubTitle>Verify your email</IXSSubTitle>}
          {step === 2 && <IXSSubTitle> Enter the code</IXSSubTitle>}
          {step === 1 && (
            <IXSSubTitleSub>
              Get a verification code sent to your email address so we <br /> can confirm that you are not a robot.
            </IXSSubTitleSub>
          )}
          {step === 2 && (
            <IXSSubTitleSub>
              A 6-digit verification code has been sent to your email. <br /> Enter the code below to verify your email.
            </IXSSubTitleSub>
          )}
          {step === 1 && (
            <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
              {({ errors, setFieldValue, submitForm, touched, isValid }) => (
                <SubscriptionFormFieldContainer>
                  <SubscriptionFormEmailField>
                    <SubscriptionFormEmailFieldInput
                      onChange={(e) => handleEmailInput(e.target.value, setFieldValue)}
                    />
                    <SubscriptionFormEmailFieldLabel active={active}>Email Address</SubscriptionFormEmailFieldLabel>
                    {touched.email && errors.email && <ErrorText>{errors.email}</ErrorText>}
                  </SubscriptionFormEmailField>
                  <SubscriptionFormSubmitButton disabled={step !== 1 || !isValid || !active} onClick={submitForm}>
                    Next
                  </SubscriptionFormSubmitButton>
                </SubscriptionFormFieldContainer>
              )}
            </Formik>
          )}
          {step === 2 && (
            <>
              <CodeInput
                numberOfBoxes={6}
                boxBackgroundColor="#F7F7FA"
                boxBorderColor={hasCodeError ? 'red' : '#E6E6FF'}
                gapBetweenBoxes={5}
                handleNextClick={handleNextClick}
              />
              <TimerContainer>
                {timer > 0 ? (
                  <>
                    <TimerText>{`Get new code (${timer} seconds)`}</TimerText>
                  </>
                ) : (
                  <span
                    style={{ color: '#6666FF', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                    onClick={handleGetNewCodeClick}
                  >
                    Get New Code
                  </span>
                )}
              </TimerContainer>
            </>
          )}
          <ErrorText>{hasCodeError && <p>{errorMessage}</p>}</ErrorText>
        </ModalContent>
      </ModalContainer>
    </RedesignedWideModal>
  )
}
interface GetNewCodeButtonProps {
  onClick: () => void
  visible: boolean
}

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

const TimerText = styled.p`
  font-size: 13px;
  margin-right: 10px;
  color: #666680;
  font-weight: 400;
`

const GetNewCodeButton = styled.button<GetNewCodeButtonProps>`
  background-color: #6666ff;
  color: #fff;
  ${text12}
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`

const IXSTitle = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  text-align: center;
  color: #666680;
  margin-bottom: 20px;
`

const IXSSubTitle = styled.div`
  font-weight: 800;
  font-size: 32px;
  line-height: 120%;
  text-align: center;
  color: #292933;
  margin-bottom: 20px;
`
const IXSSubTitleSub = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 120%;
  text-align: center;
  color: #666680;
  margin-bottom: 20px;
`

const ModalContainer = styled.div`
  background: white;
  padding: 100px;
  border-radius: 6px;

  backdrop-filter: blur(20px);
  @media (max-width: 768px) {
    width: calc(100% - 24px);
    padding: 0px;
    border-radius: 12px;
    margin: 0 auto;
  }
`

const ModalContent = styled.div`
  width: 450px;
  overflow-y: auto;
  max-height: 90vh;
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    background: white;
    max-height: 90vh;
  }
`

const SubscriptionFormFieldContainer = styled.div`
  display: grid;
  flex-flow: row nowrap;
  justify-items: center;
  gap: 1rem;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: grid;
  `};
`

const SubscriptionFormEmailField = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  position: relative;
  margin: auto;
  :focus-within label {
    transform: translate(0.5rem, 6px) scale(0.75);
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
     width: 370px;
  `};
`

const SubscriptionFormEmailFieldLabel = styled.label<{ active: boolean }>`
  position: absolute;
  transform: translate(1.5rem, 24px) scale(1);
  ${(props) => props.active && 'transform: translate(0.5rem, 6px) scale(0.75);'}

  pointer-events: none;

  ${text8}
  color: #b8b8cc;
  transform-origin: top left;
  transition: all 0.2s ease-out;
`

const SubscriptionFormEmailFieldInput = styled.input`
  background: #f7f7fa;
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
  height: 60px;
  outline: 0;
  margin-bottom: 10px;
`

const SubscriptionFormSubmitButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#E2E2F1' : '#6666FF')};
  color: ${(props) => props.theme.launchpad.colors.text.light};

  ${text1}
  padding: 1rem 3rem;
  height: 60px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  width: 200px;
  margin-top: 20px;
`

const ErrorText = styled.div`
  color: #ff6161;
  font-weight: 400;
  font-size: 13px;
  text-align: center;
`
interface CodeBoxProps {
  gap: number
  backgroundColor: string
  borderColor: string
}
const CodeBox = styled.input.attrs((props: { gap: any; backgroundColor: any; borderColor: any; value: string }) => ({
  style: {
    width: '50px',
    height: '80px',
    textAlign: 'center',
    marginRight: `10px`,
    background: props.backgroundColor,
    border: `1px solid ${props.borderColor}`,
    borderRadius: '5px',
    gap: '3px',
    color: props.value ? 'black' : 'gray',
  },
  maxLength: 1,
  type: 'tel',
  pattern: '[0-9]*',
  color: 'red',
}))<{ onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; borderColor: string; backgroundColor: string }>``

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

const CodeInput = ({ numberOfBoxes, boxBackgroundColor, boxBorderColor, gapBetweenBoxes, handleNextClick }: any) => {
  const inputRefs = Array.from({ length: numberOfBoxes }, () => React.createRef<HTMLInputElement>())

  const [code, setCode] = React.useState(Array(numberOfBoxes).fill(''))

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code]
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      newCode[index] = value
      setCode(newCode)

      // Automatically move to the next input box when the current box is filled
      if (value && index < numberOfBoxes - 1) {
        inputRefs[index + 1].current?.focus()
      }
    }
  }

  const isCodeComplete = code.every((value) => value !== '')

  const handleCodeSubmit = () => {
    const verificationCode = code.join('')
    if (verificationCode.length === numberOfBoxes) {
      handleNextClick(verificationCode)
    } else {
      // Set the error message
    }
  }

  return (
    <CodeInputContainer>
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

      <SubscriptionFormSubmitButton disabled={!isCodeComplete} onClick={handleCodeSubmit}>
        Next
      </SubscriptionFormSubmitButton>
    </CodeInputContainer>
  )
}
