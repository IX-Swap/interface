import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DsoBoard from './pages/dso-board/DsoBoard'
import DsoView from './pages/dso-view'
import CreateDso from './pages/create-dso'
import { InvestProvider } from 'context/InvestContext'

export default function Invest () {
  return (
    <InvestProvider>
      <Switch>
        <Route path='/app/invest' exact component={DsoBoard} />
        <Route path='/app/invest/:dsoId' exact component={DsoView} />
        <Route path='/app/invest/create-dso' exact component={CreateDso} />
      </Switch>
    </InvestProvider>
  )
}
