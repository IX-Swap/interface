import React, { useState } from 'react'
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/Inbox'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import useStyles from './styles'

const ListItemLink = React.forwardRef(({ ...props }: any, ref: any) => (
  <Link ref={ref} {...props} />
))

export default function SidebarLink ({
  link,
  icon,
  label,
  children,
  location,
  isSidebarOpened,
  nested,
  type
}: {
  link?: string
  icon?: JSX.Element
  label?: string
  children?: Array<{ link: string; label: string }>
  location: any
  isSidebarOpened: boolean
  nested: any
  type?: any
}) {
  const classes = useStyles()

  // local
  const [isOpen, setIsOpen] = useState(false)
  const isLinkActive =
    link !== undefined &&
    (location.pathname === link || location.pathname.indexOf(link) !== -1)

  if (type === 'title') {
    return (
      <Typography
        className={classnames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened
        })}
      >
        {label}
      </Typography>
    )
  }

  if (type === 'divider') return <Divider className={classes.divider} />

  if (children === undefined) {
    return (
      <ListItem
        component={ListItemLink}
        to={link ?? ''}
        button
        className={classes.link}
        classes={{
          root: classnames({
            [classes.linkActive]: isLinkActive && nested,
            [classes.linkNested]: nested
          })
        }}
        disableRipple
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
            [classes.linkIconNested]: nested
          })}
        >
          {nested !== undefined ? <>&nbsp;</> : icon}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened
            })
          }}
          primary={label}
        />
      </ListItem>
    )
  }

  return (
    <>
      <ListItem
        to={link ?? ''}
        component={ListItemLink}
        button
        onClick={(e: Event) => toggleCollapse(e, isLinkActive)}
        className={classes.link}
        disableRipple
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive
          })}
        >
          {icon ?? <InboxIcon />}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened
            })
          }}
          primary={label}
        />
      </ListItem>
      {children !== undefined && (
        <Collapse
          in={isOpen}
          timeout='auto'
          unmountOnExit
          className={classes.nestedList}
        >
          <List component='div' disablePadding>
            {children.map(childrenLink => (
              <SidebarLink
                key={childrenLink?.link}
                location={location}
                isSidebarOpened={isSidebarOpened}
                nested
                {...childrenLink}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )

  // ###########################################################

  function toggleCollapse (e: Event, isActive: boolean) {
    if (isSidebarOpened) {
      if (isActive) {
        e.preventDefault()
        if (isOpen) {
          setIsOpen(false)
          return
        }
      }

      setIsOpen(true)
    }
  }
}
