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

interface Props {
    isModalOpen: boolean
  closeModal: () => void
}

export const EmailVerification = ({ isModalOpen, closeModal }: Props) => {
  const [active, setActive] = React.useState(false)
  const [step, setStep] = React.useState(1)
  const subscribe = useSubscribeToOffer()
  const addPopup = useAddPopup()

  const handleEmailInput = React.useCallback((text: string, setFieldValue: any) => {
    setActive(text !== '')
    setFieldValue('email', text)
  }, [])

  const initialValues = {
    email: '',
  }

  const handleNextClick = () => {
    if (step === 1) {
      // Trigger email verification here
      // Assuming verification is successful, move to the next step
      setStep(2)
    } else if (step === 2) {
      // Trigger code verification here
      // Assuming code verification is successful, move to the next step
      setStep(3)
    }
  }

  const schema = object().shape({
    email: string().required('Please write your email').email('Please enter a valid email'),
  })

  const submit = React.useCallback(
    async (values: { email: string }) => {
      try {
        if (step === 1) {
          // Handle email verification
          // Assuming verification is successful, move to the next step
          setStep(2)
        } else if (step === 2) {
          // Handle code verification
          // Assuming verification is successful, move to the next step or perform any other actions
          setStep(3)
        }
        await subscribe(values.email, '')
        addPopup({ info: { success: true, summary: `You have subscribed successfully` } })
      } catch (err: any) {
        addPopup({ info: { success: false, summary: err.message } })
      }
    },
    [step, subscribe, addPopup]
  )
  console.log(isModalOpen, 'isModalOpenisModalOpen')
  return (

    <RedesignedWideModal maxHeight={'100vh'} isOpen={isModalOpen} onDismiss={closeModal}>
      <ModalContainer style={{ width: '100%' }}>
        <CloseIcon
          style={{ position: 'absolute', right: '30px', color: '#B8B8CC', top: isMobile ? '30px' : '' }}
          data-testid="cross"
          onClick={closeModal}
        />
        <ModalContent style={{ width: '100%' }}>
          <IXSTitle>Welcome to IX Swap</IXSTitle>
          {step === 1 && <IXSSubTitle>Verify your email</IXSSubTitle>}
          {step === 2 && <IXSSubTitle>Enter the code</IXSSubTitle>}
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
          {step === 3 && <IXSSubTitle>{/* Additional text for the code input step if needed */}</IXSSubTitle>}
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
                  <SubscriptionFormSubmitButton disabled={step !== 1 || !isValid} onClick={submitForm}>
                    Next
                  </SubscriptionFormSubmitButton>
                </SubscriptionFormFieldContainer>
              )}
            </Formik>
          )}
          {step === 2 && (
            <CodeInput
              numberOfBoxes={6}
              boxBackgroundColor="#F7F7FA"
              boxBorderColor="#E6E6FF"
              gapBetweenBoxes={5}
              handleNextClick={handleNextClick}
            />
          )}
          {step === 3 && (
            <CodeInput
              numberOfBoxes={6}
              boxBackgroundColor="#F7F7FA"
              boxBorderColor="#E6E6FF"
              gapBetweenBoxes={5}
              handleNextClick={handleNextClick}
            />
          )}
        </ModalContent>
      </ModalContainer>
    </RedesignedWideModal>
  )
}

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
  padding: 120px;
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
  color: ${(props) => props.theme.launchpad.colors.text.error};
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
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
    background: '#F7F7FA',
    border: `1px solid #E6E6FF`,
    borderRadius: '5px',
    gap: '3px',
  },
  maxLength: 1,
  type: 'tel',
  pattern: '[0-9]*',
  color: 'red'
}))<{ onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }>``

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
  const [code, setCode] = React.useState(Array(numberOfBoxes).fill(''))

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code]
    // Allow only numeric values
    if (/^\d*$/.test(value)) {
      newCode[index] = value
      setCode(newCode)
    }
  }

  const handleCodeSubmit = () => {
    // Add any additional logic for code submission/validation
    handleNextClick()
  }

  return (
    <CodeInputContainer>
      <CodeRow>
        {Array.from({ length: numberOfBoxes }).map((_, index) => (
          <CodeBox
            key={index}
            value={code[index]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCodeChange(index, e.target.value)}
          />
        ))}
      </CodeRow>
      <SubscriptionFormSubmitButton onClick={handleCodeSubmit}>Next</SubscriptionFormSubmitButton>
    </CodeInputContainer>
  )
}
