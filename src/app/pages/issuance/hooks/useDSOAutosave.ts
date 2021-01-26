import { transformDSOFormValuesToRequestArgs } from 'app/pages/issuance/utils'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  DigitalSecurityOffering,
  DSOFormValues,
  DSORequestArgs
} from 'types/dso'
import { useMutation } from 'react-query'
import { useServices } from 'hooks/useServices'
import { issuanceURL } from 'config/apiURL'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { useDebounce } from 'use-debounce'
import isEqual from 'lodash/isEqual'
import { transformDSOToFormValues } from 'app/components/DSO/utils'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useIssuanceRouter } from 'app/pages/issuance/router'

export const useDSOAutosave = (
  initialDSO: DigitalSecurityOffering | undefined
) => {
  const { apiService, snackbarService } = useServices()
  const { replace } = useIssuanceRouter()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const dsoId = getIdFromObj(initialDSO)

  const { data: dso, isFetching, refetch } = useDSOById(dsoId, initialDSO?.user)

  const {
    watch,
    formState: { touched }
  } = useFormContext<DSOFormValues>()

  const formValues = watch()
  const [debouncedFormValues] = useDebounce(formValues, 3000, {
    equalityFn: (left, right) => {
      return isEqual(left, right)
    }
  })

  const [
    createDSODraft,
    { isLoading: isCreating, isError: isCreatingError }
  ] = useMutation(
    async (payload: DSORequestArgs) => {
      return await apiService.post<DigitalSecurityOffering>(
        issuanceURL.dso.create(userId),
        payload
      )
    },
    {
      onSuccess: data => {
        replace('edit', { dsoId: data.data._id })
      },
      onError: (e: any) => {
        void snackbarService.showSnackbar(e.message, 'error')
      }
    }
  )

  const [
    updateDSODraft,
    { isLoading: isUpdating, isError: isUpdatingError }
  ] = useMutation(
    async (payload: DSORequestArgs) => {
      return await apiService.put(
        issuanceURL.dso.update(userId, dsoId),
        payload
      )
    },
    {
      onSuccess: () => {
        void refetch()
      },
      onError: (e: any) => {
        void snackbarService.showSnackbar(e.message, 'error')
      }
    }
  )

  const savedDSOFormValues = transformDSOToFormValues(dso)
  const wasSaved = dso !== undefined
  const isFormValuesEqualToSaved =
    wasSaved && isEqual(debouncedFormValues, savedDSOFormValues)
  const isDirty = Object.keys(touched).length > 0
  const isSaving = isFetching || isCreating || isUpdating
  const isTouched = wasSaved ? isDirty && !isFormValuesEqualToSaved : isDirty
  const isError = isUpdatingError || isCreatingError

  const [isSaved, setIsSaved] = useState(wasSaved)

  useEffect(() => {
    /* 
       Problem: useFieldArray hook doesn't keep empty array in the form object
       instead it deletes the field altogether.
       This hack is needed to make sure that if there are no documents or team members
       in the DSO object – comparing function would still work properly.
    */
    const formValuesHacked = {
      ...formValues,
      documents: formValues.documents ?? [],
      team: formValues.team ?? []
    }
    const areEqual = isEqual(formValuesHacked, savedDSOFormValues)
    // TODO: fix the problem with document uploading (form doesn't get updated upon successful document upload)

    setIsSaved(areEqual)
  }, [formValues, savedDSOFormValues])

  useEffect(() => {
    if (!isTouched) return

    if (wasSaved) {
      const {
        network,
        issuerName,
        tokenName,
        tokenSymbol,
        ...values
      } = debouncedFormValues

      void updateDSODraft({
        ...transformDSOFormValuesToRequestArgs(values as any) // TODO: update transform function to avoid this kind of hacks
      })
    } else {
      void createDSODraft({
        ...transformDSOFormValuesToRequestArgs({
          ...debouncedFormValues
        })
      })
    }
  }, [debouncedFormValues]) // eslint-disable-line

  return {
    isSaving,
    isSaved,
    isError
  }
}
