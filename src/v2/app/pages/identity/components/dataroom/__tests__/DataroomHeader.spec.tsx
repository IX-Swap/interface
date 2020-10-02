/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DataroomHeader } from 'v2/app/pages/identity/components/dataroom/DataroomHeader'

describe('DataroomHeader', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DataroomHeader />)
  })
})
