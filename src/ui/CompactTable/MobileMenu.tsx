import { Box, Drawer, Grid, IconButton, Typography } from '@mui/material'
import { ActiveElementContext } from 'app/context/ActiveElementContextWrapper'
import { useStyles } from 'ui/CompactTable/MobileMenu.styles'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React, { useContext, useMemo } from 'react'
import { Serialized } from 'types/base'
import { Icon } from 'ui/Icons/Icon'

export const MobileMenu = <T extends Serialized>({
  items,
  titleExtractor,
  actions
}: {
  items: T[]
  titleExtractor: (item: T) => string
  actions: (item: T) => React.ReactElement
}) => {
  const context = useContext(ActiveElementContext)
  const open = context?.hasOpenIndices
  const classes = useStyles()
  const openIndex = context?.openIndex
  const { isTablet } = useAppBreakpoints()

  const selectedItem = useMemo(
    () => items.filter(item => item._id === openIndex)?.[0],
    [openIndex, items]
  )
  console.log({ items, openIndex })
  if (selectedItem === undefined) {
    return null
  }
  const onClose = () => {
    if (openIndex !== undefined) {
      context?.toggleRow(openIndex)
    }
  }

  return (
    <>
      {isTablet && (
        <Drawer
          anchor='bottom'
          open={open}
          onClose={onClose}
          PaperProps={{ sx: { backgroundColor: 'transparent' } }}
        >
          <Box className={classes.drawer}>
            <Box className={classes.titleRow}>
              <Typography
                variant='subtitle2'
                fontWeight={600}
                className={classes.header}
              >
                {titleExtractor(selectedItem)}
              </Typography>
              <IconButton onClick={onClose} size='medium'>
                <Icon name='close' />
              </IconButton>
            </Box>
            <Grid flexDirection='column'>
              <Grid display='flex' flexDirection={'column'} gap={2}>
                {actions(selectedItem)}
              </Grid>
              <Box mb={2} />
            </Grid>
          </Box>
        </Drawer>
      )}
    </>
  )
}
