import { getPadding } from 'app/components/PageHeader/utils'
import { cleanup } from 'test-utils'

describe('utils getPadding', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct Padding value', () => {
    expect(getPadding('center', true, false, 300)).toEqual('324px')
    expect(getPadding('flex-start', true, false, 300)).toEqual(0)
    expect(getPadding('center', false, false, 300)).toEqual(0)
    expect(getPadding('center', false, true, 300)).toEqual(0)
    expect(getPadding('center', true, true, 300)).toEqual(0)
  })
})
