import React from 'react'
import { ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  label: {
    width: '50%'
  },
  value: {
    width: '50%',
    textAlign: 'right'
  }
})

const LabelValue = ({ label, value, classes = { label: '', value: '' } }) => {
  const mClasses = useStyles()
  const labelClass = `${mClasses.label} ${classes.label}`
  const valueClass = `${mClasses.value} ${classes.label}`

  return (
    <ListItem>
      <ListItemText className={labelClass} primary={label} />
      <ListItemText className={valueClass} primary={value} />
    </ListItem>
  )
}

export default LabelValue
