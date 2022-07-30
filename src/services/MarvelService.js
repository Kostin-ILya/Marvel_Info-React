class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiKey = 'apikey=23c90e69b415b3efe1b9220eca93562b'

  getResources = async (url) => {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`&&&Could not fetch ${url}, status: ${response.status}`)
    }
    const result = await response.json()
    return result
  }

  getAllCharacters = () =>
    this.getResources(`${this._apiBase}characters?${this._apiKey}`)

  getCharacter = (id) =>
    this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`)
}

export default MarvelService
