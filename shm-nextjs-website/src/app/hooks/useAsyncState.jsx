import { useState } from 'react'

const useAsyncState = (
  defaultValue,
  asyncRequest,
  config
) => {
  const { failureCallback, onChange } = config || {}

  const [inProgress, setInProgress] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(defaultValue)

  const refresh = asyncRequest
    ? (...params) => {
        setInProgress(true)
        asyncRequest(...params)
          .then((newData) => {
            setData(newData)
            onChange?.(newData)
            setInProgress(false)
          })
          .catch((newError) => {
            setError(newError)
            failureCallback?.(newError)
          })
          .finally(() => {
            setInProgress(false)
          })
      }
    : () => {}

  return {
    refresh,
    data,
    inProgress,
    error,
    overrideState: setData
  }
}

export default useAsyncState
