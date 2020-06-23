import React from 'react'
import { PasswordResetProvider } from './PasswordResetContext'
import Reset from './Reset'

export default () => (
  <PasswordResetProvider>
    <Reset />
  </PasswordResetProvider>
)
