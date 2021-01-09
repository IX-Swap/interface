import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import { FieldsArray } from 'components/form/FieldsArray'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { DSOTeamMember } from 'app/components/DSO/components/DSOTeamMember'
import { DSOTeamAddButton } from 'app/components/DSO/components/DSOTeamAddButton'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'

const fieldName = 'team'

export const DSOTeam = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <Grid item container spacing={3} direction='column'>
      <Grid item>
        <Box pb={0.5} borderBottom={`1px solid #EDEDED`}>
          <Typography variant='h2'>Team Members</Typography>
        </Box>
      </Grid>
      <Grid item container>
        <FieldsArray name={fieldName} control={control}>
          {({ fields, append, remove }) => (
            <Grid container direction='column'>
              <Grid item>
                {fields.map((value, index) => (
                  <DSOTeamMember
                    key={value.id}
                    defaultValue={fields[index] as any}
                    fieldId={value.id}
                    index={index}
                    remove={remove}
                  />
                ))}
              </Grid>
              <Grid
                item
                style={{ marginTop: 20 }}
                container
                justify='flex-end'
                alignItems='center'
              >
                <FormError name={fieldName} render={TextError} />
                <DSOTeamAddButton append={append} />
              </Grid>
            </Grid>
          )}
        </FieldsArray>
      </Grid>
    </Grid>
  )
}
