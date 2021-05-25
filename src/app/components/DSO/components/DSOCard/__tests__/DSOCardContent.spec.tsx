import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOCardContent,
  DSOCardContentProps
} from 'app/components/DSO/components/DSOCard/DSOCardContent'
import { dso } from '__fixtures__/authorizer'
import { DSOInvestLink } from 'app/components/DSO/components/DSOInvestLink'
// import { DSOProgressBar } from 'app/__tests__/DSO/__tests__/DSOProgressBar'

jest.mock('app/__tests__/DSO/__tests__/DSOInvestLink', () => ({
  DSOInvestLink: jest.fn(() => null)
}))
jest.mock('app/__tests__/DSO/__tests__/DSOProgressBar', () => ({
  DSOProgressBar: jest.fn(() => null)
}))

describe('DSOCardContent', () => {
  const props: DSOCardContentProps = { dso: dso }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOCardContent {...props} />)
  })

  it('renders DSOInvestLink with correct props', () => {
    render(<DSOCardContent {...props} />)

    expect(DSOInvestLink).toHaveBeenCalledTimes(1)
    expect(DSOInvestLink).toHaveBeenCalledWith({ dso: props.dso }, {})
  })

  // it('renders DSOProgressBar with correct props', () => {
  //   render(<DSOCardContent {...props} />)

  //   expect(DSOProgressBar).toHaveBeenCalledTimes(1)
  //   expect(DSOProgressBar).toHaveBeenCalledWith({ dso: props.dso }, {})
  // })
})
