import {
  getCreateDSOPayload,
  getUpdateDSOPayload,
  validateTeamField
} from 'app/pages/issuance/utils'
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
import { generatePath, useHistory } from 'react-router'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export const useDSOAutosave = (
  initialDSO: DigitalSecurityOffering | undefined
) => {
  const { apiService } = useServices()
  const { replace } = useHistory()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const dsoId = getIdFromObj(initialDSO)
  const issuerId = initialDSO?.user ?? userId

  const { data: dso, isFetching, refetch } = useDSOById(dsoId, issuerId)

  const {
    watch,
    formState: { touched }
  } = useFormContext<DSOFormValues>()

  const formValues = watch()
  const [debouncedFormValues] = useDebounce(
    validateTeamField(formValues),
    3000,
    {
      equalityFn: (left, right) => {
        return isEqual(left, right)
      }
    }
  )

  const [createDSODraft, { isLoading: isCreating, isError: isCreatingError }] =
    useMutation(
      async (payload: DSORequestArgs) => {
        return await apiService.post<DigitalSecurityOffering>(
          issuanceURL.dso.create(userId),
          payload
        )
      },
      {
        onSuccess: data => {
          replace(
            generatePath(IssuanceRoute.edit, {
              dsoId: data.data._id,
              issuerId: data.data.user
            })
          )
        }
      }
    )

  const [updateDSODraft, { isLoading: isUpdating, isError: isUpdatingError }] =
    useMutation(
      async (payload: DSORequestArgs) => {
        return await apiService.put(
          issuanceURL.dso.update(issuerId, dsoId),
          payload
        )
      },
      {
        onSuccess: () => {
          void refetch()
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
      void updateDSODraft(getUpdateDSOPayload(debouncedFormValues as any))
    } else {
      void createDSODraft(getCreateDSOPayload(debouncedFormValues as any))
    }
  }, [debouncedFormValues]) // eslint-disable-line

  return {
    isSaving,
    isSaved,
    isError
  }
}
