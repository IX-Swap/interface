import { renderHook, cleanup } from '@testing-library/react-hooks'
import * as SecurityRouter from 'v2/app/pages/security/routes'
import { useChangePassword } from 'v2/app/pages/security/pages/changePassword/hooks/useChangePassword'
import { generateRouter } from '__fixtures__/useRouter'

describe('useChangePassword', () => {
  const renderRoutes = jest.fn()
  const label = 'Test Label'

  beforeEach(() => {
    jest.spyOn(SecurityRouter, 'useSecurityRouter').mockReturnValue(
      generateRouter({
        current: { path: '', label },
        routes: SecurityRouter.SecurityRoute,
        renderRoutes
      })
    )
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('has correct default values', () => {
    const { result } = renderHook(() => useChangePassword())

    expect(result.current[0]).toEqual(expect.any(Function))
  })
})
