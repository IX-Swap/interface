import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { generatePath, Prompt, useHistory } from 'react-router-dom'
import { Action, Location } from 'history'
import { MutationResultPair, useMutation } from 'react-query'

export interface SaveOnNavigateProps {
  mutation: MutationResultPair<any, any, any, any>
  transformData: any
  isCreateMode: boolean
  createModeRedirect?: string
}

export const SaveOnNavigate = ({
  mutation,
  transformData,
  isCreateMode,
  createModeRedirect
}: SaveOnNavigateProps) => {
  const { watch, formState } = useFormContext()
  const values = watch()
  const [save] = mutation
  const history = useHistory()
  const [nextLocation, setNextLocation] = useState<
    Location<unknown> | undefined
  >(undefined)

  isCreateMode && console.log('create mode')

  const handleSave = async () => {
    const payload = transformData(values)
    return await save(payload, {
      onSettled: (data: any) => {
        console.log(data)
        console.log({ nextLocation })
        if (
          isCreateMode &&
          createModeRedirect !== undefined &&
          nextLocation !== undefined &&
          data?.data._id !== undefined &&
          data?.data.user._id !== undefined
        ) {
          console.log('is being redirected', createModeRedirect)
          history.replace(
            generatePath(`${createModeRedirect}${nextLocation.search}`, {
              identityId: data?.data._id,
              userId: data?.data.user._id
            })
          )
        }
        console.log('settled')
      }
    })
  }

  const [saveForm] = useMutation(handleSave)

  const saveOnNavigate = (location: Location<unknown>, action: Action) => {
    setNextLocation(location)
    void saveForm()
    if (isCreateMode) {
      return false
    }
    return true
  }

  return <Prompt when={formState.isDirty} message={saveOnNavigate} />
}
