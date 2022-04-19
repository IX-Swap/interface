import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Avatar } from 'components/Avatar'
import { useAssetById } from 'hooks/asset/useAssetById'
import { useAuth } from 'hooks/auth/useAuth'

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
}

export const ListingHeader = ({
  logoId,
  name,
  symbol,
  companyName,
  markets
}: ListingHeaderProps) => {
  const { user } = useAuth()
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Avatar
          documentId={logoId}
          ownerId={user?._id}
          variant='square'
          size={128}
        />
      </Grid>
      <Grid item>
        <Grid container direction='column' spacing={1}>
          <Grid item>
            <Typography variant='h2'>
              {name} ({symbol})
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>{companyName}</Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>
              Currency:{' '}
              {markets.map(market => (
                <CurrencyDisplay key={market._id} assetId={market.currency} />
              ))}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
