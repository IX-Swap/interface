import { renderHook, cleanup } from '@testing-library/react-hooks'
import { useEnable2fa } from 'v2/app/pages/security/pages/setup2fa/hooks/useEnable2fa'
describe('useEnable2fa', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('has correct default values', () => {
    const { result } = renderHook(() => useEnable2fa())

    expect(result.current[1].isLoading).toEqual(false)
  })
})
