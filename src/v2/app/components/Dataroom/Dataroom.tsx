import { Grid } from '@material-ui/core'
import React from 'react'
import { useTypedForm } from 'v2/components/form/useTypedForm'

export interface DataroomProps {
  name: string
  fieldRenderer: (field: any, index: number) => JSX.Element
}

export const Dataroom = <FormType extends Record<string, any>>(
  props: DataroomProps
) => {
  const { name, fieldRenderer } = props
  const { FieldsArray } = useTypedForm<FormType>()

  return (
    <FieldsArray name={name}>
      {({ fields, append, remove }) => (
        <Grid container>{fields.map(fieldRenderer)}</Grid>
      )}
    </FieldsArray>
  )
}
