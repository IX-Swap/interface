import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { generatePath, Prompt, useHistory } from 'react-router-dom'
import { Action, Location } from 'history'
import { MutationResultPair, useMutation } from 'react-query'
import { CreateModeRedirect } from 'app/components/FormStepper/FormStepper'

export interface SaveOnNavigateProps {
  mutation: MutationResultPair<any, any, any, any>
  transformData: any
  isCreateMode: boolean
  createModeRedirect: CreateModeRedirect
  activeStep?: number
}

export const SaveOnNavigate = ({
  mutation,
  transformData,
  isCreateMode,
  createModeRedirect,
  activeStep = 0
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
    return await save(
      { ...payload, step: isCreateMode ? activeStep + 1 : 0 },
      {
        onSettled: (data: any) => {
          const redirect =
            typeof createModeRedirect === 'function'
              ? createModeRedirect(data?.data.type ?? 'investor')
              : createModeRedirect
          console.log({ redirect })
          console.log({ data })
          if (
            isCreateMode &&
            redirect !== undefined &&
            nextLocation !== undefined &&
            data?.data._id !== undefined &&
            data?.data.user._id !== undefined
          ) {
            history.replace(
              generatePath(`${redirect}${nextLocation.search}`, {
                identityId: data?.data._id,
                userId: data?.data.user._id
              })
            )
          }
        }
      }
    )
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
