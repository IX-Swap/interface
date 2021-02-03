import React from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  Box,
  ListItemText,
  Typography
} from '@material-ui/core'
import { Avatar } from 'components/Avatar'

export interface TopListProps {
  items: Array<{ imageURL: string | undefined; label: string; _id: string }>
}

export const TopList = (props: TopListProps) => {
  const { items } = props

  return (
    <List>
      {items.map(({ imageURL, label, _id }) => (
        <ListItem>
          <ListItemAvatar>
            <Avatar size={46} documentId={imageURL} ownerId={_id} />
          </ListItemAvatar>
          <Box mx={1.5} />
          <ListItemText>
            <Typography>{label}</Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  )
}
