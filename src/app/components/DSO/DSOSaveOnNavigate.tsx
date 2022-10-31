import React from 'react'
import { useFormContext } from 'react-hook-form'
import { generatePath, useHistory } from 'react-router-dom'
import { MutationResultPair } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { Button } from '@mui/material'
import { DSOStepperStep } from './DSOFormStepper'
import { useDSOFormContext } from './DSOFormContext'

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
  const { watch, errors } = useFormContext()
  const { stepValues, setStepValues } = useDSOFormContext()
  const error = errors
  const values = watch()
  const [save] = mutation
  const history = useHistory()
  const payload = transformData(values)
  const getNewActiveStep = (): number => {
    if (move === 'forward') {
      const obj = error
      if (
        activeStep === 0 &&
        Object.keys(obj).length !== 0 &&
        obj.constructor === Object
      ) {
        console.log('valdition', activeStep)
        console.log(
          Object.keys(obj).length !== 0 && obj.constructor === Object,
          'kkjkjkj'
        )
      } else {
        return activeStep + 1
      }
    }
    if (move === 'backward') {
      return activeStep - 1
    }

    return activeStep
  }

  // const checkData =()=>{
  //   console.log("values",values)
  //   console.log("payload",payload)

  //   const isEmpty = !Object.values(values).some(x => (x !== null && x !== ''));

  //   if(isEmpty){
  //      console.log("false")
  //      return false
  //   }
  //    console.log("true");
  //    return true;
  // }
  const handleSave = async () => {
    const newValues = [...stepValues]
    newValues[activeStep] = { values, errors: { ...errors } }

    setStepValues(newValues)
    // eslint-disable-next-line
    const obj = error
    if (
      activeStep === 0 &&
      Object.keys(obj).length !== 0 &&
      obj.constructor === Object
    ) {
    } else {
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
      // disabled={checkData()}
    >
      Next
    </Button>
  )
}
