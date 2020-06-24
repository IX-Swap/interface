// @flow
import React, { useRef, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import * as AssetsModule from 'context/assets'
import * as AssetActions from 'context/assets/actions'
import { ASSETS_STATUS } from 'context/assets/types'

import IssuanceList from './pages/issuance-list'
import IssuanceView from './pages/issuance-view'
import IssuanceCreate from './pages/issuance-create'
import { IssuanceProvider } from './modules'
import DeployToken from './deploy'

const { AssetsProvider, useAssetsState, useAssetsDispatch } = AssetsModule
const { getAssets } = AssetActions

const useAssetsGetter = () => {
  const mountedRef = useRef(true)
  const aDispatch = useAssetsDispatch()
  const { status, type, assets } = useAssetsState()
  const acceptType = 'Currency'

  useEffect(() => {
    if (status === ASSETS_STATUS.INIT || type !== acceptType) {
      getAssets(aDispatch, {
        ref: mountedRef,
        type: acceptType
      })
    }
  }, [aDispatch, status, type])

  useEffect(
    () => () => {
      mountedRef.current = false
    },
    []
  )

  return { status, assets }
}

const Issuance = () => {
  const { status, assets } = useAssetsGetter()

  return (
    status === ASSETS_STATUS.IDLE && (
      <IssuanceProvider>
        <Switch>
          <Route path='/issuance' exact component={IssuanceList} />
          <Route path='/issuance/view' exact component={IssuanceView} />
          <Route
            path='/issuance/create'
            exact
            component={(props) => <IssuanceCreate {...props} assets={assets} />}
          />
          <Route
            path='/issuance/:userId/:id/deploy'
            exact
            component={DeployToken}
          />
        </Switch>
      </IssuanceProvider>
    )
  )
}

const IssuanceWithProvider = () => (
  <AssetsProvider>
    <Issuance />
  </AssetsProvider>
)

export default IssuanceWithProvider
