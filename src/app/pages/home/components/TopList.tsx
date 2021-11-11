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
import { useTheme } from '@material-ui/core/styles'

export interface TopListProps {
  items: Array<{
    imageURL?: string
    user?: string
    label: string
    _id: string
  }>
}

export const TopList = (props: TopListProps) => {
  const { items } = props
  const theme = useTheme()
  const isLightThemeOn = theme.palette.type === 'light'

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
              <Typography
                style={{
                  color: theme.palette.text.primary,
                  opacity: isLightThemeOn ? 1 : 0.6
                }}
              >
                {label}
              </Typography>
            </ListItemText>
          </ListItem>
        )
      })}
    </List>
  )
}
