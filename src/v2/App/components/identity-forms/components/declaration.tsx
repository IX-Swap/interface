import React from 'react'
import { Typography, List } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import DeclarationItem from './declaration-item'
import { DeclarationTemplate } from '../../../../types/identity'

const useStyles = makeStyles(() => ({
  pageTitle: {
    lineHeight: '2em'
  },
  sublevel: {
    marginLeft: '3em'
  }
}))

const Declaration = ({
  declarations,
  editMode
}: {
  declarations: DeclarationTemplate[]
  editMode: boolean
}) => {
  const classes = useStyles()

  return (
    <List>
      {declarations.map((declaration) => {
        const {
          key,
          content,
          sublevel,
          answerable,
          lastLine,
          value
        } = declaration

        return (
          <DeclarationItem
            key={key}
            editMode={editMode}
            name={key}
            value={value}
            answerable={answerable}
          >
            <Typography
              paragraph={lastLine}
              className={sublevel ? classes.sublevel : ''}
            >
              <span dangerouslySetInnerHTML={{ __html: content }} />
            </Typography>
          </DeclarationItem>
        )
      })}
    </List>
  )
}

export default Declaration
