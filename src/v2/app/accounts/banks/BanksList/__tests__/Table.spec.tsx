/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Table } from '../Table'

describe('Table', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    render(<Table />)
  })
})
