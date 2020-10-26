import React from 'react'
import { List } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { Declaration, DeclarationTemplate } from 'v2/types/identity'
import { TypedField } from 'v2/components/form/TypedField'
import { YesOrNo } from 'v2/components/form/YesOrNo'
import { FieldsArray } from 'v2/components/form/FieldsArray'
import { FormArray } from 'v2/types/dataroomFile'
import { DeclarationItem } from 'v2/app/pages/identity/components/DeclarationItem'

export interface DeclarationFieldsProps {
  declarations: DeclarationTemplate[]
}

export const DeclarationFields: React.FC<DeclarationFieldsProps> = props => {
  const { declarations } = props
  const { control } = useFormContext<{ declarations: FormArray<Declaration> }>()

  return (
    <FieldsArray name='declarations' control={control}>
      {({ fields }) => {
        return (
          <List>
            {fields.map((field, index) => {
              const template = declarations[index]

              return (
                <DeclarationItem
                  template={template}
                  value={
                    /* @ts-ignore */
                    <TypedField
                      customRenderer
                      component={YesOrNo}
                      key={field.id}
                      control={control}
                      label={`Declaration ${index}`}
                      name={['declarations', index, 'value', template.key]}
                    />
                  }
                />
              )
            })}
          </List>
        )
      }}
    </FieldsArray>
  )
}
