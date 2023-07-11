import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { ArrowLeft, ChevronUp } from 'react-feather'
import { Formik, FormikProps } from 'formik'
import styled, { useTheme } from 'styled-components'

import { useAddPopup } from 'state/application/hooks'
import { useRole } from 'state/user/hooks'
import {
  useLoader,
  useOfferFormInitialValues,
  useSubmitOffer,
  useVetting,
  useMinimalOfferEdit,
} from 'state/launchpad/hooks'

import { IssuanceStatus } from 'components/LaunchpadIssuance/types'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { LoaderContainer } from 'components/LaunchpadMisc/styled'
import { InformationForm } from './InformationForm'
import { InformationFormValues } from './types'
import { FormContainer, FormHeader, FormTitle } from '../shared/styled'
import { createValidationSchema, editSchema } from './schema'
import { getInitialValues } from './util'
import { useQueryParams } from 'hooks/useParams'
import { useActiveWeb3React } from 'hooks/web3'

interface Props {
  edit?: boolean
}

export const IssuanceInformationForm: React.FC<Props> = (props) => {
  const theme = useTheme()
  const history = useHistory()
  const addPopup = useAddPopup()
  const { isAdmin } = useRole()
  const { account } = useActiveWeb3React();
  const loader = useLoader(false)

  const form = React.useRef<FormikProps<InformationFormValues>>(null)

  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const [showCloseDialog, setShowCloseDialog] = React.useState(false)
  const {
    objectParams: { id: issuanceId },
  } = useQueryParams<{ id: number }>(['id'])

  const vetting = useVetting(issuanceId)
  const smartContractStrategy = vetting.data?.smartContractStrategy
  const offer = useOfferFormInitialValues(issuanceId, smartContractStrategy)
  const initialValues = useMemo(() => getInitialValues(smartContractStrategy), [smartContractStrategy])

  const schema = createValidationSchema(account)
  const validationSchema = useMemo(() => (props.edit ? editSchema : schema), [props.edit])

  const submitOffer = useSubmitOffer()
  const editOffer = useMinimalOfferEdit()

  const isFullEdit = useMemo(() => {
    let res = false
    if (offer.data?.status) {
      res = [IssuanceStatus.draft, IssuanceStatus.changesRequested, IssuanceStatus.declined].includes(offer.data.status)
    }
    return res
  }, [offer.data?.status, isAdmin])

  const _submit = React.useCallback(
    async (values: InformationFormValues, draft: boolean) => {
      loader.start()
      const noOffer = !offer.issuance?.vetting?.offer
      try {
        if (noOffer || isFullEdit) {
          await submitOffer(values, offer.data ?? initialValues, draft, vetting.data?.id, offer.data?.id)
        } else if (offer.data) {
          await editOffer(offer.data.id ?? '', values, offer.data)
        }

        const summary = draft ? 'Draft saved successfully' : 'Offer created successfully'
        addPopup({ info: { success: true, summary } })

        goMain()
      } catch (err: any) {
        addPopup({ info: { success: false, summary: err?.toString() } })
      } finally {
        loader.stop()
      }
    },
    [vetting.data, offer.data, offer.issuance, isFullEdit, initialValues]
  )

  const submit = React.useCallback(
    (values: InformationFormValues) => {
      _submit(values, false)
    },
    [_submit]
  )

  const goMain = React.useCallback(() => {
    history.push(`/issuance/create?id=${issuanceId}`)
  }, [history, issuanceId])

  const goBack = React.useCallback(() => {
    if (JSON.stringify(form?.current?.values) === JSON.stringify(form?.current?.initialValues)) {
      history.push(`/issuance/create?id=${issuanceId}`)
    } else {
      setShowCloseDialog(true)
    }
  }, [history])

  const scrollToTop = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  React.useEffect(() => {
    const listener = () => true

    window.addEventListener('beforeunload', listener)

    return () => window.removeEventListener('beforeunload', listener)
  }, [])

  React.useEffect(() => {
    if (!offer.loading && offer.data) {
      const status = offer.data?.status

      if (status) {
        switch (status) {
          case IssuanceStatus.draft:
          case IssuanceStatus.changesRequested:
          case IssuanceStatus.declined:
            if (props.edit) {
              history.replace(`/issuance/create/information?id=${issuanceId}`)
            }

            break

          case IssuanceStatus.pendingApproval:
            if (!props.edit && isAdmin) {
              history.replace(`/issuance/edit/information?id=${issuanceId}`)
            } else if (!isAdmin) {
              history.replace(`/issuance`)
            }

            break
          default:
            if (!props.edit) {
              history.replace(`/issuance/edit/information?id=${issuanceId}`)
            }
            break
        }
      }
    }
  }, [issuanceId, offer.loading, offer.data, isAdmin])

  const formIsLoading = useMemo(() => {
    const exists = Boolean(offer.issuance?.vetting?.offer)
    return exists ? !offer.data?.id : false
  }, [offer])

  if (offer.loading || formIsLoading) {
    return (
      <LoaderContainer width="100vw" height="100vh">
        <Loader />
      </LoaderContainer>
    )
  }
  if (!offer.data || vetting.error || offer.error) {
    return (
      <LoaderContainer width="100vw" height="100vh">
        <FormTitle>{offer.error || vetting.error || 'Issuance not found'}</FormTitle>
      </LoaderContainer>
    )
  }

  return (
    <FormContainer>
      <ScrollToTop onClick={scrollToTop}>
        <ChevronUp color={theme.launchpad.colors.foreground} size="20" />
      </ScrollToTop>

      <FormHeader>
        <OutlineButton background={theme.launchpad.colors.background} onClick={goBack} padding="1rem 0.75rem">
          <ArrowLeft color={theme.launchpad.colors.primary} />
        </OutlineButton>

        <FormTitle>Information</FormTitle>
      </FormHeader>

      <Formik
        innerRef={form}
        initialValues={offer.data ?? initialValues}
        onSubmit={submit}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {(formikProps) => {
          return (
            <InformationForm
              formikProps={formikProps}
              setShowConfirmDialog={setShowConfirmDialog}
              showConfirmDialog={showConfirmDialog}
              showCloseDialog={showCloseDialog}
              issuanceId={issuanceId}
              onConfirmationClose={() => setShowCloseDialog(false)}
              edit={Boolean(props.edit)}
              submit={submit}
              _submit={_submit}
              isLoading={loader.isLoading}
              offerData={offer?.data}
              initialValues={initialValues}
              smartContractStrategy={smartContractStrategy}
            />
          )
        }}
      </Formik>
    </FormContainer>
  )
}

const ScrollToTop = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 10rem;
  background: ${(props) => props.theme.launchpad.colors.primary};
  border-radius: 50%;
  display: grid;
  place-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.75rem;
`
