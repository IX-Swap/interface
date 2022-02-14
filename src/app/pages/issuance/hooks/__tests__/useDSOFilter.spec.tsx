import { act, renderHook } from '@testing-library/react-hooks'
import { waitFor, BaseProviders } from 'test-utils'
import * as useDSOsByUserIdHook from 'app/pages/issuance/hooks/useDSOsByUserId'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { dso } from '__fixtures__/authorizer'
import { useDSOFilter } from 'app/pages/issuance/hooks/useDSOFilter'
import { history } from 'config/history'
import { generatePath, Route } from 'react-router-dom'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import React, { PropsWithChildren } from 'react'

describe('useDSOFilter', () => {
  beforeEach(() => {
    history.push(
      generatePath(IssuanceRoute.insight, {
        dsoId: dso._id,
        issuerId: dso.user
      })
    )
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns status correctly', async () => {
    jest
      .spyOn(useDSOsByUserIdHook, 'useDSOsByUserId')
      .mockReturnValue(generateInfiniteQueryResult({ isLoading: true }))

    await act(async () => {
      const { result } = renderHook(() => useDSOFilter(), {
        wrapper: ({ children }: PropsWithChildren<any>) => (
          <BaseProviders>
            <Route path={IssuanceRoute.insight}>{children}</Route>
          </BaseProviders>
        )
      })

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

    await act(async () => {
      const { result } = renderHook(() => useDSOFilter(), {
        wrapper: ({ children }: PropsWithChildren<any>) => (
          <BaseProviders>
            <Route path={IssuanceRoute.insight}>{children}</Route>
          </BaseProviders>
        )
      })

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(result.current.selected).toBe(`${dso._id}:${dso.user}`)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns selected dso correctly when type is commitments', async () => {
    history.push(
      generatePath(IssuanceRoute.commitments, {
        dsoId: dso._id,
        issuerId: dso.user
      })
    )

    jest
      .spyOn(useDSOsByUserIdHook, 'useDSOsByUserId')
      .mockReturnValue(generateInfiniteQueryResult({ list: [dso] }))

    await act(async () => {
      const { result } = renderHook(() => useDSOFilter('commitments'), {
        wrapper: ({ children }: PropsWithChildren<any>) => (
          <BaseProviders>
            <Route path={IssuanceRoute.commitments}>{children}</Route>
          </BaseProviders>
        )
      })

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
      .mockReturnValue(generateInfiniteQueryResult({ list: [] }))

    await act(async () => {
      history.push(
        generatePath(IssuanceRoute.insight, {
          dsoId: ':dsoId',
          issuerId: ':issuerId'
        })
      )

      const { result } = renderHook(() => useDSOFilter(), {
        wrapper: ({ children }: PropsWithChildren<any>) => (
          <BaseProviders>
            <Route path={IssuanceRoute.insight}>{children}</Route>
          </BaseProviders>
        )
      })

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
