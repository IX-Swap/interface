import React from 'react'
import { render } from 'test-utils'
import { DSODataroomView } from 'app/components/DSO/components/DSODataroomView'
import { dso } from '__fixtures__/authorizer'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

describe('DSODataroomView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DSODataroomView dso={dso} />)
  })

  it('matches snapshot', () => {
    const { container } = render(<DSODataroomView dso={dso} />)

    expect(container).toMatchSnapshot()
  })
})
