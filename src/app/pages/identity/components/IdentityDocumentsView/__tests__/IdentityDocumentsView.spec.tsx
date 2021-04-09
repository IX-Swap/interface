import {
  DocumentsViewProps,
  IdentityDocumentsView
} from 'app/pages/identity/components/IdentityDocumentsView/IdentityDocumentsView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { documents } from '__fixtures__/identity'

describe('IdentityDocumentsView', () => {
  const props: DocumentsViewProps = {
    data: documents,
    type: 'individual'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<IdentityDocumentsView {...props} />)
  })
})
