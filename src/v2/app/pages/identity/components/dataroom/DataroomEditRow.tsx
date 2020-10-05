import React from 'react'
import { Grid, ListItem } from '@material-ui/core'
import { DataroomColumns } from 'v2/app/pages/identity/components/dataroom/DataroomColumns'
import useStyles from './styles'
import { DataroomViewRowProps } from 'v2/app/pages/identity/components/dataroom/DataroomViewRow'

export interface DataroomEditRowProps extends DataroomViewRowProps {
  input: JSX.Element
}

export const DataroomEditRow = (props: DataroomEditRowProps) => {
  const { title, document, input } = props
  const classes = useStyles()

  return (
    <ListItem className={classes.listItem}>
      <Grid container>
        <DataroomColumns title={title} document={document} />
        <Grid container item xs={1} justify='flex-end'>
          {input}
        </Grid>
      </Grid>
    </ListItem>
  )
}
