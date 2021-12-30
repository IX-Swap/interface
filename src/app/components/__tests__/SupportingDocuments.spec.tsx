import React from 'react'
import { render } from 'test-utils'
import {
  SupportingDocuments,
  SupportingDocumentsProps
} from 'app/components/SupportingDocuments'
import { documents } from '__fixtures__/identity'

describe('SupportingDocuments', () => {
  const props: SupportingDocumentsProps = { data: documents }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<SupportingDocuments {...props} />)
  })
})
