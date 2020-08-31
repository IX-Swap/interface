/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { BanksList } from '../BanksList'

describe('BanksList', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', async () => {
    render(<BanksList />)
  })
})
