import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import LoadingBlock from 'pages/DexV2/common/LoadingBlock'
import { usePool } from 'state/dexV2/pool/usePool'
import AddLiquidityCard from './AddLiquidityCard'
import DexV2Layout from 'pages/DexV2/common/Layout'

const AddLiquidity: React.FC = () => {
  const params = useParams<any>()
  const poolId = (params.id as string).toLowerCase()
  const { pool, isLoadingPool } = usePool(poolId)

  const isLoading: boolean = isLoadingPool

  return (
    <DexV2Layout>
      <Container>{isLoading || !pool ? <LoadingBlock className="h-120" /> : <AddLiquidityCard pool={pool} />}</Container>
    </DexV2Layout>
  )
}

export default AddLiquidity

const Container = styled.div`
  padding: 0 1rem;
  margin: 0 auto;
  width: 100%;
  max-width: 462px;

  .h-120 {
    height: 30rem;
  }
`
