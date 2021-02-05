import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { isDSOLive, transformDSOToFormValues } from 'app/components/DSO/utils'
import { Grid } from '@material-ui/core'
import { Form } from 'components/form/Form'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getOfferingName } from 'helpers/strings'
import { getDSOValidationSchema } from 'validation/dso'
import { DSOSidebar } from 'app/components/DSO/components/DSOSidebar'
import { DSOPreview } from 'app/components/DSO/DSOPreview/DSOPreview'
import { useToggleValue } from 'hooks/useToggleValue'
import { DSOFormActions } from 'app/components/DSO/components/DSOFormActions'
import { DSOFormFields } from 'app/components/DSO/components/DSOFormFields'

export interface DSOFormProps {
  data?: DigitalSecurityOffering
  isNew?: boolean
}

export const DSOForm = (props: DSOFormProps) => {
  const { data, isNew = false } = props
  const isLive = isDSOLive(data)
  const [isPreviewMode, togglePreviewMode] = useToggleValue()
  const showPreview = isPreviewMode && data !== undefined

  useSetPageTitle(getOfferingName(data))

  return (
    <Form
      validationSchema={getDSOValidationSchema(isNew, isLive)}
      defaultValues={transformDSOToFormValues(data)}
      data-testid='dso-form'
    >
      <Grid container>
        <Grid item lg={9} container direction='column'>
          {showPreview ? (
            <DSOPreview data={data as DigitalSecurityOffering} />
          ) : (
            <DSOFormFields isNew={isNew} isLive={isLive} />
          )}
        </Grid>

        <Grid item lg={3}>
          <DSOSidebar
            dso={data}
            footer={
              <DSOFormActions
                dso={data}
                togglePreviewMode={togglePreviewMode}
                isPreviewMode={isPreviewMode}
              />
            }
          />
        </Grid>
      </Grid>
    </Form>
  )
}
