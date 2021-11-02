import { Grid, Typography, Button } from '@material-ui/core'
import React from 'react'
import { useStyles } from './BlockchainSelector.styles'
import { BlockchainNetworks } from 'types/blockchain'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { useTheme } from '@material-ui/core/styles'
import AlgorandIcon from 'assets/images/algorand.png'
import EthereumIcon from 'assets/images/ethereum.png'
import HederaIcon from 'assets/images/hedera.png'
import TezosIcon from 'assets/images/tezos.png'

const networkIconMap = {
  [BlockchainNetworks.ETH]: EthereumIcon,
  [BlockchainNetworks.XTZ]: TezosIcon,
  [BlockchainNetworks.HBAR]: HederaIcon,
  [BlockchainNetworks.ALGO]: AlgorandIcon
}

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
                  src={networkIconMap[name]}
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
