import { Grid, Box, Hidden } from '@material-ui/core'
import { Avatar } from 'components/Avatar'
import { LabelledValue } from 'components/LabelledValue'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { privateClassNames } from 'helpers/classnames'
import React from 'react'
import { LEGAL_ENTITY_STATUS_LIST } from 'components/form/LegalEntityStatusSelect'
import { CorporateIdentity } from 'app/pages/_identity/types/forms'

export interface CorporateInfoProps {
  data: CorporateIdentity
}

export const CorporateInfo = ({ data }: CorporateInfoProps) => {
  const { isMobile } = useAppBreakpoints()
  const getLegalEntityStatus = (value: string) => {
    return LEGAL_ENTITY_STATUS_LIST.find(item => item.value === value)?.name
  }

  return (
    <Box display={'flex'} flexDirection={isMobile ? 'column' : 'row'}>
      <Box marginBottom={6}>
        <Avatar
          documentId={data.logo}
          ownerId={data.user._id}
          variant='square'
          size={128}
        />
      </Box>
      <Hidden xsDown>
        <Box width={62} />
      </Hidden>
      <Grid container spacing={3} direction='column'>
        <Grid item style={{ paddingBottom: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <LabelledValue
                value={data.companyLegalName}
                label='Company Name'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LabelledValue
                value={data.registrationNumber}
                label='Company Registration Number/UEN'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ paddingTop: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <LabelledValue
                value={data.countryOfFormation}
                label='Country of Incorporation'
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <LabelledValue
                label='Legal Entity Status'
                className={privateClassNames()}
                value={getLegalEntityStatus(data.legalEntityStatus)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
