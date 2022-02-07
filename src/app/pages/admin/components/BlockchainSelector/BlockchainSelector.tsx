import { Grid, Typography, Button } from '@mui/material'
import React from 'react'
import { useStyles } from './BlockchainSelector.styles'
import { BlockchainNetworks } from 'types/blockchain'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { useTheme } from '@mui/material/styles'
import { networkIconMap } from 'config/blockchain'

export const BlockchainSelector = () => {
  const styles = useStyles()
  const networks = Object.entries(BlockchainNetworks)
  const theme = useTheme()

  return (
    <SearchQueryFilter name='blockchainNetwork'>
      {({ value, onChange }) => (
        <Grid container spacing={3}>
          {networks.map(([id, name]) => (
            <Grid key={name} item xs={12} md={3}>
              <Button
                data-testid='blockchain-selector-item'
                onClick={() => onChange(id)}
                component='span'
                className={styles.item}
                style={{
                  borderColor:
                    value === id ? theme.palette.primary.main : 'transparent'
                }}
              >
                <img
                  className={styles.icon}
                  src={networkIconMap[id as keyof typeof networkIconMap]}
                  alt={name}
                />
                <Typography
                  variant='h5'
                  color='textPrimary'
                  className={styles.label}
                >
                  {name}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
    </SearchQueryFilter>
  )
}
