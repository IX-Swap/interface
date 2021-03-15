import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CorporateView,
  CorporateViewProps
} from 'app/pages/identity/components/CorporateView'
import { corporate } from '__fixtures__/identity'

window.URL.revokeObjectURL = jest.fn()

describe('CorporateView', () => {
  const props: CorporateViewProps = { data: corporate }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CorporateView {...props} />)
  })
})
