import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Prompt, useHistory } from 'react-router-dom'
import { Action, Location } from 'history'
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
  const [nextLocation, setNextLocation] = useState<
    Location<unknown> | undefined
  >(undefined)

  const handleSave = async () => {
    const payload = transformData(values)
    return await save(payload, {
      onSuccess: () => {
        if (nextLocation !== undefined) {
          history.push(nextLocation)
        }
      }
    })
  }

  const [saveForm] = useMutation(handleSave)

  const saveOnNavigate = (location: Location<unknown>, action: Action) => {
    setNextLocation(location)
    void saveForm()
    if (action === 'REPLACE') {
      return false
    }
    return true
  }

  return <Prompt when={formState.isDirty} message={saveOnNavigate} />
}
