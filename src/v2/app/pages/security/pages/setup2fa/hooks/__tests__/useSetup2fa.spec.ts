import { renderHook, cleanup } from '@testing-library/react-hooks'
import { useSetup2fa } from 'v2/app/pages/security/pages/setup2fa/hooks/useSetup2fa'
describe('useSetup2fa', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('has correct default values', () => {
    const { result } = renderHook(() => useSetup2fa())

    expect(result.current.isLoading).toEqual(true)
  })
})
