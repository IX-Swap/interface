import React, { useMemo } from 'react'

import Row from 'components/Row'
import { useNFTState } from 'state/nft/hooks'

import { Card } from './styleds'

export const NFTCards = () => {
  const { images } = useNFTState()
  const imageComponents = useMemo(() => {
    return Object.keys(images).map((nft) => {
      const metadata = images[nft]
      return (
        <Card key={metadata.image}>
          <img src={metadata.image} width="300" height="300" />
        </Card>
      )
    })
  }, [images])
  return (
    <Row flexWrap="wrap" style={{ gap: '25px', padding: '0 15px' }}>
      {imageComponents}
    </Row>
  )
}
