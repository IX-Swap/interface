import React from 'react'
import { useStyles } from './DataPreview.styles'
// import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { ReactComponent as AvatarPhoto } from 'assets/icons/new/avatar.svg'
import { Avatar } from 'components/Avatar'
import { Box, Typography, Grid, Container } from '@mui/material'
import { FieldsDisplay } from 'app/pages/identity/components/IndividualPreview/FieldDisplay'

export interface DataPreviewProps {
  avatar?: string
  userId?: string
  fields?: Array<{ key: string; value?: string }>
  name?: string
  occupation: string
  isIndividual: boolean
}

export const DataPreview = ({
  avatar,
  userId,
  fields,
  name,
  occupation,
  isIndividual
}: DataPreviewProps) => {
  // const { isMobile } = useAppBreakpoints()
  const classes = useStyles()
  const isOccupationLowerCase =
    occupation == undefined || occupation !== 'Others'
      ? occupation
      : 'Investor '
  const isCorporate = isIndividual ? ' Individual ' : ' Corporate '

  return (
    <>
      <Container className={classes.container}>
        <Grid className={classes.preview}>
          <Grid className={classes.containerAvatar} item>
            <Avatar
              documentId={avatar}
              ownerId={userId}
              variant='circular'
              size={120}
              borderRadius={100}
              fallback={<AvatarPhoto />}
            />
          </Grid>
          <Grid item style={{ textAlign: 'center' }}>
            <Typography variant='h3' display={'flex'} justifyContent={'center'}>
              {name}
            </Typography>
          </Grid>
          <Grid item className={classes.isIndividualGrid}>
            <Typography variant='subtitle1' className={classes.textCorporate}>
              {isCorporate + isOccupationLowerCase + ' Identity'}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box height={'40px'} />
      <FieldsDisplay fields={fields} />
      <div className={classes.whiteBackground}></div>
    </>
  )
}
