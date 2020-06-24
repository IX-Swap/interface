import React, { useRef, useEffect } from 'react'
import { Typography, Grid, Box, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import * as AssetsModule from 'context/assets'
import * as AssetActions from 'context/assets/actions'

const { AssetsProvider, useAssetsState, useAssetsDispatch } = AssetsModule
const { getAssets } = AssetActions

const useAssetsGetter = () => {
  const mountedRef = useRef(true)
  const aDispatch = useAssetsDispatch()
  const { type, assets } = useAssetsState()

  useEffect(() => {
    if (type !== 'Security') {
      getAssets(aDispatch, {
        ref: mountedRef,
        type: 'Security'
      })
    }
  }, [type, aDispatch])

  useEffect(
    () => () => {
      mountedRef.current = false
    },
    []
  )

  return { assets }
}

const ViewAsset = ({ match }: RouteProps) => {
  const { assets } = useAssetsGetter()
  const history = useHistory()
  const assetFiltered = (assets || []).filter(
    (e) => e._id === match.params.assetId
  )

  if (!assetFiltered.length) return <span>nothing to show</span>
  const asset = assetFiltered[0]

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item container alignItems='baseline'>
        <Box py={4} px={2} />
        <Button type='button' onClick={() => history.goBack()}>
          <ArrowBackIosIcon />
        </Button>
        <Typography variant='h2'>{asset.symbol}</Typography>
        <Typography variant='h5' style={{ marginLeft: '16px' }}>
          {asset.name}
        </Typography>
      </Grid>
      <Grid item>
        <Box px={4}>
          <Typography variant='h3'>About {asset.symbol}</Typography>
        </Box>
        <Box px={4} py={2} pb={4}>
          <span dangerouslySetInnerHTML={{ __html: asset.description || '' }} />
        </Box>
      </Grid>
    </Grid>
  )
}

const ViewAssetWithProvider = ({ match }: RouteProps) => (
  <AssetsProvider>
    <ViewAsset match={match} />
  </AssetsProvider>
)

export default ViewAssetWithProvider
