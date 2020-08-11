//
import React from 'react'
import Commitments from './components/Commitments'
import Module from './modules'

const { AuthorizerCommitmentListProvider } = Module

const CommitmentsWithProvider = () => (
  <AuthorizerCommitmentListProvider>
    <Commitments />
  </AuthorizerCommitmentListProvider>
)

export default CommitmentsWithProvider
