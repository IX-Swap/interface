import React from 'react'
import { Grid, Box, Hidden, Link } from '@mui/material'
import { Avatar } from 'components/Avatar'
import { LabelledValue } from 'components/LabelledValue'
import { formatDateToMMDDYY } from 'helpers/dates'
import { privateClassNames } from 'helpers/classnames'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { ExtendedIdentityProfile } from 'app/pages/identity/types/forms'

export interface IndividualInfoViewProps {
  data: ExtendedIdentityProfile
}

export const IndividualInfoView = (props: IndividualInfoViewProps) => {
  const { data } = props
  const { isMobile } = useAppBreakpoints()
  const email = data.email ?? '-'

  return (
    <Grid container>
      <Box display={'flex'} flexDirection={isMobile ? 'column' : 'row'}>
        <Box marginBottom={6}>
          <Avatar
            documentId={data.photo}
            ownerId={data.user._id}
            variant='square'
            size={128}
          />
        </Box>
        <Hidden smDown>
          <Box width={62} />
        </Hidden>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue value={data.firstName} label='First Name' />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue value={data.middleName} label='Middle Name' />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue value={data.lastName} label='Last Name' />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              label='Date of Birth'
              className={privateClassNames()}
              value={formatDateToMMDDYY(data.dob)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            <LabelledValue value={data.nationality} label='Citizenship' />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              label='Email'
              className={privateClassNames()}
              value={email}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              label='Contact Number'
              className={privateClassNames()}
              value={
                <Link href={`tel:${data.contactNumber}`}>
                  {data.contactNumber}
                </Link>
              }
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
