import {
  FormControlLabel,
  RadioGroup,
  RadioGroupProps,
  Radio
} from '@material-ui/core'

interface RadiosProps extends RadioGroupProps {
  items: Array<{ label: string; value: string | number }>
}

export const Radios = (props: RadiosProps) => {
  const { items, ...rest } = props
  return (
    <RadioGroup {...rest}>
      {items.map(item => (
        <FormControlLabel
          key={item.value}
          control={<Radio />}
          label={item.label}
          value={item.value}
        />
      ))}
    </RadioGroup>
  )
}
