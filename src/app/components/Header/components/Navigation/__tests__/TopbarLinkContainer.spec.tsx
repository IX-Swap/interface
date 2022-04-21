import React from 'react'
import { render } from 'test-utils'
import { TopbarLinkContainer } from 'app/components/Header/components/Navigation/TopbarLinkContainer/TopbarLinkContainer'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { fireEvent, waitFor } from '@testing-library/dom'
import * as useAuth from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { TwoFADialog } from 'app/components/TwoFADialog/TwoFADialog'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'

jest.mock('@mui/icons-material/ArrowDropDown', () => jest.fn(() => null))
jest.mock('app/components/TwoFADialog/TwoFADialog', () => ({
  TwoFADialog: jest.fn(() => null)
}))

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

  it('not invokes onClick function and render 2fa dialog if prop onClick is not undefined, enable2Fa is false and link prop is IssuanceRoute.create', async () => {
    const objResponse = {
      user: { ...user, enable2Fa: false }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

    const props = {
      link: '/test',
      label: 'label',
      disabled: true,
      onClick: onClick
    }

    const { getByRole } = render(
      <TopbarLinkContainer {...{ ...props, link: IssuanceRoute.create }} />
    )

    fireEvent.click(getByRole('link'))

    await waitFor(() => {
      expect(props.onClick).toHaveBeenCalledTimes(0)
      expect(TwoFADialog).toHaveBeenCalledWith(
        expect.objectContaining({
          isOpen: true,
          enable2Fa: objResponse.user.enable2Fa
        }),
        {}
      )
    })
  })

  it('not invokes onClick function and render 2fa dialog if prop onClick is not undefined, enable2Fa is false and link prop is OTCMarketRoute.createListing', async () => {
    const objResponse = {
      user: { ...user, enable2Fa: false }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

    const props = {
      link: '/test',
      label: 'label',
      disabled: true,
      onClick: onClick
    }

    const { getByRole } = render(
      <TopbarLinkContainer
        {...{ ...props, link: OTCMarketRoute.createListing }}
      />
    )

    fireEvent.click(getByRole('link'))

    await waitFor(() => {
      expect(props.onClick).toHaveBeenCalledTimes(0)
      expect(TwoFADialog).toHaveBeenCalledWith(
        expect.objectContaining({
          isOpen: true,
          enable2Fa: objResponse.user.enable2Fa
        }),
        {}
      )
    })
  })
})
