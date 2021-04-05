import React from 'react'
import { Typography, Grid, ListItem } from '@material-ui/core'
import useStyles from 'app/pages/identity/components/DeclarationItem.styles'
import { DeclarationTemplate } from 'app/pages/_identity/types/forms'

export interface DeclarationFooterProps {
  footer: Exclude<DeclarationTemplate['footer'], undefined>
  classes: ReturnType<typeof useStyles>
}

export const DeclarationFooter = ({
  footer,
  classes
}: DeclarationFooterProps) => {
  if (typeof footer === 'string') {
    return (
      <ListItem>
        <Grid container alignItems='center' spacing={1}>
          <Grid item xs={10}>
            <Typography className={classes.subLevel}>
              <span dangerouslySetInnerHTML={{ __html: footer }} />
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    )
  }
  return (
    <React.Fragment>
      {footer.map(text => (
        <ListItem key={text}>
          <Grid container alignItems='center' spacing={1}>
            <Grid item xs={10}>
              <Typography className={classes.subLevel}>
                <span dangerouslySetInnerHTML={{ __html: text }} />
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </React.Fragment>
  )
}
