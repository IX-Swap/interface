import { fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { render } from 'test-utils'
import {
  DSOTeamRemoveButton,
  DSOTeamRemoveButtonProps
} from 'app/components/DSO/components/DSOTeamRemoveButton'

describe('DSOTeamRemoveButton', () => {
  const props: DSOTeamRemoveButtonProps = {
    index: 1,
    remove: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DSOTeamRemoveButton {...props} />)
  })

  it('invokes remove function with index on button click', async () => {
    const { getByRole } = render(<DSOTeamRemoveButton {...props} />)

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(props.remove).toHaveBeenCalledTimes(1)
      expect(props.remove).toHaveBeenCalledWith(1)
    })
  })
})
