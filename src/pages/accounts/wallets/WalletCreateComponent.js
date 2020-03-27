import React, { useState } from 'react'
import { Grid, Button, TextField } from '@material-ui/core'

import { createMnemonicSeed } from './WalletService'
import Widget from '../../../components/Widget/Widget'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  panel: {
    marginTop: '25px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%'
  },
  textField: {
    width: '700px'
  }
}))

function renderPhrase (seed, styles) {
  return (
    <TextField
      label='Wallet Seed Phrase'
      id='outlined-margin-normal'
      value={seed}
      className={styles}
      helperText='Save this seed phrase in your Bitwarden password manager.'
      margin='normal'
      variant='outlined'
    />
  )
}

export default function WalletCreateComponent () {
  const classes = useStyles()

  const [seedPhrase, setSeedPhrase] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [publicKey, setPublicKey] = useState('')

  setPrivateKey()
  setPublicKey()
  async function createSeed () {
    const seed = await createMnemonicSeed()
    setSeedPhrase(seed)
    // createWallet(seed)
  }

  // async function createWallet (seed) {
  //   const hdwallet = await privateKeyfromSeed(seed)

  //   const node = hdwallet.derivePath()
  //   // const nodeExtendedPrivateKey = node.privateExtendedKey()
  //   // const nodeExtendedPublicKey = node.publicExtendedKey()

  //   const addressIndexWallet = node.deriveChild[0].getWallet()
  //   const publicKey = addressIndexWallet.getPublicKey().toString('hex')
  //   const privateKey = addressIndexWallet.getPrivateKey().toString('hex')
  //   setPublicKey(publicKey)
  //   setPrivateKey(privateKey)
  // }

  return (
    <Grid container className={classes.panel} spacing={3}>
      <Widget disableWidgetMenu>
        <Grid item xs={12} sm={12} md={12}>
          <Button variant='contained' color='primary' onClick={createSeed}>
            Create Seed Phrase
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {seedPhrase ? renderPhrase(seedPhrase, classes.textField) : ''}
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {publicKey ? publicKey : ''}
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {privateKey ? privateKey : ''}
        </Grid>
      </Widget>
    </Grid>
  )
}
