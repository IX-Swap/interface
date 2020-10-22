import React from 'react'
import { Typography, List, Grid, ListItem, Divider } from '@material-ui/core'
import { useFieldArray } from 'react-hook-form'
import useStyles from './Declaration.styles'
import { DeclarationTemplate } from 'v2/types/identity'
import { useIndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { DeclarationHeader } from 'v2/app/pages/identity/components/DeclarationHeader'
import { DeclarationFooter } from 'v2/app/pages/identity/components/DeclarationFooter'

export interface DeclarationProps {
  declarations: DeclarationTemplate[]
  isEditing: boolean
}

export const Declaration: React.FC<DeclarationProps> = props => {
  const { declarations, isEditing } = props
  const { YesOrNo } = useIndividualIdentityForm()
  const classes = useStyles()
  const { fields } = useFieldArray({ name: 'declarations' })

  return (
    <List>
      {fields.map((field, index) => {
        const {
          key,
          lastLine,
          subLevel,
          content,
          header,
          footer
        } = declarations[index]

        return (
          <React.Fragment key={index}>
            {header !== undefined ? (
              <DeclarationHeader header={header} />
            ) : null}
            <ListItem>
              <Grid container alignItems='center' spacing={1}>
                <Grid item xs={10}>
                  <Typography
                    className={subLevel === true ? classes.subLevel : ''}
                  >
                    <span dangerouslySetInnerHTML={{ __html: content }} />
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <YesOrNo
                    label={''}
                    key={field.id}
                    name={['declarations', index, key] as any} // TODO: think of the fix for this
                    inputProps={{ disabled: !isEditing }}
                  />
                </Grid>
              </Grid>
            </ListItem>
            {footer !== undefined ? (
              <DeclarationFooter footer={footer} classes={classes} />
            ) : null}
            {lastLine === true ? (
              <Divider light style={{ marginTop: 15, marginBottom: 15 }} />
            ) : null}
          </React.Fragment>
        )
      })}
    </List>
  )
}
