import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Formik } from 'formik'
import { boolean, number, object } from 'yup'

import { Mail, CheckCircle, Info } from 'react-feather'

import { Offer } from 'state/launchpad/types'
import { useRequestWhitelist } from 'state/launchpad/hooks'

import { ErrorText, FormFieldContaienr, Row, Separator } from 'components/LaunchpadOffer/styled'
import { InvestFormContainer, Title } from './styled'

import { InvestTextField } from '../utils/InvestTextField'
import { InvestFormSubmitButton, InvestSubmitState, useInvestSubmitState } from '../utils/InvestSubmitButton'
import { Loader } from 'components/LaunchpadOffer/util/Loader'

interface Props {
  offer: Offer
  onClose: () => void 
}

interface FormValues { 
  amount?: number
  isInterested?: boolean
}

const initialValues: FormValues = {
  amount: undefined,
  isInterested: undefined
}

const schema = object().shape({
  amount: number().required('Please, enter amount of your estimated investment'),
  isInterested: boolean().required('Please, specify if you are interested in this deal')
})

const cleanAmount = (value: string) => Number(value.split('').filter(x => /[0-9.]/.test(x)).join(''))

export const RegisterToInvestStage: React.FC<Props> = (props) => {
  const theme = useTheme()
  const submitState = useInvestSubmitState()
  const requestWhitelist = useRequestWhitelist(props.offer.id)

  const submit = React.useCallback(async (values: FormValues) => {
    if (!values.amount || !values.isInterested) {
      return
    }

    try {
      submitState.setLoading()
      
      await requestWhitelist({ amount: values.amount, isInterested: values.isInterested })

      submitState.setSuccess()
      props.onClose()
    } catch {
      submitState.setError()
    }
  }, [submitState])

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
      {({ errors, values, setFieldValue, submitForm }) => (
        <InvestFormContainer gap="1.5rem" padding="0 0 2rem 0">
          <Title>
            Are you interested to participate in this deal? 
          </Title>

          <FormFieldContaienr>
            <ParticipationInterest>
              <ParticipationInterestButton active={values.isInterested === true} onClick={() => setFieldValue('isInterested', true)}>
                Yes
              </ParticipationInterestButton>

              <ParticipationInterestButton active={values.isInterested === false} onClick={() => setFieldValue('isInterested', false)}>
                No
              </ParticipationInterestButton>
            </ParticipationInterest>
            
            {errors.isInterested && <ErrorText>{errors.isInterested}</ErrorText>}
          </FormFieldContaienr>

          <FormFieldContaienr>
            <InvestTextField 
              type="number" 
              label="How much will be your estimated investment?"
              trailing={<CurrencyLabel>{props.offer.investingTokenSymbol}</CurrencyLabel>}
              onChange={(value) => setFieldValue('amount', cleanAmount(value))}
            />

            {errors.amount && <ErrorText>{errors.amount}</ErrorText>}
          </FormFieldContaienr>

          <InvestFormSubmitButton state={submitState.current} onSubmit={submitForm}>
            {submitState.current === InvestSubmitState.default && 'Submit'}
            {submitState.current === InvestSubmitState.success && <>Submitted <CheckCircle size="15" color={theme.launchpad.colors.success} /></>}
            {submitState.current === InvestSubmitState.loading && (
              <Row justifyContent='space-between' alignItems='center' width="100%" padding="1rem">
                <div style={{ flexGrow: 1, textAlign: 'left' }}>Your order is being processed...</div>
                <Loader size="18px" />
              </Row>
            )}
            {submitState.current === InvestSubmitState.error && (
              <Row justifyContent='space-between' alignItems='center' width="100%" padding="1rem">
                <div style={{ flexGrow: 1, textAlign: 'left' }}>Your order was not executed.</div>
                <Info size="18" color={theme.launchpad.colors.error} />
              </Row>
            )}
          </InvestFormSubmitButton>

          <Separator />
          
          <InvestTextField 
            type="email" 
            label="Sign Up for Updates"
            placeholder={<EmailPlaceholder><Mail size="16" /> Email Address</EmailPlaceholder>}
          />
        </InvestFormContainer>
      )}
    </Formik>
  )
}

const ParticipationInterest = styled.div`
  display: flex;
  flex-flow: row nowrap;

  justify-content: spaced-evenly;
  align-items: stretch;

  height: 60px;

  > button:first-child {
    border-radius: 8px 0 0 8px;
  }

  > button:last-child {
    border-radius: 0 8px 8px 0;
  }
`
const ParticipationInterestButton = styled.button<{ active: boolean }>`
  flex-grow: 1;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  line-height: 19px;
  letter-spacing: -0.02em;

  border: 1px solid ${props => props.theme.launchpad.colors.primary};

  cursor: pointer;

  color: ${props => props.active 
    ? props.theme.launchpad.colors.text.light
    : props.theme.launchpad.colors.primary};

  background: ${props => props.active 
    ? props.theme.launchpad.colors.primary
    : props.theme.launchpad.colors.foreground};
`

const EmailPlaceholder = styled.div`
  display: flex;

  flex-flow: row nowrap;
  align-items: center;

  gap: 0.5rem;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const CurrencyLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.body};
`