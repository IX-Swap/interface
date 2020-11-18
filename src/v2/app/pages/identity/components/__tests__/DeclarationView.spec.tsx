import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DeclarationView,
  DeclarationViewProps
} from 'v2/app/pages/identity/components/DeclarationView'
import { DeclarationItem } from 'v2/app/pages/identity/components/DeclarationItem'
import { individual } from '__fixtures__/identity'
import { formatDeclarations } from 'v2/app/pages/identity/utils'

jest.mock('v2/app/pages/identity/components/DeclarationItem', () => ({
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

  it('renders DeclarationItem with correct props', () => {
    render(<DeclarationView {...props} />)

    expect(DeclarationItem).toHaveBeenCalledTimes(
      Object.entries(formatDeclarations(props.type, props.data)).length
    )
  })
})
