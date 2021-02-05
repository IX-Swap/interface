import React from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  Box,
  ListItemText,
  Typography
} from '@material-ui/core'
import { IndividualAvatar } from 'components/IndividualAvatar'
import { CorporateAvatar } from 'components/CorporateAvatar'

export interface TopListProps {
  items: Array<{ imageURL?: string; user?: string; label: string; _id: string }>
}

export const TopList = (props: TopListProps) => {
  const { items } = props

  return (
    <List>
      {items.map(({ imageURL, label, _id, user }) => {
        return (
          <ListItem key={_id}>
            <ListItemAvatar>
              {user !== undefined ? (
                <IndividualAvatar userId={user} />
              ) : (
                <CorporateAvatar _id={_id} />
              )}
            </ListItemAvatar>
            <Box mx={1.5} />
            <ListItemText>
              <Typography>{label}</Typography>
            </ListItemText>
          </ListItem>
        )
      })}
    </List>
  )
}
