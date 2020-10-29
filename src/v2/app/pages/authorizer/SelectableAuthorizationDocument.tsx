import React from 'react'
import {
  AuthorizationDocument,
  AuthorizationDocumentProps
} from 'v2/app/pages/authorizer/components/AuthorizationDocument'
import { Box, Checkbox, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export interface SelectableAuthorizationDocumentProps
  extends AuthorizationDocumentProps {
  isSelected: boolean
  hasSelected: boolean
  toggleItem: () => void
}

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    '&:hover': { zIndex: 3 }
  }
}))

export const SelectableAuthorizationDocument = (
  props: SelectableAuthorizationDocumentProps
) => {
  const { isSelected, toggleItem, hasSelected, ...rest } = props
  const classes = useStyles()

  return (
    <Grid item className={classes.container} onClick={toggleItem}>
      {hasSelected && (
        <Box position='absolute' zIndex={1}>
          <Checkbox checked={isSelected} onClick={toggleItem} />
        </Box>
      )}

      <AuthorizationDocument {...rest} />
    </Grid>
  )
}
