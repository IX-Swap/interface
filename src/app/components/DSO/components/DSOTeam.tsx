import React from 'react'
import { Grid } from '@material-ui/core'
import { FieldsArray } from 'components/form/FieldsArray'
import { DSOContainer } from 'app/components/DSO/components/DSOContainer'
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
    <DSOContainer title='Team' item xs={12}>
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
    </DSOContainer>
  )
}
