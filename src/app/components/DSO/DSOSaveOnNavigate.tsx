import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { generatePath, Prompt, useHistory } from 'react-router-dom'
import { Action, Location } from 'history'
import { MutationResultPair, useMutation } from 'react-query'
import { RedirectOnSaveArgs } from 'types/dso'
import { getIdFromObj } from 'helpers/strings'

export interface SaveOnNavigateProps {
  mutation: MutationResultPair<any, any, any, any>
  transformData: any
  isCreateMode: boolean
  activeStep?: number
  redirectOnSave?: (args: RedirectOnSaveArgs) => void
  overRideStep?: boolean
  redirectFunction: (dsoId: string) => string
  isSaveDraft?: boolean
}

export const DSOSaveOnNavigate = ({
  mutation,
  transformData,
  redirectFunction
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
          setIsRedirecting(true)

          if (
            data !== undefined &&
            nextLocation != null &&
            nextLocation.search !== ''
          ) {
            const redirect: string = redirectFunction(data.data._id)
            history.replace(
              generatePath(`${redirect}${nextLocation.search}`, {
                issuerId:
                  typeof data.data.user === 'string'
                    ? data.data.user
                    : getIdFromObj(data.data.user),
                dsoId: data.data._id
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
    if (location.search !== '') {
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
