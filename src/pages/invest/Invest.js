import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DsoBoard from './pages/dso-board/DsoBoard'
import DsoView from './pages/dso-view'
import NewProduct from './pages/new-product'
import DsoEdit from 'pages/invest/pages/dso-edit'

import { InvestProvider } from 'context/InvestContext'

export default function Invest () {
  return (
    <InvestProvider>
      <Switch>
        <Route path='/app/invest' exact component={DsoBoard} />
        <Route path='/app/invest/new-product' exact component={NewProduct} />
        <Route path='/app/invest/:dsoId/' exact component={DsoView} />
        <Route path='/app/invest/:dsoId/edit' exact component={DsoEdit} />
      </Switch>
    </InvestProvider>
  )
}
