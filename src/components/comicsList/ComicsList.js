import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [ended, setEnded] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);

    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComics()
    }, []);

    const updateComics = () => {
        clearError()
        comics.length === 0 ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getComics(offset)
        .then(onComicsLoaded);
    }

    const onComicsLoaded = (comicsArr) => {
        comicsArr.length < 8 ? setEnded(true) : setEnded(false);
        setComics(comics => [...comics, ...comicsArr]);
        setOffset(offset => offset + 8);
    }

    const createComicsList = (comics) => {
        const elems = comics.map((item, i) => {
            const {title, price, thumbnail, id} = item;
            return (
                <li className="comics__item"
                    key={i}>
                    <Link to={id}>
                        <img src={thumbnail} alt={title} className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {elems}
            </ul>
        );
    }

    const comicsList = createComicsList(comics);

    const spinner = loading && !newItemsLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
            {comicsList}
            {spinner}
            {errorMessage}
            <button className="button button__main button__long"
                    onClick={updateComics}
                    disabled={loading}
                    style={{display: ended ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default ComicsList;