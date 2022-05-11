export const formatRpcError = (err: { code: number; message: string }) => {
  switch (err.code) {
    case -32603: {
      return 'Gas price was too low to proceed, please increase it and try again. '
    }
    default:
      return err.message
  }
}
