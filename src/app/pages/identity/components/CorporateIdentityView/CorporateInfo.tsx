import { Grid } from '@mui/material'
import { Avatar } from 'components/Avatar'
import { LabelledValue } from 'components/LabelledValue'
import { privateClassNames } from 'helpers/classnames'
import React from 'react'
import { LEGAL_ENTITY_STATUS_LIST } from 'components/form/LegalEntityStatusSelect'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
// import { ReactComponent as AvatarPhoto } from 'assets/icons/new/avatar.svg'

export interface CorporateInfoProps {
  data: CorporateIdentity
}

export const CorporateInfo = ({ data }: CorporateInfoProps) => {
  const { isMobile } = useAppBreakpoints()

  const getLegalEntityStatus = (value: string) => {
    const status = LEGAL_ENTITY_STATUS_LIST.find(
      item => item.value === value
    )?.label
    return status ?? value
  }

  return (
    <Grid item container flexDirection={'column'} spacing={5}>
      <Grid item>
        <Avatar
          documentId={data.logo}
          ownerId={data.user._id}
          variant='square'
          size={120}
          borderRadius={16}
          // fallback={<AvatarPhoto />}
        />
      </Grid>
      <Grid
        item
        sx={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr'
        }}
        container
      >
        <Grid
          item
          container
          direction={'column'}
          justifyContent={'flex-end'}
          spacing={5}
        >
          <Grid item>
            <LabelledValue
              isRedesigned
              value={data.companyLegalName}
              label='Company Name'
            />
          </Grid>

          <Grid item>
            <LabelledValue
              isRedesigned
              value={data.countryOfFormation}
              label='Country of Incorporation'
            />
          </Grid>

          <Grid item>
            <LabelledValue
              isRedesigned
              value={data.sourceOfFund}
              label='Source of Funds'
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction={'column'}
          justifyContent={'flex-end'}
          spacing={5}
        >
          <Grid item />
          <Grid item>
            <LabelledValue
              isRedesigned
              value={data.registrationNumber}
              label='Registration Number/UEN'
            />
          </Grid>
          <Grid item>
            <LabelledValue
              isRedesigned
              label='Legal Entity'
              className={privateClassNames()}
              value={getLegalEntityStatus(data.legalEntityStatus)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
