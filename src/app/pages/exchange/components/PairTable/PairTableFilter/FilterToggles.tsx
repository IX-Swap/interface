import React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useStyles } from 'app/pages/exchange/components/PairTable/PairTableFilter/PairTableFilter.styles'
import { Star } from '@material-ui/icons'
import classNames from 'classnames'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { PairFilter } from 'hooks/types'

export const FilterToggles = () => {
  const { filterButton, favoriteButton } = useStyles()

  return (
    <SearchQueryFilter<'pairFilter'> name='pairFilter' defaultValue=''>
      {({ value, onChange }) => (
        <ToggleButtonGroup
          exclusive
          value={value}
          onChange={(_: React.MouseEvent<HTMLElement>, newValue: string) => {
            onChange(newValue)
          }}
        >
          <ToggleButton
            disableRipple
            className={classNames([filterButton, favoriteButton])}
            value='favorite'
          >
            <Star fontSize='small' />
          </ToggleButton>
          <ToggleButton
            disableRipple
            className={filterButton}
            value={PairFilter.ALL}
          >
            All
          </ToggleButton>
          <ToggleButton
            disableRipple
            className={filterButton}
            value={PairFilter.SGD}
          >
            SGD
          </ToggleButton>
          <ToggleButton
            disableRipple
            className={filterButton}
            value={PairFilter.USD}
          >
            USD
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    </SearchQueryFilter>
  )
}
