import { FieldsDisplay } from 'app/pages/identity/components/IndividualPreview/FieldDisplay'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('FieldDisplay', () => {
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
    render(<FieldsDisplay fields={fields} />)
  })
})
