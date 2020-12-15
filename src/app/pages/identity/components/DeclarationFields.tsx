import React from 'react'
import { List } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { YesOrNo } from 'components/form/YesOrNo'
import { DeclarationItem } from 'app/pages/identity/components/DeclarationItem'
import { IdentityType } from 'app/pages/identity/utils'
import {
  AllDeclarations,
  corporateDeclarationsTemplate,
  individualDeclarationsTemplate
} from 'app/pages/identity/const/declarations'

export interface DeclarationFieldsProps {
  type: IdentityType
}

export interface DeclarationFieldsValues {
  declarations: AllDeclarations
}

export const DeclarationFields = (props: DeclarationFieldsProps) => {
  const { type } = props
  const { control } = useFormContext<DeclarationFieldsValues>()
  const declarations =
    type === 'individual'
      ? individualDeclarationsTemplate
      : corporateDeclarationsTemplate

  return (
    <List>
      {Object.entries(declarations).map(([key, template]) => {
        return (
          <DeclarationItem
            template={template}
            value={
              /* @ts-ignore */
              <TypedField
                customRenderer
                component={YesOrNo}
                key={key}
                control={control}
                label={key}
                name={['declarations', template.key]}
              />
            }
          />
        )
      })}
    </List>
  )
}
