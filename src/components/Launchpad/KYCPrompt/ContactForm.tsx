import React from 'react'
import { object, string } from 'yup'
import { TextField, TextAreaField } from './TextField'
import { KYCPromptIconContainer, KYCPromptTitle, Caption, KYCButton } from './styled'
import { ReactComponent as ContactUsIcon } from 'assets/launchpad/svg/contact-us-icon.svg'
import { useRequestSupport } from 'state/launchpad/hooks'
import { Formik } from 'formik'
import { useAddPopup } from 'state/application/hooks'

interface Props {
  offerId?: string
  issuanceId?: number | string
  onSubmit: () => void
}

interface Payload {
  subject: string
  email: string
  text: string
}

const initialValues: Payload = {
  subject: '',
  email: '',
  text: '',
}

const schema = object().shape({
  subject: string().required('Subject should not be empty'),
  email: string().required('Email should not be empty').email('Please enter a valid email'),
  text: string().required('Please describe how we can assist'),
})

export const ContactForm: React.FC<Props> = (props) => {
  const addPopup = useAddPopup()
  const getSupport = useRequestSupport()

  const onSubmit = React.useCallback(async (values: Payload) => {
    const offer = props.offerId && { offerId: props.offerId }
    const issuance = props.issuanceId && { issuanceId: props.issuanceId }

    try {
      await getSupport({ ...values, ...offer, ...issuance })

      props.onSubmit()
      addPopup({ info: { success: true, summary: `Your message has been sent successfully` } })
    } catch (err: any) {
      addPopup({ info: { success: false, summary: err.message } })
    }
  }, [])

  return (
    <Formik validationSchema={schema} initialValues={initialValues} onSubmit={onSubmit}>
      {({ setFieldValue, errors, submitForm }) => (
        <>
          <KYCPromptIconContainer>
            <ContactUsIcon />
          </KYCPromptIconContainer>

          <KYCPromptTitle>Message us</KYCPromptTitle>

          <TextField label="Subject" error={errors.subject} onChange={(v) => setFieldValue('subject', v)} />
          <TextField label="Email Address" error={errors.email} onChange={(v) => setFieldValue('email', v)} />
          <TextAreaField label="How can we help You?" error={errors.text} onChange={(v) => setFieldValue('text', v)} />

          <KYCButton type="submit" onClick={submitForm}>
            Send
          </KYCButton>

          <Caption>Our team will follow up with you shortly.</Caption>
        </>
      )}
    </Formik>
  )
}
