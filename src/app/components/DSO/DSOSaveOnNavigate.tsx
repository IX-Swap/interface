import React from 'react'
import { useFormContext } from 'react-hook-form'
import { generatePath, useHistory } from 'react-router-dom'
import { MutationResultPair } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { Button } from '@mui/material'
import { DSOStepperStep } from './DSOFormStepper'

export interface SaveOnNavigateProps {
  mutation: MutationResultPair<any, any, any, any>
  transformData: any
  isNew?: boolean
  activeStep?: number
  overRideStep?: boolean
  redirectFunction: (dsoId: string) => string
  isSaveDraft?: boolean
  move: DSOStepperMovement
  stepsList: DSOStepperStep[]
  nextCallback: (nextStep: number) => void
}

export type DSOStepperMovement = 'forward' | 'backward' | null

export const DSOSaveOnNavigate = ({
  mutation,
  transformData,
  redirectFunction,
  activeStep = 0,
  stepsList,
  move = 'forward',
  nextCallback
}: SaveOnNavigateProps) => {
  const { watch } = useFormContext()
  const values = watch()
  const [save] = mutation
  const history = useHistory()
  const payload = transformData(values)

  const getNewActiveStep = (): number => {
    if (move === 'forward') {
      return activeStep + 1
    }
    if (move === 'backward') {
      return activeStep - 1
    }

    return activeStep
  }

  const handleSave = async () => {
    // eslint-disable-next-line
    console.log(...payload, 'payload')
    return await save(
      {
        ...payload
      },
      {
        onSettled: (data: any) => {
          if (data !== undefined) {
            const redirect: string = redirectFunction(data.data._id)
            const newActiveStep = getNewActiveStep()
            const search: string = `?step=${stepsList[
              newActiveStep
            ].label.replace(' ', '+')}`

            history.replace(
              generatePath(`${redirect}${search}`, {
                issuerId:
                  typeof data.data.user === 'string'
                    ? data.data.user
                    : getIdFromObj(data.data.user),
                dsoId: data.data._id
              })
            )
          }
        }
      }
    )
  }

  if (move === 'backward') {
    return (
      <Button
        fullWidth
        variant='outlined'
        color='primary'
        onClick={() => {
          void handleSave()
          nextCallback(getNewActiveStep())
        }}
        disableElevation
        size='large'
      >
        Back
      </Button>
    )
  }

  return (
    <Button
      fullWidth
      variant='contained'
      color='primary'
      onClick={() => {
        void handleSave()
        nextCallback(getNewActiveStep())
      }}
      size='large'
    >
      Next
    </Button>
  )
}
