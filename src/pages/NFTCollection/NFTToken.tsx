import React from 'react'

interface NFTTokenProps {
  uri: string
}

const NFTToken = (props: NFTTokenProps) => {
  return <div>Token URI: {props.uri}</div>
}

export default NFTToken
