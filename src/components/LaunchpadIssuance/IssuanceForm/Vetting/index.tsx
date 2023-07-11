import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Formik, FormikProps } from 'formik'
import { useHistory } from 'react-router-dom'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { LoaderContainer } from 'components/LaunchpadMisc/styled'
import { VettingFormValues } from './types'
import { useAddPopup } from 'state/application/hooks'
import { useLoader, useSubmitVettingForm, useVettingFormInitialValues } from 'state/launchpad/hooks'
import { useQueryParams } from 'hooks/useParams'
import { useSaveDraftVetting } from './useSaveDraftVetting'
import { FormTitle } from '../shared/styled'
import { schema } from './schema'
import { VettingForm } from './VettingForm'
import { IssuanceStatus } from 'components/LaunchpadIssuance/types'
import { useRole } from 'state/user/hooks'

export interface IssuanceVettingFormProps {
  view?: boolean
}
export const IssuanceVettingForm = ({ view = false }: IssuanceVettingFormProps) => {
  const history = useHistory()
  const loader = useLoader(false)
  const addPopup = useAddPopup()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showCloseDialog, setShowCloseDialog] = useState(false)
  const { isAdmin } = useRole()

  const {
    objectParams: { id: issuanceId },
  } = useQueryParams<{ id: number }>(['id'])
  const initialValues = useVettingFormInitialValues(issuanceId)

  const createVetting = useSubmitVettingForm(issuanceId)

  const goMain = useCallback(() => {
    history.push(`/issuance/create?id=${issuanceId}`)
  }, [history, issuanceId])
  const form = useRef<FormikProps<VettingFormValues>>(null)
  const goBack = useCallback(() => {
    if (JSON.stringify(form?.current?.values) === JSON.stringify(form?.current?.initialValues)) {
      goMain()
    } else {
      setShowCloseDialog(true)
    }
  }, [history, issuanceId])

  const saveDraft = useSaveDraftVetting({
    issuanceId,
    vettingId: initialValues.vettingId,
    goMain,
    initialData: initialValues.data,
  })

  const submit = useCallback(
    async (values: VettingFormValues) => {
      setShowConfirmDialog(false)
      if (!initialValues.data) return

      loader.start()
      try {
        await createVetting(values, initialValues.data, initialValues.vettingId)

        addPopup({
          info: { success: true, summary: `Vetting ${initialValues.vettingId ? 'updated' : 'created'} successfully` },
        })
        goMain()
      } catch (err: any) {
        addPopup({ info: { success: false, summary: err?.toString() } })
      } finally {
        loader.stop()
      }
    },
    [initialValues.data, initialValues.vettingId]
  )

  useEffect(() => {
    const listener = () => true

    window.addEventListener('beforeunload', listener)

    return () => window.removeEventListener('beforeunload', listener)
  }, [])

  useEffect(() => {
    if (initialValues.data?.status) {
      const status = initialValues.data?.status

      if (
        !(
          [IssuanceStatus.draft, IssuanceStatus.changesRequested, IssuanceStatus.declined].includes(status) ||
          (status === IssuanceStatus.pendingApproval && isAdmin)
        )
      ) {
        history.replace(`/issuance/view/vetting?id=${issuanceId}`)
      }
    }
  }, [initialValues.data?.status, isAdmin, issuanceId])

  if (!issuanceId) {
    return null
  }

  if (initialValues.loading) {
    return (
      <LoaderContainer width="100vw" height="100vh">
        <Loader />
      </LoaderContainer>
    )
  }
  if (!initialValues.loading && initialValues.error) {
    return (
      <LoaderContainer width="100vw" height="100vh">
        <FormTitle>{initialValues.error}</FormTitle>
      </LoaderContainer>
    )
  }

  return (
    <Formik
      initialValues={initialValues.data!}
      onSubmit={submit}
      validationSchema={schema}
      enableReinitialize={true}
      innerRef={form}
    >
      {(formikProps) => (
        <VettingForm
          formikProps={formikProps}
          view={view}
          showConfirmDialog={showConfirmDialog}
          setShowConfirmDialog={setShowConfirmDialog}
          issuanceId={issuanceId}
          vettingId={initialValues?.vettingId}
          initialValues={initialValues?.data}
          showCloseDialog={showCloseDialog}
          setShowCloseDialog={setShowCloseDialog}
          goBack={goBack}
          saveDraft={saveDraft}
          isLoading={loader.isLoading}
        />
      )}
    </Formik>
  )
}
