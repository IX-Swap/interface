import React from 'react'
import { useStyles } from 'app/pages/identity/components/DataPreview/DataPreview.styles'
import { ReactComponent as AvatarPhoto } from 'assets/icons/new/avatar.svg'
import { Avatar } from 'components/Avatar'
import { Status } from 'ui/Status/Status'
import { Box, Typography, Grid, Container } from '@mui/material'
// import { FieldsDisplay } from 'app/pages/identity/components/DataPreview/FieldDisplay'
import { ReactComponent as ApprovedBadge } from 'assets/icons/kyc-accreditation/approved-badge.svg'
// import { ReactComponent as AccreditedBadge } from 'assets/icons/kyc-accreditation/accredited-badge.svg'

export interface DataPreviewProps {
  avatar?: string
  userId?: string
  fields?: Array<{ key: string; value?: string }>
  name?: string
  isIndividual: boolean
  status: string
  identityType?: string
}

export const DataPreview = ({
  avatar,
  userId,
  fields,
  name,
  isIndividual,
  status,
  identityType
}: DataPreviewProps) => {
  const classes = useStyles()
  const {
    container,
    preview,
    containerAvatar,
    isIndividualGrid,
    corporateName,
    dataContainer,
    dataBox,
    dataLabel,
    dataValue,
    approveButton,
    emptyBox,
    whiteBackground
  } = classes

  const userIdentity = isIndividual ? ' Individual ' : ' Corporate '
  const typeStatus = status.toLowerCase()
  const identityLabel =
    identityType === 'issuer' || identityType === 'investor'
      ? identityType[0].toUpperCase() + identityType.slice(1)
      : 'Investor'

  return (
    <>
      <Container className={container}>
        <Grid className={preview}>
          <Grid className={containerAvatar} item>
            <Avatar
              documentId={avatar}
              ownerId={userId}
              variant='circular'
              size={120}
              borderRadius={100}
              fallback={<AvatarPhoto />}
            />
          </Grid>
          <Grid item className={isIndividualGrid}>
            <Box className={corporateName}>
              <Typography variant='h3'>{name}</Typography>
              {status === 'Approved' && <ApprovedBadge />}
              {/* <AccreditedBadge /> */}
            </Box>
            <Box className={dataContainer}>
              <Box className={dataBox}>
                <Typography variant='subtitle1' className={dataLabel}>
                  {identityLabel + ' Identity'}
                </Typography>
                <Typography
                  variant='subtitle1'
                  className={`${dataLabel} ${dataValue}`}
                >
                  {userIdentity}
                </Typography>
              </Box>

              <Box className={dataBox}>
                <Typography variant='subtitle1' className={dataLabel}>
                  {identityLabel + ' Role'}
                </Typography>
                <Typography
                  variant='subtitle1'
                  className={`${dataLabel} ${dataValue}`}
                >
                  -
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item className={approveButton}>
            <Status label={status} type={typeStatus} />
          </Grid>
        </Grid>
      </Container>
      <Box className={emptyBox} />
      {/* <FieldsDisplay fields={fields} /> */}
      <div className={whiteBackground}></div>
    </>
  )
}
