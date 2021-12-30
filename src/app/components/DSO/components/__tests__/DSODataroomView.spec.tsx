import React from 'react'
import { render } from 'test-utils'
import { DSODataroomView } from 'app/components/DSO/components/DSODataroomView'
import { dso } from '__fixtures__/authorizer'
import * as Typography from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

jest.mock('app/components/DSO/components/FormSectionHeader', () => ({
  FormSectionHeader: jest.fn(() => null)
}))

jest.mock('components/dataroom/DataroomHeader', () => ({
  DataroomHeader: jest.fn(() => null)
}))

jest.mock('components/dataroom/DataroomViewRow', () => ({
  DataroomViewRow: jest.fn(() => null)
}))

describe('DSODataroomView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DSODataroomView dso={dso} />)
  })

  it('renders title when showTitle is false', () => {
    render(<DSODataroomView dso={dso} showTitle={false} />)

    expect(FormSectionHeader).toHaveBeenCalledTimes(0)
  })

  it('renders title when showTitle is true', () => {
    render(<DSODataroomView dso={dso} showTitle />)

    expect(FormSectionHeader).toHaveBeenCalledTimes(1)
  })

  it('renders subscription document title with correct props', () => {
    render(<DSODataroomView dso={dso} />)

    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        variant: 'h5',
        children: 'Subscription Document'
      }),
      {}
    )
  })

  it('renders subscription document title with correct props when showTitle is false', () => {
    render(<DSODataroomView dso={dso} />)

    expect(Typography).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        variant: 'h5',
        children: 'Subscription Document'
      }),
      {}
    )
  })

  it('renders message when subscription document is undefined ', () => {
    render(
      <DSODataroomView dso={{ ...dso, subscriptionDocument: undefined }} />
    )

    expect(Typography).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        children: 'No subscription document provided'
      }),
      {}
    )
  })

  it('renders subscription document components with correct props', () => {
    render(<DSODataroomView dso={dso} />)

    expect(DataroomHeader).toHaveBeenCalledTimes(1)
    expect(DataroomViewRow).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Subscription Document',
        document: dso.subscriptionDocument,
        showDivider: true
      }),
      {}
    )
  })
})
