import React from 'react'
import { render } from 'test-utils'
import {
  SettingsRow,
  SettingsRowProps
} from 'app/pages/security/pages/landing/components/SettingsRow'

describe('SettingsRow', () => {
  const props: SettingsRowProps = {
    name: 'setting-row',
    action: <div data-testid='action' />,
    image:
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<SettingsRow {...props} />)
  })

  it('does not renders image if image prop is undefined', () => {
    const { queryByAltText } = render(
      <SettingsRow {...props} image={undefined} />
    )

    expect(queryByAltText(props.name)).toBeNull()
  })

  it('renders image as expected if the image prop was provided', () => {
    const { getByAltText } = render(<SettingsRow {...props} />)
    const image = getByAltText(props.name)

    expect(image).toBeInstanceOf(HTMLImageElement)
    expect(image).toHaveAttribute('src', props.image)
  })

  it('renders name correctly', () => {
    const { container } = render(<SettingsRow {...props} />)

    expect(container).toHaveTextContent(props.name)
  })

  it('renders action element as expected', () => {
    const { getByTestId } = render(<SettingsRow {...props} />)

    expect(getByTestId('action')).toBeInTheDocument()
  })
})
