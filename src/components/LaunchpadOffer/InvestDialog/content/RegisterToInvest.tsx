import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'
import { Formik } from 'formik'
import { boolean, number, object, string } from 'yup'
import { CheckCircle, Info, Clock, Check } from 'react-feather'
import { Offer, WhitelistStatus } from 'state/launchpad/types'
import { useGetWhitelistStatus, useRequestWhitelist } from 'state/launchpad/hooks'
import { Centered, Column, ErrorText, FormFieldContainer, Row } from 'components/LaunchpadMisc/styled'
import { InvestFormContainer, Title } from './styled'
import { InvestTextField } from '../utils/InvestTextField'
import { InvestFormSubmitButton, InvestSubmitState, useInvestSubmitState } from '../utils/InvestSubmitButton'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { KYCPromptIconContainer } from 'components/Launchpad/KYCPrompt/styled'
import { text28, text59, text9 } from 'components/LaunchpadMisc/typography'
import { useGetWarning } from '../utils/ConvertationField'

interface Props {
  offer: Offer
  onClose: () => void
}

interface FormValues {
  amount?: number
  isInterested?: boolean
  email?: string
}

type ValueSetter = (field: string, value: any, shouldValidate?: boolean | undefined) => void

const initialValues: FormValues = {
  amount: undefined,
  isInterested: undefined,
  email: undefined,
}

const schema = object().shape({
  email: string().email('Please enter a valid email'),
  isInterested: boolean().nullable(false).required('Please, specify if you are interested in this deal'),
  amount: number().when('isInterested', {
    is: true,
    then: number().required('Please enter amount of your estimated investment'),
    otherwise: number(),
  }),
})

const cleanAmount = (value: string) =>
  Number(
    value
      .split('')
      .filter((x) => /[0-9.]/.test(x))
      .join('')
  )

export const RegisterToInvestStage: React.FC<Props> = (props) => {
  const [warning, setWarning] = React.useState('')
  const getWarning = useGetWarning(props.offer)
  const theme = useTheme()
  const submitState = useInvestSubmitState()
  const whitelist = useGetWhitelistStatus(props.offer.id)
  const requestWhitelist = useRequestWhitelist(props.offer.id)
  const disableForm = React.useMemo(() => whitelist.status === WhitelistStatus.accepted, [whitelist])
  const submit = React.useCallback(
    async (values: FormValues) => {
      try {
        submitState.setLoading()
        await requestWhitelist({ amount: values.amount ?? 0, isInterested: Boolean(values.isInterested) })
        submitState.setSuccess()
        props.onClose()
      } catch {
        submitState.setError()
      }
    },
    [submitState]
  )

  const onChangeInterested = React.useCallback((value: any, setValue: ValueSetter) => {
    if (disableForm) {
      return
    }

    setValue('isInterested', value)
  }, [])

  const onChangeAmount = React.useCallback((value: any, setValue: ValueSetter) => {
    if (disableForm) {
      return
    }

    const warningText = getWarning(value)
    if (warningText) {
      setWarning(warningText)
    }
    setValue('amount', cleanAmount(value))
  }, [])

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
      {({ errors, values, setFieldValue, submitForm }) => (
        <InvestFormContainer gap="1.5rem" padding="0 0 2rem 0">
          {whitelist.loading && (
            <Centered style={{ flexGrow: 1 }}>
              <Loader />
            </Centered>
          )}

          {!whitelist.loading && (!whitelist.status || !whitelist.isInterested) && (
            <>
              <Title>Are you interested to participate in this deal?</Title>

              <FormFieldContainer>
                <ParticipationInterest>
                  <ParticipationInterestButton
                    active={values.isInterested === true}
                    onClick={() => onChangeInterested(true, setFieldValue)}
                  >
                    Yes
                  </ParticipationInterestButton>

                  <ParticipationInterestButton
                    active={values.isInterested === false}
                    onClick={() => onChangeInterested(false, setFieldValue)}
                  >
                    No
                  </ParticipationInterestButton>
                </ParticipationInterest>

                {errors.isInterested && <ErrorText>{errors.isInterested}</ErrorText>}
              </FormFieldContainer>

              <FormFieldContainer>
                <InvestTextField
                  type="number"
                  label="How much will be your estimated investment?"
                  trailing={<CurrencyLabel>{props.offer.investingTokenSymbol}</CurrencyLabel>}
                  onChange={(value) => onChangeAmount(value, setFieldValue)}
                />

                {errors.amount && <ErrorText>{errors.amount}</ErrorText>}
                {warning && <ErrorText>{warning}</ErrorText>}
              </FormFieldContainer>

              <InvestFormSubmitButton state={submitState.current} onSubmit={submitForm}>
                {submitState.current === InvestSubmitState.default && 'Submit'}
                {submitState.current === InvestSubmitState.success && (
                  <>
                    Submitted <CheckCircle size="15" color={theme.launchpad.colors.success} />
                  </>
                )}

                {submitState.current === InvestSubmitState.loading && (
                  <Row justifyContent="space-between" alignItems="center" width="100%" padding="1rem">
                    <div style={{ flexGrow: 1, textAlign: 'left' }}>Your order is being processed...</div>
                    <Loader size="18px" />
                  </Row>
                )}

                {submitState.current === InvestSubmitState.error && (
                  <Row justifyContent="space-between" alignItems="center" width="100%" padding="1rem">
                    <div style={{ flexGrow: 1, textAlign: 'left' }}>Your order was not executed.</div>
                    <Info size="18" color={theme.launchpad.colors.error} />
                  </Row>
                )}
              </InvestFormSubmitButton>
            </>
          )}

          {!whitelist.loading && whitelist.status && whitelist.isInterested && (
            <Column justifyContent="center" alignItems="center" gap="1rem" style={{ flexGrow: 1 }}>
              <KYCPromptIconContainer>
                {whitelist.status === WhitelistStatus.accepted && (
                  <Check color={theme.launchpad.colors.success} size="35" />
                )}
                {whitelist.status !== WhitelistStatus.accepted && (
                  <Clock color={theme.launchpad.colors.primary} size="35" />
                )}
              </KYCPromptIconContainer>

              <WhitelistMessage>
                {whitelist.status === WhitelistStatus.pending && (
                  <>
                    Thank you. Please check by <b>{moment(props.offer.timeframe.preSale).format('DD/MM/YYYY')}</b> for
                    the result of your registration application.
                  </>
                )}

                {whitelist.status === WhitelistStatus.declined && (
                  <>
                    Your registration to invest was unsuccessful. You can invest in this deal once the public sale
                    opens.
                  </>
                )}

                {whitelist.status === WhitelistStatus.accepted && (
                  <>Your registration to invest was successful. You can invest in this deal once the pre-sale starts.</>
                )}
              </WhitelistMessage>
            </Column>
          )}
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

  ${text9}
  border: 1px solid ${(props) => props.theme.launchpad.colors.primary};
  cursor: pointer;
  color: ${(props) => (props.active ? props.theme.launchpad.colors.text.light : props.theme.launchpad.colors.primary)};

  background: ${(props) =>
    props.active ? props.theme.launchpad.colors.primary : props.theme.launchpad.colors.foreground};
`

const CurrencyLabel = styled.div`
  ${text28}
  color: ${(props) => props.theme.launchpad.colors.text.body};
`

const WhitelistMessage = styled.div`
  ${text59}

  text-align: center;
  max-width: 80%;
  color: ${(props) => props.theme.launchpad.colors.text.title};

  b {
    color: ${(props) => props.theme.launchpad.colors.primary};
  }
`
