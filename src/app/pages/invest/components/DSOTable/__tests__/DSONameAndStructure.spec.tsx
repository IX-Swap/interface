import React from 'react'
import { render } from 'test-utils'
import { corporate, dso } from '__fixtures__/authorizer'
import {
  DSONameAndStructure,
  DSONameAndStructureProps
} from '../DSONameAndStructure'

const sampleProps: DSONameAndStructureProps = {
  corporate: corporate,
  dso: dso
}

describe('DSO Name', () => {
  URL.revokeObjectURL = () => {}

  it('renders without any errors', () => {
    render(<DSONameAndStructure {...sampleProps} />)
  })

  it('renders received props correctly', () => {
    sampleProps.dso.capitalStructure = 'structure-test'
    sampleProps.corporate.companyLegalName = 'name-test'
    const { getByText } = render(<DSONameAndStructure {...sampleProps} />)
    expect(getByText('structure-test')).toBeTruthy()
    expect(getByText('name-test')).toBeTruthy()
  })
})
