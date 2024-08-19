import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';


const CharInfo = (props) => {

    const {charID} = props;
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charID])

    const updateChar = () => {
        clearError();
        if(!charID) {return}

        getCharacter(charID)
        .then(onCharLoaded)
    }
    
    const onCharLoaded = (char) => {
        setChar(char)
    }

    const skeleton = !char && !loading && !error ? <Skeleton/> : null;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error) && char ? <View char={char}/> : null;
    
    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, thumbnail, wiki, homepage, description, comics} = char;
    const thumbnailStyle = thumbnail.includes('image_not_available') ? {'objectFit': 'unset'} : null;
    const comicsList = comics?.slice(0, 10).map((comics, i) => {
        return (
            <li className="char__comics-item" key={i}>
                    <Link to={`comics/${comics.resourceURI.slice(43)}`}>{comics.name}</Link>
            </li>
        )
    })
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={thumbnailStyle} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="char__descr">
                {description || 'Description temporary is unavalable'}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList || 'There is no comics with this character'}
            </ul>
        </>
    )
}

export default CharInfo;

