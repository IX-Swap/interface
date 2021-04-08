import { IdentityDocumentsView } from 'app/pages/identity/components/IdentityDocumentsView/IdentityDocumentsView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { individual } from '__fixtures__/identity'

describe('IdentityDocumentsView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<IdentityDocumentsView data={individual.documents} />)
  })
})
