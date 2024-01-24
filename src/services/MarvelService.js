class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=b27ff1186765ac40b196ef89a8017415';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`can't fetch ${url} status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return await res.data.results.map(item => this._updateCharacter(item));
    }   

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`); // большой объект который получаем
        return this._updateCharacter(res.data.results[0]); // передаем в метод для формирования необходимого нам объекта
    }

    _updateCharacter = (charObj) => {
        return {
            id: charObj.id,
            name: charObj.name,
            description: charObj.description ,
            homepage: charObj.urls[0].url,
            wiki: charObj.urls[1].url,
            thumbnail: charObj.thumbnail.path + '.' + charObj.thumbnail.extension, // маленькая картинка
            comics: charObj.comics.items
        }
    }
}   

export default MarvelService;
  