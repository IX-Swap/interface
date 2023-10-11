import { Box, Button, Link } from '@mui/material'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import useStyles from 'components/WalletModal/WalletModal.styles'

export default function Option({
  link = null,
  clickable = true,
  size,
  onClick,
  header,
  subheader = null,
  icon,
  active = false,
  id
}: {
  link?: string | null
  clickable?: boolean
  size?: number | null
  onClick?: () => void
  header: React.ReactNode
  subheader: React.ReactNode | null
  icon: string
  active?: boolean
  id: string
}) {
  const classes = useStyles()

  const content = (
    <Button
      id={id}
      onClick={onClick}
      disabled={!(clickable && !active)}
      className={classes.link}
      fullWidth
      variant='contained'
      disableElevation
    >
      <Box sx={{ justifyContent: 'center', height: '100%', marginRight: 1.5 }}>
        {active ? <Icon name='check' size={18} /> : ''}
        {header} Wallet
        {subheader !== null && <div>{subheader}</div>}
      </Box>
      <img src={icon} alt={'Icon'} height={'20'} />
    </Button>
  )
  if (link !== null) {
    return <Link href={link}>{content}</Link>
  }

  return content
}
