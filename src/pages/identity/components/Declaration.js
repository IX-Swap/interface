//
import React, { Fragment } from 'react'
import { Typography, List } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import DeclarationItem from './DeclarationItem'

const useStyles = makeStyles(() => ({
  pageTitle: {
    lineHeight: '2em'
  },
  sublevel: {
    marginLeft: '3em'
  }
}))

const Declaration = ({ declarations, editMode }) => {
  const classes = useStyles()

  return (
    <List>
      {declarations.map(declaration => {
        const {
          key,
          content,
          sublevel,
          answerable,
          lastLine,
          value
        } = declaration

        return (
          <Fragment key={key}>
            <DeclarationItem
              editMode={editMode}
              name={key}
              value={value}
              answerable={answerable}
            >
              <Typography
                paragraph={lastLine}
                className={sublevel ? classes.sublevel : ''}
              >
                {/* eslint-disable-next-line */}
                <span dangerouslySetInnerHTML={{ __html: content }} />
              </Typography>
            </DeclarationItem>
            {lastLine && <br />}
          </Fragment>
        )
      })}
    </List>
  )
}

export default Declaration
