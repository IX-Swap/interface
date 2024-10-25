import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useJumpTaskState } from 'state/jumpTask/hooks'
import { JUMPTASK_SECURITY_TOKENS } from 'config'
import { resetJumpTaskState } from 'state/jumpTask'

const usePostbackJumpTask = () => {
  const dispatch = useDispatch()
  const { transactionId, affUnique1 } = useJumpTaskState()

  const callPostbackEndpoint = async () => {
    const securityToken = JUMPTASK_SECURITY_TOKENS

    const url = `https://jumptask.go2cloud.org/aff_lsr?transaction_id=${transactionId}&adv_sub=${affUnique1}&security_token=${securityToken}`

    try {
      const { status } = await axios.get(url)

      if (status === 200) {
        dispatch(resetJumpTaskState())
      }
    } catch (error) {
      console.error('Error calling postback endpoint:', error)
    }
  }

  return { callPostbackEndpoint }
}

export default usePostbackJumpTask
