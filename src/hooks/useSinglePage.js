import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const useSinglePage = (requestFn) => {
  const [data, setData] = useState(null)

  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    requestFn(id).then(setData)
  }, [id])

  return { data, navigate }
}

export default useSinglePage
