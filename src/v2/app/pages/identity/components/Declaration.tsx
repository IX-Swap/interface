import React from 'react'
import { Typography, List, Grid, ListItem, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { DeclarationTemplate } from 'v2/types/identity'
import { useFieldArray } from 'react-hook-form'
import { useIndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'

const useStyles = makeStyles(() => ({
  pageTitle: {
    lineHeight: '2em'
  },
  subLevel: {
    marginLeft: '3em'
  }
}))

interface DeclarationProps {
  declarations: DeclarationTemplate[]
  isEditing: boolean
}

export const Declaration = (props: DeclarationProps): JSX.Element => {
  const { declarations, isEditing } = props
  const { YesOrNo } = useIndividualIdentityForm()
  const classes = useStyles()
  const { fields } = useFieldArray({
    name: 'declarations'
  })

  return (
    <List>
      {fields.map((field, index) => {
        const items = []
        const {
          key,
          lastLine,
          subLevel,
          content,
          header,
          footer
        } = declarations[index]

        if (header !== undefined) {
          items.push(
            <ListItem key={header}>
              <Grid container alignItems='center' spacing={1}>
                <Grid item xs={10}>
                  <Typography>
                    <span dangerouslySetInnerHTML={{ __html: header }} />
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          )
        }

        items.push(
          <ListItem key={index}>
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
                  inputProps={{
                    disabled: !isEditing
                  }}
                />
              </Grid>
            </Grid>
          </ListItem>
        )

        if (footer !== undefined) {
          if (typeof footer === 'string') {
            items.push(
              <ListItem key={header}>
                <Grid container alignItems='center' spacing={1}>
                  <Grid item xs={10}>
                    <Typography className={classes.subLevel}>
                      <span dangerouslySetInnerHTML={{ __html: footer }} />
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            )
          } else {
            footer.forEach(text =>
              items.push(
                <ListItem key={header}>
                  <Grid container alignItems='center' spacing={1}>
                    <Grid item xs={10}>
                      <Typography className={classes.subLevel}>
                        <span dangerouslySetInnerHTML={{ __html: text }} />
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              )
            )
          }
        }

        if (lastLine === true) {
          items.push(
            <Divider
              key={`divider-${index}`}
              light
              style={{ marginTop: 15, marginBottom: 15 }}
            />
          )
        }

        return items
      })}
    </List>
  )
}
