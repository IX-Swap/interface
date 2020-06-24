import React from 'react'
import PostOrderModule from './modules'
import BidsAsksComponent from './BidsAsks'
const { PostOrderProvider } = PostOrderModule

const BidsAsks = props => {
  return (
    <PostOrderProvider>
      <BidsAsksComponent {...props} />
    </PostOrderProvider>
  )
}

export default BidsAsks
