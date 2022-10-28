import { useState, useEffect } from 'react'

const useListLoad = (requestFn, requestItemsQuantity, initOffset = 210) => {
  const [list, setList] = useState([])
  const [isNewListLoading, setIsNewListLoading] = useState(false)
  const [isItemsEnded, setItemsEnded] = useState(false)
  const [isPageEnded, setIsPageEnded] = useState(false)
  const [offset, setOffset] = useState(initOffset)

  useEffect(() => {
    window.addEventListener('scroll', checkPageEnded)
    onUpdateList(true)

    return () => {
      window.removeEventListener('scroll', checkPageEnded)
    }
  }, [])

  useEffect(() => {
    if (isPageEnded && !isNewListLoading && !isItemsEnded) {
      onUpdateList()
    }
  }, [isPageEnded])

  const onUpdateList = (initLoad) => {
    if (!initLoad || typeof initLoad === 'object') {
      setIsNewListLoading(true)
    }

    requestFn(offset).then(onListLoaded)
  }

  const onListLoaded = (newList) => {
    setList((prevList) => [...prevList, ...newList])
    setIsNewListLoading(false)
    setIsPageEnded(false)
    setItemsEnded(newList.length < requestItemsQuantity)
    setOffset((prevOffset) => prevOffset + requestItemsQuantity)
  }

  const checkPageEnded = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.offsetHeight - 3
    ) {
      setIsPageEnded(true)
    }
  }

  return {
    list,
    isNewListLoading,
    isItemsEnded,
    onUpdateList,
    offset,
  }
}

export default useListLoad
