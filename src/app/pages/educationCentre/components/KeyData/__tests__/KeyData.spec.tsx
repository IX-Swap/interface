import { KeyData } from 'app/pages/educationCentre/components/KeyData/KeyData'
import { sampleSecurity } from 'app/pages/educationCentre/components/Securities/__tests__/SecurityCard.spec'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('KeyData', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<KeyData data={sampleSecurity} />)
  })

  it('renders correct value for Estimated Market Capitalization', () => {
    const { getByText } = render(<KeyData data={sampleSecurity} />)

    expect(getByText('Estimated Market Capitalization:')).toBeTruthy()
    expect(getByText('$ 0.00')).toBeTruthy()
  })

  it('does not render Estimated Market Capitalization when value is null', () => {
    const { queryByText } = render(
      <KeyData data={{ ...sampleSecurity, marketCapitalization: null }} />
    )

    expect(queryByText('Estimated Market Capitalization:')).toBeFalsy()
  })

  it('renders correct value for Current Price', () => {
    const { getByText } = render(<KeyData data={sampleSecurity} />)

    expect(getByText('Current Price:')).toBeTruthy()
    expect(getByText('$ 81.00')).toBeTruthy()
  })

  it('does not render Current Price when value is null', () => {
    const { queryByText } = render(
      <KeyData data={{ ...sampleSecurity, currentPrice: null }} />
    )

    expect(queryByText('Current Price:')).toBeFalsy()
  })

  it('renders correct value for Issuance Date', () => {
    const { getByText } = render(<KeyData data={sampleSecurity} />)

    expect(getByText('Issuance Date:')).toBeTruthy()
    expect(getByText('2020-08-31')).toBeTruthy()
  })

  it('does not render Issuance Date when value is null', () => {
    const { queryByText } = render(
      <KeyData data={{ ...sampleSecurity, issuanceDate: null }} />
    )

    expect(queryByText('Issuance Date:')).toBeFalsy()
  })

  it('renders correct value for Country', () => {
    const { getByText } = render(<KeyData data={sampleSecurity} />)

    expect(getByText('Country:')).toBeTruthy()
    expect(getByText('United States')).toBeTruthy()
  })

  it('does not render Country when value is null', () => {
    const { queryByText } = render(
      <KeyData data={{ ...sampleSecurity, country: null }} />
    )

    expect(queryByText('Country:')).toBeFalsy()
  })

  it('renders correct value for Industry', () => {
    const { getByText } = render(<KeyData data={sampleSecurity} />)

    expect(getByText('Industry:')).toBeTruthy()
    expect(getByText('Real Estate')).toBeTruthy()
  })

  it('does not render Industry when value is null', () => {
    const { queryByText } = render(
      <KeyData data={{ ...sampleSecurity, industry: null }} />
    )

    expect(queryByText('Industry:')).toBeFalsy()
  })

  it('renders correct value for Protocol', () => {
    const { getByText } = render(<KeyData data={sampleSecurity} />)

    expect(getByText('Protocol:')).toBeTruthy()
    expect(getByText('ERC-20')).toBeTruthy()
  })

  it('does not render Protocol when value is null', () => {
    const { queryByText } = render(
      <KeyData data={{ ...sampleSecurity, protocol: null }} />
    )

    expect(queryByText('Protocol:')).toBeFalsy()
  })

  it('renders correct value for Exchange', () => {
    const { getByText } = render(<KeyData data={sampleSecurity} />)

    expect(getByText('Exchange:')).toBeTruthy()
    expect(getByText('Uniswap')).toBeTruthy()
  })

  it('does not render Exchange when value is null', () => {
    const { queryByText } = render(
      <KeyData data={{ ...sampleSecurity, exchange: null }} />
    )

    expect(queryByText('Exchange:')).toBeFalsy()
  })

  it('renders correct value for Token Supply', () => {
    const { getByText } = render(<KeyData data={sampleSecurity} />)

    expect(getByText('Token Supply:')).toBeTruthy()
    expect(getByText('1300')).toBeTruthy()
  })

  it('does not render Token Supply when value is null', () => {
    const { queryByText } = render(
      <KeyData data={{ ...sampleSecurity, tokenSupply: null }} />
    )

    expect(queryByText('Token Supply:')).toBeFalsy()
  })

  it('renders correct value for Tokens Offered', () => {
    const { getByText } = render(<KeyData data={sampleSecurity} />)

    expect(getByText('Tokens Offered:')).toBeTruthy()
    expect(getByText('1200')).toBeTruthy()
  })

  it('does not render Tokens Offered when value is null', () => {
    const { queryByText } = render(
      <KeyData data={{ ...sampleSecurity, tokensOffered: null }} />
    )

    expect(queryByText('Tokens Offered:')).toBeFalsy()
  })

  it('renders correct value for Tokens Reserved', () => {
    const { getByText } = render(<KeyData data={sampleSecurity} />)

    expect(getByText('Tokens Reserved:')).toBeTruthy()
    expect(getByText('100')).toBeTruthy()
  })

  it('does not render Tokens Reserved when value is null', () => {
    const { queryByText } = render(
      <KeyData data={{ ...sampleSecurity, reserved: null }} />
    )

    expect(queryByText('Tokens Reserved:')).toBeFalsy()
  })
})
