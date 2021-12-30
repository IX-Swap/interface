import {
  DropzoneDisplay,
  DropzoneDisplayProps
} from 'components/dataroom/DropzoneDisplay'
import React from 'react'
import { render } from 'test-utils'
import { document } from '__fixtures__/identity'
import * as useAuthHook from 'hooks/auth/useAuth'
import { Avatar } from 'components/Avatar'
import { DropzoneFallback } from 'components/dataroom/DropzoneFallback'

window.URL.revokeObjectURL = jest.fn()

jest.mock('components/dataroom/DropzoneFallback', () => ({
  DropzoneFallback: jest.fn(() => null)
}))

jest.mock('components/Avatar', () => ({
  Avatar: jest.fn(() => null)
}))

describe('DropzoneDisplay', () => {
  const props: DropzoneDisplayProps = {
    multiple: false,
    hasError: true,
    value: document
  }

  beforeEach(() => {
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: false,
      user: undefined
    })
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DropzoneDisplay {...props} />)
  })

  it('renders Avatar if multiple is false', () => {
    render(<DropzoneDisplay {...props} />)

    expect(Avatar).toHaveBeenCalled()
  })

  it('renders DropzoneFallback if multiple is true', () => {
    render(<DropzoneDisplay {...props} multiple={true} />)

    expect(DropzoneFallback).toHaveBeenCalled()
  })
})
