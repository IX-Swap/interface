export const copyToClipboard = (val: string) => {
  document.addEventListener('copy', (e: ClipboardEvent) => {
    if (e.clipboardData !== null) {
      e.clipboardData.setData('text/plain', val)
    }
    e.preventDefault()
    document.removeEventListener('copy', () => null)
  })
  document.execCommand('copy')
  void navigator.clipboard.writeText(val)
}
