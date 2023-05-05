import { Grid } from '@mui/material'
import { Avatar } from 'components/Avatar'
import { LabelledValue } from 'components/LabelledValue'
import { privateClassNames } from 'helpers/classnames'
import React from 'react'
import { LEGAL_ENTITY_STATUS_LIST } from 'components/form/LegalEntityStatusSelect'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { ReactComponent as AvatarPhoto } from 'assets/icons/new/avatar_identity.svg'
import { Status } from 'ui/Status/Status'

export interface CorporateInfoProps {
  data: CorporateIdentity
  hideAvatar?: boolean
}

export const CorporateInfo = ({
  data,
  hideAvatar = false
}: CorporateInfoProps) => {
  const getLegalEntityStatus = (value: string) => {
    const status = LEGAL_ENTITY_STATUS_LIST.find(
      item => item.value === value
    )?.label
    return status ?? value
  }

  const declaredAs =
    typeof data?.declaredAs !== 'undefined' ? data.declaredAs : []

  const InvestorStatus = ({ investorType }: { investorType: string }) => {
    if (
      typeof data.declaredAs !== 'undefined' &&
      typeof data.declaredAsStatus !== 'undefined' &&
      Boolean(data.declaredAs.includes(investorType)) &&
      investorType in data.declaredAsStatus
    ) {
      const investorStatus =
        data.declaredAsStatus[
          investorType as keyof typeof data.declaredAsStatus
        ]
      return (
        <Status
          label={investorStatus}
          type={String(investorStatus).toLowerCase()}
        />
      )
    }

    return <Status label='N/A' type='draft' />
  }

  return (
    <Grid item container flexDirection={'column'} spacing={5}>
      {!hideAvatar && (
        <Grid item>
          <Avatar
            documentId={data.logo}
            ownerId={data.user._id}
            variant='square'
            size={120}
            borderRadius={16}
            fallback={<AvatarPhoto />}
          />
        </Grid>
      )}

      <Grid
        item
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }
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
          {!hideAvatar && (
            <Grid item>
              <LabelledValue
                isRedesigned
                value={data.companyLegalName}
                label='Company Name'
              />
            </Grid>
          )}

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
              label='Legal Entity'
              className={privateClassNames()}
              value={getLegalEntityStatus(data.legalEntityStatus)}
            />
          </Grid>
          {hideAvatar ? (
            <Grid item>
              <LabelledValue
                isRedesigned
                label='Issuer Application'
                value={<InvestorStatus investorType='issuer' />}
              />
            </Grid>
          ) : (
            declaredAs.includes('issuer') && (
              <Grid item>
                <LabelledValue
                  isRedesigned
                  hasCheck
                  label=''
                  value='I declare that I am an Issuer.'
                />
              </Grid>
            )
          )}
        </Grid>

        <Grid
          item
          container
          direction={'column'}
          justifyContent={'flex-end'}
          spacing={5}
          sx={{ paddingTop: { xs: '40px', sm: 0 } }}
        >
          {!hideAvatar && <Grid item />}

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
              value={data.sourceOfFund}
              label='Source of Funds'
            />
          </Grid>

          {hideAvatar ? (
            <Grid item>
              <LabelledValue
                isRedesigned
                label='Client Application'
                value={<InvestorStatus investorType='tenantOwner' />}
              />
            </Grid>
          ) : (
            declaredAs.includes('tenantOwner') && (
              <Grid item>
                <LabelledValue
                  isRedesigned
                  hasCheck
                  label=''
                  value='I declare that I am an Client.'
                />
              </Grid>
            )
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
