import React from 'react'
import { Grid, Link, Typography } from '@material-ui/core'
import { AppRouterLink } from 'components/AppRouterLink'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { VSpacer } from 'components/VSpacer'
import { useStyles } from './MoreOptions.styles'
export interface MoreOptionsProps {
  dsoId: string | undefined
}

export const MoreOptions: React.FC<MoreOptionsProps> = ({
  dsoId
}: MoreOptionsProps) => {
  const { link, buttonLink } = useStyles()
  const { paths } = useIssuanceRouter()

  const handleDuplicate = () => {}

  const handleDisable = () => {}

  if (typeof dsoId === 'undefined') {
    return null
  }

  return (
    <Grid>
      <Typography variant='h5'>More Options</Typography>
      <VSpacer size='small' />
      <Grid container spacing={0} direction='column'>
        <AppRouterLink
          to={paths.view}
          params={{
            dsoId: dsoId
          }}
          color='primary'
          underline='hover'
          className={link}
        >
          View this DSO
        </AppRouterLink>

        <AppRouterLink
          to={paths.list}
          color='primary'
          underline='hover'
          className={link}
        >
          View My DSO
        </AppRouterLink>

        <AppRouterLink
          to={paths.create}
          params={{
            dsoId: dsoId
          }}
          color='primary'
          underline='hover'
          className={link}
        >
          Create New DSO
        </AppRouterLink>

        <AppRouterLink
          to={paths.edit}
          params={{
            dsoId: dsoId
          }}
          color='primary'
          underline='hover'
          className={link}
        >
          Edit DSO
        </AppRouterLink>

        <Link
          align='left'
          component='div'
          onClick={handleDuplicate}
          className={buttonLink}
        >
          Duplicate This DSO
        </Link>

        <Link
          align='left'
          component='div'
          className={buttonLink}
          onClick={handleDisable}
        >
          Disable This DSO
        </Link>
      </Grid>
    </Grid>
  )
}
