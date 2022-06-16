import React, { useEffect, useMemo } from 'react'
import { useFormik } from 'formik'
import { t, Trans } from '@lingui/macro'
import { MobileDatePicker } from '@material-ui/pickers'

import { Search } from 'components/Search'
import { TYPE } from 'theme'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { useSecTokenState } from 'state/secTokens/hooks'
import { DateRangePickerFilter } from 'components/DateRangePicker'
import { useSimpleTokens } from 'hooks/Tokens'
import dayjs from 'dayjs'
import { useNativeCurrency } from 'hooks/useNativeCurrency'

import { FILTERS, defaultValues, rolesOptions, statusOptions, payoutTypeOptions } from './constants'
import { Container, DarkBlueCard, FiltersContainer, ResetFilters } from './styleds'
import { FilterDropdown } from './FilterDropdown'

interface Props {
  filters: FILTERS[]
  callback?: (params: Record<string, any>) => void
  searchPlaceholder?: string
  onFiltersChange?: (params: Record<string, any>) => void
}

let timer = null as any

export const MultipleFilters = ({
  filters,
  callback,
  searchPlaceholder = 'Search for Wallet',
  onFiltersChange,
}: Props) => {
  const withSearch = useMemo(() => filters.includes(FILTERS.SEARCH), [filters])
  const { tokens: secTokens } = useSecTokenState()
  const tokens = useSimpleTokens()
  const native = useNativeCurrency()

  const tokensOptions = useMemo(() => {
    if (Object.values(tokens)?.length) {
      const list = Object.values(tokens).map((token: any) => {
        return {
          label: token.tokenInfo?.symbol || token.symbol,
          value: token.address,
          icon: <CurrencyLogo currency={new WrappedTokenInfo(token)} />,
        }
      })

      if (native) {
        list.unshift({
          label: native.symbol,
          value: native.symbol,
          icon: <CurrencyLogo currency={native} />,
        })
      }
      return list
    }

    return []
  }, [tokens, native])

  const secTokensOptions = useMemo(() => {
    if (secTokens?.length) {
      return secTokens.map((token) => ({
        label: token.symbol,
        value: token.id,
        icon: <CurrencyLogo currency={new WrappedTokenInfo(token)} />,
      }))
    }

    return []
  }, [secTokens])

  const initialValues = useMemo((): Record<string, any> => {
    if (filters.length) {
      return filters.reduce(
        (acc, next) => ({
          ...acc,
          [next]: defaultValues[next],
        }),
        {}
      )
    }

    return {}
  }, [filters])

  const { setFieldValue, values, setValues } = useFormik({
    initialValues,
    onSubmit: () => {
      // must have onSubmit
    },
  })

  useEffect(() => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      const filtredValues = Object.keys(values).reduce((acc, key: string) => {
        const value = values[key]
        if (value) {
          if (Array.isArray(value)) {
            if (!value.length) return acc

            return {
              ...acc,
              [key]: values[key].join(','),
            }
          }
          return {
            ...acc,
            [key]: values[key],
          }
        }
        return acc
      }, {})

      if (onFiltersChange) {
        onFiltersChange(filtredValues)
      } else if (callback) {
        callback(filtredValues)
      }
    }, 250)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  const onSelectValueChange = (name: string, value: any) => {
    const data = [...values[name]]

    if (Array.isArray(value)) {
      setFieldValue(name, value)
      return
    }

    if (value === 'all') {
      setFieldValue(name, [])
      return
    }

    const indexOf = data.findIndex((el: any) => el === value)

    if (indexOf > -1) {
      data.splice(indexOf, 1)
    } else {
      data.push(value)
    }

    setFieldValue(name, data)
  }

  const onResetFilters = () => {
    setValues({ ...initialValues, ...(withSearch && { search: values.search }) })
  }

  const isEmpty = useMemo(() => Object.values(values).every((value) => !value || value?.length === 0), [values])

  const filterComponents = {
    [FILTERS.SEARCH]: (
      <Search
        setSearchValue={(value: string) => setFieldValue(FILTERS.SEARCH, value)}
        placeholder={t`${searchPlaceholder}`}
        style={{ margin: 0 }}
        value={values.search}
      />
    ),
    [FILTERS.ROLES]: (
      <FilterDropdown
        placeholder="Roles"
        selectedItems={values.roles}
        onSelect={(item) => onSelectValueChange(FILTERS.ROLES, item.value)}
        items={rolesOptions}
      />
    ),
    [FILTERS.SEC_TOKENS]: (
      <FilterDropdown
        placeholder="Sec Token"
        selectedItems={values.tokens}
        onSelect={(item) => onSelectValueChange(FILTERS.SEC_TOKENS, item.value)}
        items={secTokensOptions}
      />
    ),
    [FILTERS.STATUS]: (
      <FilterDropdown
        placeholder="Status"
        selectedItems={values.status}
        onSelect={(item) => onSelectValueChange(FILTERS.STATUS, item.value)}
        items={statusOptions}
      />
    ),
    [FILTERS.PAYOUT_TYPE]: (
      <FilterDropdown
        placeholder="Payout type"
        selectedItems={values.payoutType}
        onSelect={(item) => onSelectValueChange(FILTERS.PAYOUT_TYPE, item.value)}
        items={payoutTypeOptions}
      />
    ),
    [FILTERS.PAYOUT_TOKEN]: (
      <FilterDropdown
        placeholder="Payout token"
        selectedItems={values.payoutToken}
        onSelect={(item) => onSelectValueChange(FILTERS.PAYOUT_TOKEN, item.value)}
        items={tokensOptions}
      />
    ),
    [FILTERS.PAYOUT_PERIOD]: (
      <DateRangePickerFilter
        label="Payment period"
        value={values.payoutPeriod}
        onChange={(value) =>
          setFieldValue(
            FILTERS.PAYOUT_PERIOD,
            value.map((el) => (el ? dayjs(el).toISOString() : el))
          )
        }
        maxDate={new Date()}
      />
    ),
    [FILTERS.RECORD_DATE]: (
      <MobileDatePicker
        value={values.recordDate}
        onChange={(value) => {
          setFieldValue(FILTERS.RECORD_DATE, dayjs(value).toISOString())
        }}
        views={['year', 'month', 'date']}
        renderInput={({ inputProps, focused }) => (
          <DarkBlueCard
            className="dropdown"
            onClick={inputProps?.onClick as any}
            isOpen={Boolean(focused || values.recordDate)}
          >
            <TYPE.body2
              color="inherit"
              fontWeight={300}
              overflow="hidden"
              style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              <Trans>Record date</Trans>
            </TYPE.body2>
          </DarkBlueCard>
        )}
      />
    ),
    [FILTERS.DATE_OF_CLAIM]: (
      <MobileDatePicker
        value={values.createdAt}
        onChange={(value) => {
          setFieldValue(FILTERS.DATE_OF_CLAIM, dayjs(value).toISOString())
        }}
        views={['year', 'month', 'date']}
        renderInput={({ inputProps, focused }) => (
          <DarkBlueCard
            className="dropdown"
            onClick={inputProps?.onClick as any}
            isOpen={Boolean(focused || values.createdAt)}
          >
            <TYPE.body2
              color="inherit"
              fontWeight={300}
              overflow="hidden"
              style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              <Trans>Date of claim</Trans>
            </TYPE.body2>
          </DarkBlueCard>
        )}
      />
    ),
  } as Record<string, JSX.Element>

  return (
    <Container>
      {withSearch && filterComponents[FILTERS.SEARCH]}
      <FiltersContainer>
        {filters.map(
          (filter, index) =>
            filter !== FILTERS.SEARCH && (
              <React.Fragment key={`${filter}-${index}`}> {filterComponents[filter]}</React.Fragment>
            )
        )}
      </FiltersContainer>
      <ResetFilters disabled={isEmpty} onClick={onResetFilters}>
        Clear Filters
      </ResetFilters>
    </Container>
  )
}
