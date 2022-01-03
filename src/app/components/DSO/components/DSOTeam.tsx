import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { FieldsArray } from 'components/form/FieldsArray'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { DSOTeamMember } from 'app/components/DSO/components/DSOTeamMember'
import { DSOChapterAddButton } from 'app/components/DSO/components/DSOChapterAddButton'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

const fieldName = 'team'

export const DSOTeam = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <Grid item>
      <Box paddingY={4}>
        <Grid container spacing={3} direction='column'>
          <Grid item>
            <FormSectionHeader title='Team Members' />
          </Grid>
          <Grid item>
            <FieldsArray name={fieldName} control={control}>
              {({ fields, append, remove }) => (
                <Grid container direction='column' spacing={3}>
                  <Grid item>
                    <Grid container direction='column' spacing={3}>
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
                  </Grid>
                  <Grid
                    item
                    container
                    justifyContent='flex-end'
                    alignItems='center'
                  >
                    <FormError name={fieldName} render={TextError} />
                    <DSOChapterAddButton append={append} />
                  </Grid>
                </Grid>
              )}
            </FieldsArray>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
