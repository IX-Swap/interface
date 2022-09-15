import {
  AssetSelect,
  AssetSelectProps
} from 'components/form/AssetSelect/AssetSelect'
import React from 'react'
import { render } from 'test-utils'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('DSOIntroduction', () => {
  const props: AssetSelectProps = {}
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    const { container } = render(<AssetSelect {...props} />)
    expect(container).toMatchSnapshot()
  })
})
