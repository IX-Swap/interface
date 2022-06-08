import useTheme from 'hooks/useTheme'
import { PayoutType } from '.'

export const useStatusButtonInfo = (title: PayoutType) => {
  const theme = useTheme()

  switch (title) {
    case PayoutType.ANNOUNCED:
      return { title: 'Announced', backgroundColor: theme.orange, color: theme.text1, borderColor: null }
    case PayoutType.DRAFT:
      return { title: 'Draft', backgroundColor: 'transparent', color: theme.bg10, borderColor: theme.bg10 }
    case PayoutType.ENDED:
      return { title: 'Ended', backgroundColor: theme.blue3, color: theme.text1, borderColor: null }
    case PayoutType.STARTED:
      return { title: 'Started', backgroundColor: theme.green3, color: theme.text1, borderColor: null }
    case PayoutType.SCHEDULED:
      return { title: 'Scheduled', backgroundColor: theme.yellow4, color: theme.bg1, borderColor: null }
    case PayoutType.DELAYED:
      return { title: 'Delayed', backgroundColor: theme.bgG6, color: theme.text1, borderColor: null }
  }
}
