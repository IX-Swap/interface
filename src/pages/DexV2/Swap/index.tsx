import React, { useEffect } from 'react'
import usePoolFilters from 'state/dexV2/swap/usePoolFilters'

import SwapCard from './components/SwapCard'

const Swap: React.FC = () => {
  const { setSelectedTokens } = usePoolFilters()

  useEffect(() => {
    setSelectedTokens([])
  }, [])

  return (
    <div>
      <SwapCard />
    </div>
  )
}

export default Swap
