import { act, renderHook } from '@testing-library/react-hooks'
import { waitFor, cleanup } from 'test-utils'
import * as useCachedUserHook from 'hooks/auth/useCachedUser'
import {
  getUserRoles,
  AppRole,
  hasRole,
  useIsAdmin,
  useIsIssuer,
  useIsAuthorizer,
  useIsAccredited,
  useHasSpecialRole,
  useIsFundManager
} from '../acl'
import { user } from '__fixtures__/user'

describe('getUserRoles', () => {
  it('returns empty array if undefined', () => {
    expect(getUserRoles()).toEqual([])
  })

  it('returns empty array if empty string', () => {
    expect(getUserRoles('')).toEqual([''])
  })

  it('returns empty array if empty string', () => {
    expect(getUserRoles('admin,authorizer,issuer,accredited')).toEqual([
      AppRole.ADMIN,
      AppRole.AUTHORIZER,
      AppRole.ISSUER,
      AppRole.ACCREDITED
    ])
  })
})

describe('hasRole', () => {
  it('returns true if the roleToCheck exists in roles input string', () => {
    expect(
      hasRole('admin,authorizer,issuer,accredited', AppRole.ADMIN)
    ).toEqual(true)
    expect(
      hasRole('admin,authorizer,issuer,accredited', AppRole.AUTHORIZER)
    ).toEqual(true)
    expect(
      hasRole('admin,authorizer,issuer,accredited', AppRole.ISSUER)
    ).toEqual(true)
  })

  it('returns false if the roleToCheck does not exist in roles input string', () => {
    expect(hasRole('admin,authorizer', AppRole.ISSUER)).toEqual(false)
    expect(hasRole('admin,authorizer', AppRole.ACCREDITED)).toEqual(false)
  })
})

describe('useIsAdmin', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns true if user is admin', async () => {
    jest
      .spyOn(useCachedUserHook, 'useCachedUser')
      .mockReturnValue({ ...user, roles: 'admin,authorizer' })

    await act(async () => {
      const { result } = renderHook(() => useIsAdmin())

      await waitFor(() => expect(result.current).toBe(true))
    })
  })

  it('returns false if user is not admin', async () => {
    jest
      .spyOn(useCachedUserHook, 'useCachedUser')
      .mockReturnValue({ ...user, roles: 'authorizer,issuer' })

    await act(async () => {
      const { result } = renderHook(() => useIsAdmin())

      await waitFor(() => expect(result.current).toBe(false))
    })
  })
})

describe('useIsAuthorizer', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns true if user is authorizer', async () => {
    jest
      .spyOn(useCachedUserHook, 'useCachedUser')
      .mockReturnValue({ ...user, roles: 'admin,authorizer' })

    await act(async () => {
      const { result } = renderHook(() => useIsAuthorizer())

      await waitFor(() => expect(result.current).toBe(true))
    })
  })

  it('returns false if user is not authorizer', async () => {
    jest
      .spyOn(useCachedUserHook, 'useCachedUser')
      .mockReturnValue({ ...user, roles: 'admin,issuer' })

    await act(async () => {
      const { result } = renderHook(() => useIsAuthorizer())

      await waitFor(() => expect(result.current).toBe(false))
    })
  })
})

describe('useIsIssuer', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns true if user is issuer', async () => {
    jest
      .spyOn(useCachedUserHook, 'useCachedUser')
      .mockReturnValue({ ...user, roles: 'admin,issuer' })

    await act(async () => {
      const { result } = renderHook(() => useIsIssuer())

      await waitFor(() => expect(result.current).toBe(true))
    })
  })

  it('returns false if user is not issuer', async () => {
    jest
      .spyOn(useCachedUserHook, 'useCachedUser')
      .mockReturnValue({ ...user, roles: 'admin,authorizer' })

    await act(async () => {
      const { result } = renderHook(() => useIsIssuer())

      await waitFor(() => expect(result.current).toBe(false))
    })
  })
})

describe('useIsAccredited', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns true if user is accredited', async () => {
    jest
      .spyOn(useCachedUserHook, 'useCachedUser')
      .mockReturnValue({ ...user, roles: 'admin,accredited' })

    await act(async () => {
      const { result } = renderHook(() => useIsAccredited())

      await waitFor(() => expect(result.current).toBe(true))
    })
  })

  it('returns false if user is not accredited', async () => {
    jest
      .spyOn(useCachedUserHook, 'useCachedUser')
      .mockReturnValue({ ...user, roles: 'admin,authorizer' })

    await act(async () => {
      const { result } = renderHook(() => useIsAccredited())

      await waitFor(() => expect(result.current).toBe(false))
    })
  })
})

describe('useHasSpecialRole', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns true if user is admin', async () => {
    jest
      .spyOn(useCachedUserHook, 'useCachedUser')
      .mockReturnValue({ ...user, roles: 'admin,accredited' })

    await act(async () => {
      const { result } = renderHook(() => useHasSpecialRole())

      await waitFor(() => expect(result.current).toBe(true))
    })
  })
})

describe('useIsFundManager', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns true if user is fund manager', async () => {
    jest
      .spyOn(useCachedUserHook, 'useCachedUser')
      .mockReturnValue({ ...user, roles: 'fundmanager' })

    await act(async () => {
      const { result } = renderHook(() => useIsFundManager())

      await waitFor(() => expect(result.current).toBe(true))
    })
  })

  it('returns false if user is not fund manager', async () => {
    jest
      .spyOn(useCachedUserHook, 'useCachedUser')
      .mockReturnValue({ ...user, roles: 'issuer' })

    await act(async () => {
      const { result } = renderHook(() => useIsFundManager())

      await waitFor(() => expect(result.current).toBe(false))
    })
  })
})
