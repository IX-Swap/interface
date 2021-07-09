import { DataPreview } from 'app/pages/identity/components/IndividualPreview/DataPreview'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { corporate } from '__fixtures__/identity'

describe('DataPreview', () => {
  const fields = [
    {
      key: 'Label One',
      value: 'Value One'
    },
    {
      key: 'Label Two',
      value: 'Value Two'
    }
  ]

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <DataPreview
        avatar={corporate.logo}
        userId={corporate.user._id}
        fields={fields}
      />
    )
  })
})
