import { render, cleanup } from 'test-utils'
import {
  renderTicker,
  renderMoney
} from 'app/pages/exchange/components/OpenOrders/columns'

describe('columns', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders renderTicker correctly', () => {
    const { getByText } = render(renderTicker('SYM/BOL', undefined))
    expect(getByText('SYM/BOL')).toBeTruthy()
  })

  it('renders renderMoney correctly', () => {
    const { getByText } = render(renderMoney(10000.21, undefined))
    expect(getByText('10,000.21')).toBeTruthy()
  })
})
