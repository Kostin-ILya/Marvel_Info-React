import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const useSinglePage = (requestFn, setProcess) => {
  const [data, setData] = useState({})

  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    requestFn(id)
      .then(setData)
      .then(() => setProcess('success'))
  }, [id])

  return { id, data, navigate }
}

export default useSinglePage
