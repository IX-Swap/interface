import React from 'react'
import { Grid } from '@mui/material'
import { Avatar } from 'components/Avatar'
import { LabelledValue } from 'components/LabelledValue'
import { formatDateToDDMonYYYY } from 'helpers/dates'
import { privateClassNames } from 'helpers/classnames'
import { ExtendedIdentityProfile } from 'app/pages/identity/types/forms'
import { GENDERS_OPTS } from 'app/pages/identity/const'
import { ReactComponent as AvatarPhoto } from 'assets/icons/new/avatar_identity.svg'

export interface IndividualInfoPreview {
  data: ExtendedIdentityProfile
}

export const IndividualInfoPreview = (props: IndividualInfoPreview) => {
  const { data } = props
  const email = data.email ?? '-'

  const extractGender = (gender: string) => {
    if (gender?.length > 0) {
      return GENDERS_OPTS.find(item => item.value === gender)?.label
    }
    return gender
  }

  return (
    <Grid container direction={'column'} spacing={5}>
      <Grid
        item
        sx={{
          display: 'grid',
          gridTemplateColumns: { sx: '1fr', sm: '1fr 1fr' }
        }}
        container
      >
        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <LabelledValue
              isRedesigned
              label='Date of Birth'
              className={privateClassNames()}
              value={formatDateToDDMonYYYY(data.dob)}
            />
          </Grid>

          <Grid item>
            <LabelledValue
              isRedesigned
              label='Email Address'
              className={privateClassNames()}
              value={email}
            />
          </Grid>

          <Grid item>
            <LabelledValue
              isRedesigned
              value={data.nationality}
              label='Nationality'
            />
          </Grid>
        </Grid>

        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <LabelledValue
              isRedesigned
              value={extractGender(data.gender)}
              label='Gender'
            />
          </Grid>

          <Grid item>
            <LabelledValue
              isRedesigned
              label='Contact Number'
              className={privateClassNames()}
              value={data.contactNumber}
            />
          </Grid>

          <Grid item>
            <LabelledValue
              isRedesigned
              label='NRIC/FIN'
              className={privateClassNames()}
              value={data.nric}
            />
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  )
}
