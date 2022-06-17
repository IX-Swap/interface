import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Prompt, useHistory } from 'react-router-dom'
import { Location } from 'history'
import { MutationResultPair, useMutation } from 'react-query'

export interface SaveOnNavigateProps {
  mutation: MutationResultPair<any, any, any, any>
  transformData: any
}

export const SaveOnNavigate = ({
  mutation,
  transformData
}: SaveOnNavigateProps) => {
  const { watch, formState } = useFormContext()
  const values = watch()
  const [save] = mutation
  const history = useHistory()

  const handleSave = async () => {
    const payload = transformData(values)
    return await save(payload, {})
  }

  const [saveForm] = useMutation(handleSave)

  const saveOnNavigate = (location: Location<unknown>) => {
    if (history.location.search !== location.search) {
      void saveForm()
      return true
    }

    return false
  }

  return <Prompt when={formState.isDirty} message={saveOnNavigate} />
}
