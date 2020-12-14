import React from 'react'
import { Grid, Link, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AppRouterLink } from 'components/AppRouterLink'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { VSpacer } from 'components/VSpacer'

const useTheme = makeStyles(theme => ({
  link: {
    marginBottom: theme.spacing(1)
  },
  buttonLink: {
    color: theme.palette.primary.main,
    fontSize: '0.75rem',
    cursor: 'pointer',
    marginBottom: theme.spacing(1)
  }
}))

export interface MoreOptionsProps {
  dsoId: string
}

export const MoreOptions: React.FC<MoreOptionsProps> = ({
  dsoId
}: MoreOptionsProps) => {
  const { link, buttonLink } = useTheme()
  const { paths } = useIssuanceRouter()

  const handleDuplicate = () => {}

  const handleDisable = () => {}

  return (
    <Grid>
      <Typography variant='h4'>More Options</Typography>
      <VSpacer size='medium' />
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
