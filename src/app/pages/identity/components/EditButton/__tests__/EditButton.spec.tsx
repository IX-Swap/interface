import { EditButton } from 'app/pages/_identity/components/EditButton/EditButton'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('EditButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<EditButton link='/app/edit' />)
  })
})
