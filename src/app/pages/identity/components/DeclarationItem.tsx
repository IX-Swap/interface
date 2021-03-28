import React from 'react'
import { DeclarationHeader } from 'app/pages/identity/components/DeclarationHeader'
import { Divider, Grid, ListItem, Typography } from '@material-ui/core'
import { DeclarationFooter } from 'app/pages/identity/components/DeclarationFooter'
import useStyles from 'app/pages/identity/components/DeclarationItem.styles'
import { PrivacyPolicy } from 'app/pages/identity/components/PrivacyPolicy'
import { TermsOfUse } from 'app/pages/identity/components/TermsOfUse'
import { W8BEN } from 'app/pages/identity/components/W8BEN'
import { DeclarationTemplate } from 'app/pages/_identity/types/forms'

export interface DeclarationItemProps {
  template: DeclarationTemplate
  value: JSX.Element
}

export const DeclarationItem = (props: DeclarationItemProps) => {
  const { template, value } = props
  const { header, content, subLevel, footer, lastLine } = template
  const classes = useStyles()
  const [left, right] = content.split('[LINK]')

  return (
    <React.Fragment>
      {header !== undefined ? <DeclarationHeader header={header} /> : null}
      <ListItem>
        <Grid container alignItems='flex-start' spacing={1}>
          <Grid item xs={10}>
            <Typography className={subLevel === true ? classes.subLevel : ''}>
              <span
                dangerouslySetInnerHTML={{
                  __html: left
                }}
              />
              {template.key === 'InvestaXPrivacyPolicy' && <PrivacyPolicy />}
              {template.key === 'InvestaXTermsOfUse' && <TermsOfUse />}
              {template.key === 'USPerson' && <W8BEN />}
              <span
                dangerouslySetInnerHTML={{
                  __html: right
                }}
              />
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='subtitle1' align='right'>
              {value}
            </Typography>
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
}
