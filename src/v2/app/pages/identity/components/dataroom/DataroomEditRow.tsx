import React from 'react'
import { Grid, ListItem } from '@material-ui/core'
import { DataroomColumns } from 'v2/app/pages/identity/components/dataroom/DataroomColumns'
import useStyles from './styles'
import { DataroomViewRowProps } from 'v2/app/pages/identity/components/dataroom/DataroomViewRow'
import { Maybe } from 'v2/types/util'
import classNames from 'classnames'

export interface DataroomEditRowProps extends DataroomViewRowProps {
  input: Maybe<JSX.Element>
}

export const DataroomEditRow = (props: DataroomEditRowProps) => {
  const { title, document, input, disableBorder = false } = props
  const classes = useStyles()

  return (
    <ListItem className={classNames({ [classes.listItem]: !disableBorder })}>
      <Grid container>
        {document !== undefined && (
          <DataroomColumns title={title} document={document} />
        )}
        {input !== null && (
          <Grid container item xs={2} justify='flex-end'>
            {input}
          </Grid>
        )}
      </Grid>
    </ListItem>
  )
}
