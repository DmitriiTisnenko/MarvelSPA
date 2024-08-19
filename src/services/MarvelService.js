import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {
    const {error, loading, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=b27ff1186765ac40b196ef89a8017415';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return await res.data.results.map(item => _updateCharacter(item));
    }   

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`); // большой объект который получаем
        return _updateCharacter(res.data.results[0]); // передаем в метод для формирования необходимого нам объекта
    }

    const getComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return await res.data.results.map(item => _updateComisc(item))
    }

    const getSingleComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _updateComisc(res.data.results[0]);
    }
    
    const _updateComisc = ({id, title, textObjects, prices, thumbnail, description, pageCount}) => {
        return {
            id: id + '',
            title,
            description: description || 'There is no description',
            pageCount: pageCount ? `${pageCount} p.` : 'No info about the number of pages',
            language: textObjects.language || 'en-ru',
            price: prices[0].price ?`${prices[0].price}$` : 'NOT AVALIBALE', 
            thumbnail: thumbnail.path + '.' + thumbnail.extension
        }
    }

    const _updateCharacter = (charObj) => {
        return {
            id: charObj.id,
            name: charObj.name,
            description: charObj.description ? `${charObj.description.slice(0, 210)}...` : 'There is no description for this character',
            homepage: charObj.urls[0].url,
            wiki: charObj.urls[1].url,
            thumbnail: charObj.thumbnail.path + '.' + charObj.thumbnail.extension, // маленькая картинка
            comics: charObj.comics.items
        }
    }

    return {error, loading, getAllCharacters, getCharacter, getComics, getSingleComics, clearError}
}   

export default useMarvelService;
  