import React from 'react'
import { Typography, List, Grid, ListItem, Divider } from '@material-ui/core'
import { useFieldArray, useFormContext } from 'react-hook-form'
import useStyles from './Declaration.styles'
import { Declaration, DeclarationTemplate } from 'v2/types/identity'
import { useIndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { DeclarationHeader } from 'v2/app/pages/identity/components/DeclarationHeader'
import { DeclarationFooter } from 'v2/app/pages/identity/components/DeclarationFooter'
import { EditableField } from 'v2/components/form/EditableField'
import { YesOrNo } from 'v2/components/form/YesOrNo'
import { FieldsArray } from 'v2/components/form/FieldsArray'
import { FormArray } from 'v2/types/dataroomFile'

export interface DeclarationsProps {
  declarations: DeclarationTemplate[]
}

export const Declarations: React.FC<DeclarationsProps> = props => {
  const { declarations } = props
  const { control } = useFormContext<{ declarations: FormArray<Declaration> }>()
  const classes = useStyles()

  return (
    <FieldsArray name='declarations' control={control}>
      {({ fields }) => {
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
                          <span
                            dangerouslySetInnerHTML={{
                              __html: content
                            }}
                          />
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        {/* @ts-ignore */}
                        <EditableField
                          customRenderer={YesOrNo}
                          key={field.id}
                          control={control}
                          label={`Declaration ${index}`}
                          name={['declarations', index, 'value', key]}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  {footer !== undefined ? (
                    <DeclarationFooter footer={footer} classes={classes} />
                  ) : null}
                  {lastLine === true ? (
                    <Divider
                      light
                      style={{ marginTop: 15, marginBottom: 15 }}
                    />
                  ) : null}
                </React.Fragment>
              )
            })}
          </List>
        )
      }}
    </FieldsArray>
  )
}
