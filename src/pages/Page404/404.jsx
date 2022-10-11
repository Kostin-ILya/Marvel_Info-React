import { Link, useNavigate } from 'react-router-dom'

import Error from '../../components/loadingStatus/Error/Error'

import './404.scss'

const Page404 = () => {
  const navigate = useNavigate()

  return (
    <div className="page-404">
      <Error />
      <p>Page doesn&apos;t exist</p>
      <a
        onClick={(e) => {
          e.preventDefault()
          navigate(-1)
        }}
      >
        Back to previous page
      </a>
      <Link to="../" className="pulse404">
        Back to main page
      </Link>
    </div>
  )
}

export default Page404
