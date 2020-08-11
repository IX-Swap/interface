//

function setBidAndAsk (dispatch, payload) {
  dispatch({
    type: monitoringActions.SET_BID_ASK_PAYLOAD,
    data: payload
  })
}

export default {
  setBidAndAsk
}
