import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { isDSOLive, transformDSOToFormValues } from 'app/components/DSO/utils'
import { Grid } from '@material-ui/core'
import { Form } from 'components/form/Form'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getOfferingName } from 'helpers/strings'
import { getDSOValidationSchema } from 'validation/dso'
import { DSOSidebar } from 'app/components/DSO/components/DSOSidebar'
import { DSOFormActions } from 'app/components/DSO/components/DSOFormActions'
import { DSOFormFields } from 'app/components/DSO/components/DSOFormFields'

export interface DSOFormProps {
  data?: DigitalSecurityOffering
  isNew?: boolean
}

export const DSOForm = (props: DSOFormProps) => {
  const { data, isNew = false } = props
  const isLive = isDSOLive(data)

  useSetPageTitle(getOfferingName(data))

  return (
    <Form
      validationSchema={getDSOValidationSchema(isNew, isLive)}
      defaultValues={transformDSOToFormValues(data)}
      data-testid='dso-form'
    >
      <Grid container>
        <Grid item lg={9} container direction='column'>
          <DSOFormFields isNew={isNew} isLive={isLive} />
        </Grid>

        <Grid item lg={3}>
          <DSOSidebar isNew dso={data} footer={<DSOFormActions dso={data} />} />
        </Grid>
      </Grid>
    </Form>
  )
}
