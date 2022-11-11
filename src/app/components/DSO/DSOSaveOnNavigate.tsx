import React from 'react'
import { useFormContext } from 'react-hook-form'
import { generatePath, useHistory, useLocation } from 'react-router-dom'
import { MutationResultPair } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { Button } from '@mui/material'
import { DSOStepperStep } from './DSOFormStepper'
import { useDSOFormContext } from './DSOFormContext'
import { useParams } from 'react-router'
import { isEmpty } from 'lodash'

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
  setCompleted: any
  removeComplete: any
  completed: number[]
  removeCreateComplete: any
  setCreateComplete: any
  createComplete: any
}

export type DSOStepperMovement = 'forward' | 'backward' | null

export const DSOSaveOnNavigate = ({
  mutation,
  transformData,
  redirectFunction,
  activeStep = 0,
  stepsList,
  move = 'forward',
  nextCallback,
  setCompleted,
  removeComplete,
  completed,
  removeCreateComplete,
  setCreateComplete,
  createComplete
}: SaveOnNavigateProps) => {
  const { watch, errors, trigger } = useFormContext()
  const { stepValues, setStepValues } = useDSOFormContext()
  const { dsoId, issuerId } = useParams()
  const location = useLocation()

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
    const newValues = [...stepValues]
    await trigger()
    newValues[activeStep] = { values, errors: { ...errors } }
    setStepValues(newValues)
    // eslint-disable-next-line
    if (!isEmpty(errors)) {
      if (completed.includes(activeStep)) {
        removeComplete(activeStep, completed)
      }
      const newActiveStep = getNewActiveStep()
      const search: string = `?step=${stepsList[newActiveStep].label.replace(
        ' ',
        '+'
      )}`
      if (dsoId !== undefined && issuerId !== undefined) {
        const redirect: string = redirectFunction(dsoId)
        history.replace(
          generatePath(`${redirect}${search}`, {
            issuerId,
            dsoId
          })
        )
      } else {
        history.replace(generatePath(`${location.pathname}${search}`))
      }
    } else {
      return await save(
        {
          ...payload
        },
        {
          onSettled: async (data: any) => {
            if (data !== undefined) {
              setCompleted()
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
          setCreateComplete()
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
        setCreateComplete()
      }}
      size='large'
      // disabled={checkData()}
    >
      Next
    </Button>
  )
}
