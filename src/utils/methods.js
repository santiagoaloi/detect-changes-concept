export function delay(ms, callback = null) {
  return new Promise((resolve) =>
    setTimeout(async () => {
      if (callback && typeof callback === 'function') {
        await callback()
      }
      resolve()
    }, ms)
  )
}
