import { useState } from 'react'
import axios from 'axios'

const useHTTP = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [process, setProcess] = useState('waiting')

  const request = async (url) => {
    setIsLoading(true)
    setProcess('loading')

    setIsError(false)

    try {
      const response = await axios.get(url)

      return response.data
    } catch (error) {
      setIsError(true)

      setProcess('error')

      if (error.response) {
        console.log('Status:', error.response.status, error.response.data)
      } else if (error.request) {
        console.log('Error!', error.request)
      } else {
        console.log('Error!', error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { process, setProcess, isLoading, isError, request }
}

export default useHTTP

// const useHTTP = () => {
//   const [isLoading, setIsLoading] = useState(false)
//   const [isError, setIsError] = useState(false)

//   const request = useCallback(
//     async (
//       url,
//       method = 'GET',
//       body = null,
//       headers = { 'Content-Type': 'application/json' }
//     ) => {
//       setIsLoading(true)
//       setIsError(false)

//       try {
//         const response = await fetch(url, { method, body, headers })
//         console.log(response)

//         if (!response.ok) {
//           throw new Error(`?Could not fetch ${url}, status: ${response.status}`)
//         }

//         const result = await response.json()
//         return result
//       } catch (error) {
//         setIsError(true)
//         console.error(error)
//       } finally {
//         setIsLoading(false)
//       }
//     }
//   )

//   return { isLoading, isError, request }
// }

// export default useHTTP
