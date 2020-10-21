import React from 'react'
import { Grid, ListItem } from '@material-ui/core'
import { DataroomColumns } from 'v2/app/pages/identity/components/dataroom/DataroomColumns'
import useStyles from './styles'
import { DataroomViewRowProps } from 'v2/app/pages/identity/components/dataroom/DataroomViewRow'
import { Maybe } from 'v2/types/util'

export interface DataroomEditRowProps extends DataroomViewRowProps {
  input: Maybe<JSX.Element>
}

export const DataroomEditRow = (props: DataroomEditRowProps) => {
  const { title, document, input } = props
  const classes = useStyles()

  return (
    <ListItem className={classes.listItem}>
      <Grid container>
        {document !== undefined && (
          <DataroomColumns title={title} document={document} />
        )}
        {input !== null && (
          <Grid container item xs={1} justify='flex-end'>
            {input}
          </Grid>
        )}
      </Grid>
    </ListItem>
  )
}
