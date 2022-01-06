import { Box, Tab, Tabs } from '@material-ui/core'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { TabPanel } from 'components/TabPanel'
import React, { Fragment } from 'react'
import useStyles from './TableTabsView.styles'

export interface TabsContent {
  panel: React.ReactNode
  label: React.ReactNode
  disabled?: boolean
  component?: React.ReactNode
}

export interface TableTabsViewProps {
  tabs: TabsContent[]
  onChange?: (event: object, value: any) => void
  variant?: 'primary' | 'secondary'
}

export const TableTabsView = ({
  tabs,
  onChange,
  variant = 'primary'
}: TableTabsViewProps) => {
  const classes = useStyles({ variant })

  const handleChange = (
    event: React.ChangeEvent<{}>,
    index: number,
    cb: (index: string) => void
  ) => {
    cb(String(index))
    onChange?.(event, index)
  }

  return (
    <SearchQueryFilter<'tab'> name='tab' defaultValue='0'>
      {({ value, onChange: onChangeFilter }) => (
        <Fragment>
          <Tabs
            classes={{ indicator: classes.indicator, root: classes.tabsRoot }}
            value={Number(value)}
            onChange={(event, index) =>
              handleChange(event, index, onChangeFilter)
            }
          >
            {tabs.map(({ label, disabled, component }, index) =>
              component !== undefined ? (
                <Box key={index}>{component}</Box>
              ) : (
                <Tab
                  key={index}
                  classes={{
                    root: classes.tabRoot,
                    selected: classes.tabRootSelected
                  }}
                  disabled={disabled}
                  label={label}
                />
              )
            )}
          </Tabs>
          <Box className={classes.content}>
            {tabs.map((tab, index) => (
              <TabPanel
                index={index}
                key={index}
                value={Number(value)}
                withoutSpacing={variant !== 'primary'}
              >
                {tab.panel}
              </TabPanel>
            ))}
          </Box>
        </Fragment>
      )}
    </SearchQueryFilter>
  )
}
