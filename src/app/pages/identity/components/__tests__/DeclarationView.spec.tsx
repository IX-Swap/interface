import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DeclarationView,
  DeclarationViewProps
} from 'app/pages/identity/components/DeclarationView'
import { individual } from '__fixtures__/identity'

jest.mock('app/pages/identity/components/DeclarationItem', () => ({
  DeclarationItem: jest.fn(() => null)
}))

describe('DeclarationView', () => {
  const props: DeclarationViewProps = {
    data: individual.declarations,
    type: 'individual'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DeclarationView {...props} />)
  })
})
