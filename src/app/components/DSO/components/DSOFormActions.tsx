import React from 'react'
import { Button } from '@material-ui/core'
import { useCreateDSO } from 'app/pages/issuance/hooks/useCreateDSO'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { transformDSOFormValuesToRequestArgs } from 'app/pages/issuance/utils'
import { transformDSOToFormValues } from 'app/components/DSO/utils'
import { IssuanceRoute } from 'app/pages/issuance/router'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

export interface DSOFormActionsProps {
  isNew: boolean
}

export const DSOFormActions = (props: DSOFormActionsProps) => {
  const { isNew } = props
  const [createDSO, { isLoading }] = useCreateDSO()
  const { getValues, reset, formState } = useFormContext<DSOFormValues>()

  const handleClear = () => {
    reset(transformDSOToFormValues(undefined))
  }

  const handleSaveAsPreview = () => {
    void createDSO(
      transformDSOFormValuesToRequestArgs({ ...getValues(), status: 'Draft' })
    )
  }

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        disableElevation
        component={AppRouterLinkComponent}
        to={IssuanceRoute.view}
      >
        Preview
      </Button>

      {isNew && (
        <Button
          variant='outlined'
          color='primary'
          onClick={handleSaveAsPreview}
          disabled={isLoading}
        >
          Finish Later
        </Button>
      )}

      <br />

      {isNew && (
        <Button
          color='primary'
          disabled={!formState.isDirty}
          onClick={handleClear}
        >
          Clear
        </Button>
      )}
    </>
  )
}
