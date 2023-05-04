import { Grid, Typography, Paper } from '@mui/material'
import React from 'react'
import { Avatar } from 'components/Avatar'
import { useAssetById } from 'hooks/asset/useAssetById'
import { useAuth } from 'hooks/auth/useAuth'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { useStyles } from './ListingHeader.styles'
import { Status } from 'ui/Status/Status'
import { ListingActions } from 'app/pages/issuance/components/ListingDetails/ListingActions'
import { ListingView } from 'types/listing'

export interface CurrencyDisplayProps {
  assetId: string
}

export const CurrencyDisplay = ({ assetId }: CurrencyDisplayProps) => {
  const { data, isLoading } = useAssetById(assetId)

  if (data === undefined || isLoading) {
    return null
  }

  return <>{data.symbol} </>
}

export interface ListingHeaderProps {
  logoId: string
  name: string
  symbol: string
  companyName: string
  markets: any[]
  data: ListingView
  status?: string
  withoutActions?: boolean
}

export const ListingHeader = ({
  logoId,
  name,
  symbol,
  companyName,
  markets,
  data,
  status,
  withoutActions = false
}: ListingHeaderProps) => {
  const { user } = useAuth()
  const { isMobile, theme } = useAppBreakpoints()
  const { container, logo, details, status: statusStyles } = useStyles()

  return (
    <Paper className={container} sx={{ marginBottom: '15px' }}>
      <Grid container spacing={isMobile ? 3 : 6}>
        <Grid item xs={12} md={3} className={logo}>
          <Avatar
            documentId={logoId}
            ownerId={user?._id}
            size={isMobile ? 48 : 124}
            variant='circular'
          />
        </Grid>
        <Grid item xs={12} md={9} container className={details} gap={5}>
          <Grid item container>
            <Grid
              item
              xs={12}
              md={9}
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
            >
              <Typography variant='h3' mb={1}>
                {name} ({symbol})
              </Typography>
              <Typography variant='h5' color={theme.palette.primary.main}>
                {companyName}
              </Typography>
              <Typography variant='subtitle1'>
                Currency:{' '}
                {markets.map(market => (
                  <CurrencyDisplay key={market._id} assetId={market.currency} />
                ))}
              </Typography>
            </Grid>
            {typeof status !== 'undefined' && (
              <Grid item xs={12} md={3} className={statusStyles}>
                <Status label={status} type={status} />
                {!withoutActions && <ListingActions data={data} />}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
