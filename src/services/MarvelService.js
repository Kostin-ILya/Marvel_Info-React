class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'

  _apiKey = 'apikey=23c90e69b415b3efe1b9220eca93562b'

  _transformChar = (char) => ({
    name: char.name,
    description:
      char.description.length > 210
        ? `${char.description.slice(0, 210)}...`
        : char.description,
    thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
    homepage: char.urls[1].url,
    wiki: char.urls[0].url,
  })

  getResources = async (url) => {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`?Could not fetch ${url}, status: ${response.status}`)
    }
    const result = await response.json()
    return result
  }

  getAllCharacters = async () => {
    const res = await this.getResources(
      `${this._apiBase}characters?${this._apiKey}`
    )
    return res.data.results.map(this._transformChar)
  }

  getCharacter = async (id) => {
    const res = await this.getResources(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    )

    return this._transformChar(res.data.results[0])
  }
}

export default MarvelService
