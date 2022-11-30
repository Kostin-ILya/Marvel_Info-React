import useHTTP from './useHTTP'

const useMarvelService = () => {
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = 'apikey=23c90e69b415b3efe1b9220eca93562b'

  const { process, setProcess, isLoading, isError, request } = useHTTP()

  const _transformChar = (char) => ({
    id: char.id,
    name: char.name,
    description:
      char.description.length > 210
        ? `${char.description.slice(0, 210)}...`
        : char.description,
    thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
    imgStyle: char.thumbnail.path.includes('image_not_available')
      ? { objectFit: 'initial' }
      : null,
    comics: char.comics.items,
    homepage: char.urls[1].url,
    wiki: char.urls[0].url,
  })

  const _transformComics = (comics) => ({
    id: comics.id,
    title: comics.title,
    description: comics.description || 'There is no description',
    pageCount: comics.pageCount
      ? `${comics.pageCount} pages`
      : 'No information about the number of pages',
    price: comics.prices[0].price
      ? `${comics.prices[0].price}$`
      : 'The price is unknown',
    thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
    language: comics.textObjects.language || 'en-us',
  })

  const getAllCharacters = async (offset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    )
    return res.data.results.map(_transformChar)
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)

    return _transformChar(res.data.results[0])
  }

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)

    return res.data.results
  }

  const getAllComics = async (offset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    )
    return res.data.results.map(_transformComics)
  }

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
    return _transformComics(res.data.results[0])
  }

  return {
    process,
    setProcess,
    isLoading,
    isError,
    getCharacter,
    getCharacterByName,
    getAllCharacters,
    getAllComics,
    getComic,
  }
}

export default useMarvelService
