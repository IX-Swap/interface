import { fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOTeamAddButton,
  DSOTeamAddButtonProps
} from 'v2/app/components/DSO/components/DSOTeamAddButton'

describe('DSOTeamAddButton', () => {
  const props: DSOTeamAddButtonProps = {
    append: jest.fn()
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOTeamAddButton {...props} />)
  })

  it('invokes append function with index on button click', async () => {
    const { getByRole } = render(<DSOTeamAddButton {...props} />)

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(props.append).toHaveBeenCalledTimes(1)
    })
  })
})
