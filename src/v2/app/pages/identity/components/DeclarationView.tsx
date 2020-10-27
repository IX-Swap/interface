import React from 'react'
import { Declaration } from 'v2/types/identity'
import { List, Typography } from '@material-ui/core'
import { DeclarationItem } from 'v2/app/pages/identity/components/DeclarationItem'
import {
  CorporateDeclarations,
  corporateDeclarationsTemplate,
  IndividualDeclarations,
  individualDeclarationsTemplate
} from 'v2/app/pages/identity/const/declarations'
import { IdentityType, formatDeclarations } from 'v2/app/pages/identity/utils'

export interface DeclarationViewProps {
  data: Declaration[]
  type: IdentityType
}

type DeclarationKey = keyof (IndividualDeclarations | CorporateDeclarations)

export const DeclarationView = (props: DeclarationViewProps) => {
  const { type, data } = props
  const templates =
    type === 'individual'
      ? individualDeclarationsTemplate
      : corporateDeclarationsTemplate
  const declarations = Object.entries(formatDeclarations(type, data))

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
