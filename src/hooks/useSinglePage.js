import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const useSinglePage = (requestFn, setProcess) => {
  const [data, setData] = useState(null)

  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    requestFn(id)
      .then(setData)
      .then(() => setProcess('success'))
  }, [id])

  return { data, navigate }
}

export default useSinglePage
