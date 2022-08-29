import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import { FieldsArray } from 'components/form/FieldsArray'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { DSOTeamMember } from 'app/components/DSO/components/DSOTeamMember'
import { DSOChapterAddButton } from 'app/components/DSO/components/DSOChapterAddButton'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'

const fieldName = 'team'

export const DSOTeam = () => {
  const { control, getValues, setValue } = useFormContext<DSOFormValues>()

  useEffect(() => {
    if (getValues(fieldName) === undefined) {
      setValue(fieldName, [{}])
    }
  }, []) //eslint-disable-line

  return (
    <Grid item>
      <Grid container spacing={3} direction='column'>
        <Grid item>
          <FieldsArray name={fieldName} control={control}>
            {({ fields, append, remove }) => (
              <Grid container direction='column' spacing={3}>
                <Grid item>
                  <Grid container direction='column' spacing={5}>
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
    </Grid>
  )
}
