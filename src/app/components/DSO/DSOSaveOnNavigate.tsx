import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { generatePath, Prompt, useHistory } from 'react-router-dom'
import { Action, Location } from 'history'
import { MutationResultPair, useMutation } from 'react-query'
import { RedirectOnSaveArgs } from 'types/dso'

export interface SaveOnNavigateProps {
  mutation: MutationResultPair<any, any, any, any>
  transformData: any
  isCreateMode: boolean
  activeStep?: number
  redirectOnSave?: (args: RedirectOnSaveArgs) => void
  overRideStep?: boolean
  redirectFunction?: any
}

export const DSOSaveOnNavigate = ({
  mutation,
  transformData,
  redirectFunction,
  activeStep = 0,
  isNew
}: any) => {
  const { watch, formState } = useFormContext()
  const values = watch()
  const [save] = mutation
  const history = useHistory()
  const [nextLocation, setNextLocation] = useState<
    Location<unknown> | undefined
  >(undefined)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const payload = transformData(values)

  const handleSave = async () => {
    // eslint-disable-next-line
    return await save(
      {
        ...payload
      },
      {
        onSettled: (data: any) => {
          console.log('data', data)
          if (
            data !== undefined &&
            nextLocation != null &&
            nextLocation.search !== ''
          ) {
            setIsRedirecting(true)
            const redirect = redirectFunction(data?._id)
            history.replace(
              generatePath(redirect, {
                issuerId: data?.user._id,
                dsoId: data?._id
              })
            )
            setIsRedirecting(false)
          }
        }
      }
    )
  }

  const [saveForm] = useMutation(handleSave)

  const saveOnNavigate = (location: Location<unknown>, action: Action) => {
    if (location?.search !== '') {
      setNextLocation(location)

      if (!isRedirecting) {
        void saveForm()
      }

      return true
    }

    return false
  }

  return <Prompt when={formState.isDirty} message={saveOnNavigate} />
}
