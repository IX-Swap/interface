export const completeDispatch = ({ dispatch, action, args }: { dispatch: any; action: any; args: any }) =>
  new Promise((resolve, reject) => {
    dispatch(action(args))
    resolve(null)
  })
