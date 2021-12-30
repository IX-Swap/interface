import {
  DeclarationsList,
  DeclarationsListProps
} from 'app/pages/identity/components/DeclarationsList/DeclarationsList'
import React from 'react'
import { render } from 'test-utils'

describe('DeclarationList', () => {
  const props: DeclarationsListProps = {
    title: 'Tax Declaration',
    data: {
      taxOne: true,
      taxTwo: false
    },
    labelMap: {
      taxOne: 'Tax One',
      taxTwo: 'Tax Two'
    }
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DeclarationsList {...props} />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(<DeclarationsList {...props} />)

    expect(getByText('Tax Declaration')).toBeTruthy()
    expect(getByText('Tax One')).toBeTruthy()
    expect(getByText('Tax Two')).toBeTruthy()
  })
})
