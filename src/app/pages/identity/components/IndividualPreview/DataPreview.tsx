import React from 'react'
import { useStyles } from './DataPreview.styles'
// import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { Avatar } from 'components/Avatar'
import { Box, Typography, Grid, Container } from '@mui/material'
import { FieldsDisplay } from 'app/pages/identity/components/IndividualPreview/FieldDisplay'

export interface DataPreviewProps {
  avatar?: string
  userId?: string
  fields?: Array<{ key: string; value?: string }>
  name?: string
}

export const DataPreview = ({
  avatar,
  userId,
  fields,
  name
}: DataPreviewProps) => {
  // const { isMobile } = useAppBreakpoints()
  const classes = useStyles()

  return (
    <>
      <Container className={classes.container}>
        <Grid>
          <Grid
            className={classes.container}
            item
            maxWidth={150}
            marginBottom={'24px'}
          >
            <div style={{ zIndex: 5 }}>
              <Avatar
                documentId={avatar}
                ownerId={userId}
                variant='circular'
                size={120}
                borderRadius={100}
              />
            </div>
          </Grid>
          <div className={classes.whiteBackground}></div>
          <Grid item style={{ textAlign: 'center' }}>
            <Typography className={classes.textName}>{name}</Typography>
          </Grid>
          <Grid item style={{ textAlign: 'center', marginTop: '8px' }}>
            <Typography className={classes.textCorporate}>
              Corporate Issuer Identity
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box height={'40px'} />
      <FieldsDisplay fields={fields} />
    </>
  )
}
