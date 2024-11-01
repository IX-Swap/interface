import { useSelector } from 'react-redux'
import { AppState } from 'state'

export const useJumpTaskState = () => {
  const walletState = useSelector((state: AppState) => state.jumpTask)

  return walletState
}
