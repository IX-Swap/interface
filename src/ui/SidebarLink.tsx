import React from 'react'
import { styled } from '@material-ui/core/styles'
import { ListItem, ListItemProps as MUIListItemProps } from '@material-ui/core'
import { Link } from 'react-router-dom'

export interface SidebarLinkProps {
  isActive: boolean
}

export type ListItemProps = MUIListItemProps<Link, { button: any }>

const Component = (props: any) => <ListItem {...props} /> // TODO: fix any

export const SidebarLink = styled(Component)(({ theme, selected }: any) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  color: (selected as boolean) ? theme.palette.primary : theme.palette.text.disabled,
  marginTop: theme.spacing(1),
  textDecoration: 'none',
  '&:hover, &:focus': {
    backgroundColor: theme.palette.background.default
  },

  '& span': theme.typography.body1,
  '& svg': {
    marginRight: theme.spacing(1.5)
  },

  [theme.breakpoints.up('md')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: theme.typography.body2.fontSize,
    height: 88,
    padding: 0,
    marginTop: theme.spacing(4.375),

    '& span': theme.typography.body2,
    '& svg': { marginRight: 0 }
  }
}))
