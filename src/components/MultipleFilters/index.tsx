import React, { useEffect, useMemo } from 'react'
import { useFormik } from 'formik'
import { t } from '@lingui/macro'

import { Search } from 'components/Search'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { useSecTokenState } from 'state/secTokens/hooks'

import { FILTERS, initialValues, rolesOptions } from './constants'
import { Container, FiltersContainer, ResetFilters } from './styleds'
import { FilterDropdown } from './FilterDropdown'
import { ButtonText } from 'components/Button'

interface Props {
  filters: FILTERS[]
  callback: (params: Record<string, any>) => void
}

let timer = null as any

export const MultipleFilters = ({ filters, callback }: Props) => {
  const withSearch = useMemo(() => filters.includes(FILTERS.SEARCH), [filters])
  const { tokens: secTokens } = useSecTokenState()

  const tokensOptions = useMemo(() => {
    if (secTokens?.length) {
      return secTokens.map((token) => ({
        label: token.symbol,
        value: token.address,
        icon: <CurrencyLogo currency={new WrappedTokenInfo(token)} />,
      }))
    }

    return []
  }, [secTokens])

  const getInitialValues = useMemo(() => {
    if (filters.length) {
      return filters.reduce(
        (acc, next) => ({
          ...acc,
          [next]: initialValues[next],
        }),
        {}
      )
    }

    return {}
  }, [filters])

  const { setFieldValue, values, resetForm } = useFormik({
    initialValues: getInitialValues as Record<string, any>,
    onSubmit: () => {
      // must have onSubmit
    },
  })

  useEffect(() => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      const filtredValues = Object.keys(values).reduce(
        (acc, key: string) => ({ ...acc, ...(values[key] && { [key]: values[key] }) }),
        {}
      )
      callback(filtredValues)
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
    resetForm()
  }

  const isEmpty = useMemo(() => Object.values(values).every((value) => !value || value?.length === 0), [values])

  const filterComponents = {
    [FILTERS.SEARCH]: (
      <Search
        setSearchValue={(value: string) => setFieldValue(FILTERS.SEARCH, value)}
        placeholder={t`Search for Wallet`}
        style={{ margin: 0 }}
      />
    ),
    [FILTERS.ROLES]: (
      <FilterDropdown
        className="dropdown"
        placeholder="Roles"
        selectedItems={values.roles}
        onSelect={(item) => onSelectValueChange(FILTERS.ROLES, item.value)}
        items={rolesOptions}
        // style={{ borderRadius: '30px 0px 0px 30px', marginRight: 1, padding: 8, width: 132 }}
      />
    ),
    [FILTERS.SEC_TOKENS]: (
      <FilterDropdown
        className="dropdown"
        placeholder="Sec Token"
        selectedItems={values.secTokens}
        onSelect={(item) => onSelectValueChange(FILTERS.SEC_TOKENS, item.value)}
        items={tokensOptions}
        // style={{ borderRadius: '30px 0px 0px 30px', marginRight: 1, padding: 8, width: 132 }}
      />
    ),
  } as Record<string, JSX.Element>

  return (
    <Container>
      {withSearch && filterComponents.search}
      <FiltersContainer>
        {filters.map((filter) => filter !== FILTERS.SEARCH && filterComponents[filter])}
      </FiltersContainer>
      <ResetFilters disabled={isEmpty} onClick={onResetFilters}>
        Reset Filters
      </ResetFilters>
    </Container>
  )
}
