import { act, renderHook } from '@testing-library/react-hooks'
import { waitFor, cleanup } from 'test-utils'
import * as useDSOsByUserIdHook from 'app/pages/issuance/hooks/useDSOsByUserId'
import * as useIssuanceRouterHook from 'app/pages/issuance/router'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { dso } from '__fixtures__/authorizer'
import { useDSOFilter } from 'app/pages/issuance/hooks/useDSOFilter'

describe('useDSOFilter', () => {
  const replace = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns status correctly', async () => {
    jest
      .spyOn(useDSOsByUserIdHook, 'useDSOsByUserId')
      .mockReturnValue(generateInfiniteQueryResult({ isLoading: true }))
    jest.spyOn(useIssuanceRouterHook, 'useIssuanceRouter').mockReturnValue({
      params: { dsoId: dso._id, issuerId: dso.user },
      replace
    } as any)

    await act(async () => {
      const { result } = renderHook(() => useDSOFilter())

      await waitFor(
        () => {
          expect(result.current.isLoading).toBe(true)
          expect(result.current.selected).toBe(`${dso._id}:${dso.user}`)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns selected dso correctly', async () => {
    jest
      .spyOn(useDSOsByUserIdHook, 'useDSOsByUserId')
      .mockReturnValue(generateInfiniteQueryResult({ list: [dso] }))
    jest.spyOn(useIssuanceRouterHook, 'useIssuanceRouter').mockReturnValue({
      params: { dsoId: dso._id, issuerId: dso.user },
      replace
    } as any)

    await act(async () => {
      const { result } = renderHook(() => useDSOFilter())

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(result.current.selected).toBe(`${dso._id}:${dso.user}`)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns selected dso as null if dsoId is invalid', async () => {
    jest
      .spyOn(useDSOsByUserIdHook, 'useDSOsByUserId')
      .mockReturnValue(generateInfiniteQueryResult({ list: [dso] }))
    jest.spyOn(useIssuanceRouterHook, 'useIssuanceRouter').mockReturnValue({
      params: { dsoId: null },
      replace
    } as any)

    await act(async () => {
      const { result } = renderHook(() => useDSOFilter())

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(result.current.selected).toBe(null)
        },
        { timeout: 1000 }
      )
    })
  })
})
