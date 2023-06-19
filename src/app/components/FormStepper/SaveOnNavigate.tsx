import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { generatePath, Prompt, useHistory } from 'react-router-dom'
import { Action, Location } from 'history'
import { MutationResultPair, useMutation } from 'react-query'
import { CreateModeRedirect } from 'app/components/FormStepper/FormStepper'
import { RedirectOnSaveArgs } from 'types/dso'

export interface SaveOnNavigateProps {
  mutation: MutationResultPair<any, any, any, any>
  transformData: any
  isCreateMode: boolean
  createModeRedirect: CreateModeRedirect
  activeStep?: number
  redirectOnSave?: (args: RedirectOnSaveArgs) => void
  overRideStep?: boolean
}

export const SaveOnNavigate = ({
  mutation,
  transformData,
  isCreateMode,
  createModeRedirect,
  activeStep = 0,
  redirectOnSave,
  overRideStep = false
}: SaveOnNavigateProps) => {
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
    return await save(
      {
        ...payload,
        step: overRideStep
          ? payload.step
          : isCreateMode
          ? activeStep + 1
          : activeStep
      },
      {
        onSettled: (data: any) => {
          setIsRedirecting(true)

          if (redirectOnSave !== undefined) {
            if (data !== undefined) {
              redirectOnSave({
                createModeRedirect,
                data,
                nextLocation,
                setIsRedirecting
              })
            }
          } else {
            const redirect =
              typeof createModeRedirect === 'function'
                ? createModeRedirect(data?.data.type ?? 'corporate')
                : createModeRedirect
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
              setIsRedirecting(false)
            }
          }
        }
      }
    )
  }

  const [saveForm] = useMutation(handleSave)

  const saveOnNavigate = (location: Location<unknown>, action: Action) => {
    console.log('saveOnNavigate')
    setNextLocation(location)

    if (isRedirecting && isCreateMode) {
      return true
    }

    if (!isRedirecting) {
      console.log('saveForm')
      void saveForm()
    }

    if (isCreateMode) {
      return false
    }

    return true
  }

  return <Prompt when={formState.isDirty} message={saveOnNavigate} />
}
