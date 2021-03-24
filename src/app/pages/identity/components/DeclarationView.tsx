import React from 'react'
import { List, Typography } from '@material-ui/core'
import { DeclarationItem } from 'app/pages/identity/components/DeclarationItem'
import {
  CorporateDeclarations,
  corporateDeclarationsTemplate,
  IndividualDeclarations,
  individualDeclarationsTemplate
} from 'app/pages/identity/const/declarations'
import { IdentityType } from 'app/pages/identity/utils'

export interface DeclarationViewProps {
  data: any
  type: IdentityType
}

type DeclarationKey = keyof (IndividualDeclarations | CorporateDeclarations)

export const DeclarationView = (props: DeclarationViewProps) => {
  const { type } = props
  const templates =
    type === 'individual'
      ? individualDeclarationsTemplate
      : corporateDeclarationsTemplate
  const declarations = [] as Array<[string, string]>

  return (
    <List>
      {declarations.map(([key, value]) => {
        const template = templates[key as DeclarationKey]

        return (
          <DeclarationItem
            key={key}
            template={template}
            value={
              <Typography variant='subtitle1' align='right'>
                {value}
              </Typography>
            }
          />
        )
      })}
    </List>
  )
}
