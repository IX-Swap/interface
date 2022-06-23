import React from 'react'
import { Grid, Box, Link, useTheme } from '@mui/material'
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
  const theme = useTheme()

  return (
    <Grid container>
      <Box>
        <Box marginRight={2}>
          <Avatar
            documentId={data.photo}
            ownerId={data.user._id}
            size={128}
            borderRadius={16}
          />
        </Box>
        <Grid
          container
          rowSpacing={4}
          spacing={2}
          style={{ marginTop: isMobile ? 8 : 20 }}
        >
          <Grid item xs={12} sm={6} md={6}>
            <LabelledValue
              labelWeight='thin'
              labelFontSize={14}
              valueColor={theme.palette.text.secondary}
              value={data.firstName}
              label='First Name'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <LabelledValue
              labelWeight='thin'
              labelFontSize={14}
              valueColor={theme.palette.text.secondary}
              value={data.lastName}
              label='Last Name'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <LabelledValue
              labelWeight='thin'
              labelFontSize={14}
              valueColor={theme.palette.text.secondary}
              label='Date of Birth'
              className={privateClassNames()}
              value={formatDateToMMDDYY(data.dob)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <LabelledValue
              labelWeight='thin'
              labelFontSize={14}
              valueColor={theme.palette.text.secondary}
              label='Contact Number'
              className={privateClassNames()}
              value={
                <Link href={`tel:${data.contactNumber}`}>
                  {data.contactNumber}
                </Link>
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <LabelledValue
              labelWeight='thin'
              labelFontSize={14}
              valueColor={theme.palette.text.secondary}
              label='Email Address'
              className={privateClassNames()}
              value={email}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <LabelledValue
              labelWeight='thin'
              labelFontSize={14}
              valueColor={theme.palette.text.secondary}
              value={data.nationality}
              label='Nationality'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <LabelledValue
              labelWeight='thin'
              labelFontSize={14}
              valueColor={theme.palette.text.secondary}
              value={data.gender}
              label='Gender'
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
