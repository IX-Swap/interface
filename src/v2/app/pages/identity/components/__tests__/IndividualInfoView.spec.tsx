import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  IndividualInfoView,
  IndividualInfoViewProps
} from 'v2/app/pages/identity/components/IndividualInfoView'
import { individual } from '__fixtures__/identity'
import { user } from '__fixtures__/user'

window.URL.revokeObjectURL = jest.fn()

describe('IndividualInfoView', () => {
  const props: IndividualInfoViewProps = { data: { ...individual, user: user } }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualInfoView {...props} />)
  })
})
