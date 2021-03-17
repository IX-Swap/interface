import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  SupportingDocuments,
  SupportingDocumentsProps
} from 'app/components/SupportingDocuments'
import { documents } from '__fixtures__/identity'

describe('SupportingDocuments', () => {
  const props: SupportingDocumentsProps = { data: documents }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<SupportingDocuments {...props} />)
  })
})
