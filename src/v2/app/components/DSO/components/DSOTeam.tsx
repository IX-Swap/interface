import React from 'react'
import { Grid } from '@material-ui/core'
import { FieldsArray } from 'v2/components/form/FieldsArray'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'
import { DSOTeamMember } from 'v2/app/components/DSO/components/DSOTeamMember'
import { DSOTeamAddButton } from 'v2/app/components/DSO/components/DSOTeamAddButton'

export const DSOTeam = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Team' item xs={12}>
      <FieldsArray name='team' control={control}>
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
            <Grid item>
              <DSOTeamAddButton append={append} />
            </Grid>
          </Grid>
        )}
      </FieldsArray>
    </DSOContainer>
  )
}
