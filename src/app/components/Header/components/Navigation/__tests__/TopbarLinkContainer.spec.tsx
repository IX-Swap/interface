import React from 'react'
import { render } from 'test-utils'
import { TopbarLinkContainer } from 'app/components/Header/components/Navigation/TopbarLinkContainer/TopbarLinkContainer'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { fireEvent, waitFor } from '@testing-library/dom'

jest.mock('@mui/icons-material/ArrowDropDown', () => jest.fn(() => null))

const onClick = jest.fn()

describe('TopbarLinkContainer', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders TopbarLinkContainer with correct content', () => {
    const props = {
      link: '/test',
      label: 'label'
    }

    const { container } = render(<TopbarLinkContainer {...props} />)

    expect(container).toHaveTextContent(props.label)
    expect(ArrowDropDownIcon).toHaveBeenCalledTimes(0)
  })

  it('renders TopbarLinkContainer with correct content if disabled is true', () => {
    const props = {
      link: '/test',
      label: 'label',
      disabled: true
    }

    const { container } = render(<TopbarLinkContainer {...props} />)

    expect(container).toHaveTextContent(props.label)
    expect(ArrowDropDownIcon).toHaveBeenCalledTimes(1)
  })

  it('invokes onClick function if prop onClick is not undefined', async () => {
    const props = {
      link: '/test',
      label: 'label',
      disabled: true,
      onClick: onClick
    }

    const { getByRole } = render(<TopbarLinkContainer {...props} />)

    fireEvent.click(getByRole('link'))

    await waitFor(() => {
      expect(props.onClick).toHaveBeenCalled()
    })
  })
})
