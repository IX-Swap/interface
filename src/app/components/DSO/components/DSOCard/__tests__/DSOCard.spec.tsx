import React from 'react'
import { render } from 'test-utils'
import {
  DSOCard,
  DSOCardProps
} from 'app/components/DSO/components/DSOCard/DSOCard'
import { dso } from '__fixtures__/authorizer'
import { DSOCardCover } from 'app/components/DSO/components/DSOCard/DSOCardCover'
import { DSOCardContent } from 'app/components/DSO/components/DSOCard/DSOCardContent'

jest.mock('app/components/DSO/components/DSOCard/DSOCardCover', () => ({
  DSOCardCover: jest.fn(() => null)
}))
jest.mock('app/components/DSO/components/DSOCard/DSOCardContent', () => ({
  DSOCardContent: jest.fn(() => null)
}))

describe('DSOCard', () => {
  const props: DSOCardProps = { dso: dso, viewURL: 'foo' }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DSOCardCover with correct props', () => {
    render(<DSOCard {...props} />)

    expect(DSOCardCover).toHaveBeenCalledTimes(1)
    expect(DSOCardCover).toHaveBeenCalledWith(
      { dso: props.dso, viewURL: props.viewURL },
      {}
    )
  })

  it('renders DSOCardContent with correct props', () => {
    render(<DSOCard {...props} />)

    expect(DSOCardContent).toHaveBeenCalledTimes(1)
    expect(DSOCardContent).toHaveBeenCalledWith({ dso: props.dso }, {})
  })
})
