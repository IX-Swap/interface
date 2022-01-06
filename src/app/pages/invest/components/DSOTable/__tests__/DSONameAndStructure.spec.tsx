import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import {
  DSONameAndStructure,
  DSONameAndStructureProps
} from '../DSONameAndStructure'

const sampleProps: DSONameAndStructureProps = {
  tokenName: 'CoinX',
  dso: dso
}

describe('DSO Name', () => {
  URL.revokeObjectURL = () => {}

  it.skip('renders without any errors', () => {
    render(<DSONameAndStructure {...sampleProps} />)
  })

  it('renders received props correctly', () => {
    sampleProps.dso.capitalStructure = 'structure-test'
    sampleProps.tokenName = 'name-test'
    const { getByText } = render(<DSONameAndStructure {...sampleProps} />)
    expect(getByText('structure-test')).toBeTruthy()
    expect(getByText('name-test')).toBeTruthy()
  })
})
