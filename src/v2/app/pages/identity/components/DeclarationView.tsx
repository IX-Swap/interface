import React from 'react'
import { Declaration, DeclarationTemplate } from 'v2/types/identity'
import { List, Typography } from '@material-ui/core'
import { DeclarationItem } from 'v2/app/pages/identity/components/DeclarationItem'

export interface DeclarationViewProps {
  declarations: DeclarationTemplate[]
  data: Declaration[]
}

export const DeclarationView = (props: DeclarationViewProps) => {
  const { declarations, data } = props

  return (
    <List>
      {data.map((item, index) => {
        const template = declarations[index]

        return (
          <DeclarationItem
            key={index}
            template={template}
            value={
              <Typography variant='subtitle1' align='right'>
                {data[index][template.key]}
              </Typography>
            }
          />
        )
      })}
    </List>
  )
}
