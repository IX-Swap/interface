import React, { useEffect, useMemo } from 'react'
import { useFormik } from 'formik'
import { t, Trans } from '@lingui/macro'
import { MobileDatePicker } from '@material-ui/pickers'
import { capitalize, useMediaQuery } from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'

import { PAYOUT_STATUS } from 'constants/enums'
import { Search } from 'components/Search'
import { MEDIA_WIDTHS, TYPE } from 'theme'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { DateRangePickerFilter } from 'components/DateRangePicker'
import { useUserState } from 'state/user/hooks'

import { FILTERS, defaultValues, rolesOptions, statusOptions, payoutTypeOptions } from './constants'
import { Container, DarkBlueCard, FiltersContainer } from './styleds'
import { FilterDropdown } from './FilterDropdown'
import { MobileFilters } from './MobileFilters'
import { Option, useTokensList } from 'hooks/useTokensList'
import { ReactComponent as IdentityIcon } from 'assets/images/identityIcon.svg'
import { ReactComponent as ArrowDownIcon } from 'assets/images/arrow-down.svg'
import { ReactComponent as CalanderIcon } from 'assets/images/newCalander.svg'
import { PinnedContentButton } from 'components/Button'

interface Props {
  filters: FILTERS[]
  callback?: (params: Record<string, any>) => void
  searchPlaceholder?: string
  onFiltersChange?: (params: Record<string, any>) => void
  forManager?: boolean
  isClearable?: boolean
  fullWidth?: boolean
}

let timer = null as any

export const MultipleFilters = ({
  filters,
  callback,
  searchPlaceholder = 'Search for Wallet',
  onFiltersChange,
  forManager = false,
  isClearable,
  fullWidth = true
}: Props) => {
  // const isMobile = useMediaQuery(`(max-width:${MEDIA_WIDTHS.upToLarge}px)`)

  const { pathname } = useLocation()
  const withSearch = useMemo(() => filters.includes(FILTERS.SEARCH), [filters])
  const { me } = useUserState()
  const { tokensOptions, secTokensOptions } = useTokensList()

  const managerSecTokensOptions = useMemo(() => {
    if (me?.managerOf?.length) {
      return me.managerOf.map(({ token }) => ({
        label: token?.symbol,
        value: token?.id,
        icon: token ? <CurrencyLogo currency={new WrappedTokenInfo(token)} /> : null,
      }))
    }
    return []
  }, [me])

  const statusOptionsSorted = useMemo(() => {
    if (pathname === '/token-manager/payout-events') {
      return [{ label: capitalize(PAYOUT_STATUS.DRAFT), value: PAYOUT_STATUS.DRAFT }, ...statusOptions]
    }
    return statusOptions
  }, [pathname])

  const initialValues = useMemo((): Record<string, any> => {
    if (filters.length) {
      return filters.reduce((acc, next) => {
        if (next === FILTERS.PAYOUT_PERIOD) {
          return {
            ...acc,
            startDate: defaultValues.startDate,
            endDate: defaultValues.endDate,
          }
        }
        return {
          ...acc,
          [next]: defaultValues[next],
        }
      }, {})
    }

    return {}
  }, [filters])

  const applyFilters = (values: Record<string, any>) => {
    const filtredValues = Object.keys(values).reduce((acc, key: string) => {
      const value = values[key]
      if (value) {
        if (Array.isArray(value)) {
          if (!value.length) return acc

          return {
            ...acc,
            [key]: values[key].map(({ value }: Option) => value).join(','),
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
  }

  const { setFieldValue, values, setValues, submitForm } = useFormik({
    initialValues,
    onSubmit: applyFilters,
  })

  useEffect(() => {
    clearTimeout(timer)

    // if (isMobile) return

    timer = setTimeout(() => submitForm(), 250)
  }, [values])

  const onSelectValueChange = (name: string, item: any) => {
    const { value } = item
    const data = [...values[name]]

    if (Array.isArray(item)) {
      setFieldValue(name, item)
      return
    }

    if (value === 'all') {
      setFieldValue(name, [])
      return
    }

    const indexOf = data.findIndex((el: any) => el.value === value)

    if (indexOf > -1) {
      data.splice(indexOf, 1)
    } else {
      data.push(item)
    }

    setFieldValue(name, data)
  }

  const onResetFilters = () => {
    setValues({ ...initialValues, ...(withSearch  && { search: values.search }) })
  }

  const isEmpty = useMemo(() => Object.values(values).every((value) => !value || value?.length === 0), [values])

  const filterComponents = {
    [FILTERS.SEARCH]: (
      <Search
        value={values[FILTERS.SEARCH]}
        setSearchValue={(value: string) => setFieldValue(FILTERS.SEARCH, value)}
        placeholder={`${searchPlaceholder}`}
        style={{ margin: 0 }}
      />
    ),
    [FILTERS.ROLES]: (
      <FilterDropdown
        placeholder="Role"
        selectedItems={values[FILTERS.ROLES]}
        onSelect={(item) => onSelectValueChange(FILTERS.ROLES, item)}
        items={rolesOptions}
      />
    ),
    [FILTERS.SEC_TOKENS]: (
      <FilterDropdown
        placeholder="Security token"
        selectedItems={values[FILTERS.SEC_TOKENS]}
        onSelect={(item) => onSelectValueChange(FILTERS.SEC_TOKENS, item)}
        items={forManager ? managerSecTokensOptions : secTokensOptions}
      />
    ),
    [FILTERS.STATUS]: (
      <FilterDropdown
        className="filter-status"
        placeholder="Status"
        selectedItems={values[FILTERS.STATUS]}
        onSelect={(item) => onSelectValueChange(FILTERS.STATUS, item)}
        items={statusOptionsSorted}
      />
    ),
    [FILTERS.PAYOUT_TYPE]: (
      <FilterDropdown
        placeholder="Payout type"
        selectedItems={values[FILTERS.PAYOUT_TYPE]}
        onSelect={(item) => onSelectValueChange(FILTERS.PAYOUT_TYPE, item)}
        items={payoutTypeOptions}
      />
    ),
    [FILTERS.PAYOUT_TOKEN]: (
      <FilterDropdown
        placeholder="Payout token"
        selectedItems={values[FILTERS.PAYOUT_TOKEN]}
        onSelect={(item) => onSelectValueChange(FILTERS.PAYOUT_TOKEN, item)}
        items={tokensOptions}
      />
    ),
    [FILTERS.PAYOUT_PERIOD]: (
      <DateRangePickerFilter
        label="Payment period"
        value={[values.startDate, values.endDate]}
        onChange={(value) => {
          const format = 'MMM DD, YYYY'
          setFieldValue('startDate', value[0] ? dayjs(value[0]).format(format) : value[0])
          setFieldValue('endDate', value[1] ? dayjs(value[1]).format(format) : value[1])
        }}
      />
    ),
    [FILTERS.RECORD_DATE]: (
      <MobileDatePicker
        value={values[FILTERS.RECORD_DATE]}
        onChange={(value) => {
          setFieldValue(FILTERS.RECORD_DATE, dayjs(value).format('MMM DD, YYYY'))
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
            <ArrowDownIcon />
          </DarkBlueCard>
        )}
      />
    ),
    [FILTERS.DATE_OF_CLAIM]: (
      <MobileDatePicker
        value={values[FILTERS.DATE_OF_CLAIM]}
        onChange={(value) => {
          setFieldValue(FILTERS.DATE_OF_CLAIM, dayjs(value).format('MMM DD, YYYY'))
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
            <ArrowDownIcon />
          </DarkBlueCard>
        )}
      />
    ),
  } as Record<string, JSX.Element>

  // if (isMobile) {
  //   return (
  //     <MobileFilters
  //       applyFilters={submitForm}
  //       values={values}
  //       setFieldValue={setFieldValue}
  //       onSelectValueChange={onSelectValueChange}
  //       haveValues={!isEmpty}
  //       filters={filters}
  //       searchPlaceholder={searchPlaceholder}
  //       forManager={forManager}
  //       managerSecTokensOptions={managerSecTokensOptions}
  //       statusOptionsSorted={statusOptionsSorted}
  //       onResetFilters={onResetFilters}
  //     />
  //   )
  // }

  return (
    <Container sx={{ gap: fullWidth ? '16px' : 0 }}>
      {withSearch && filterComponents[FILTERS.SEARCH]}
      <FiltersContainer className='filters-container'>
        {filters.map(
          (filter, index) =>
            filter !== FILTERS.SEARCH && (
              <React.Fragment key={`${filter}-${index}`}> {filterComponents[filter]}</React.Fragment>
            )
        )}
      </FiltersContainer>
      {isClearable ? (
        <PinnedContentButton disabled={isEmpty} onClick={onResetFilters}>
          Clear Filters
        </PinnedContentButton>
      ) : null }
    </Container>
  )
}
