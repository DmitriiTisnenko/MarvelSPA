import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {error, loading, getAllCharacters} = useMarvelService(); 

    useEffect(() => {
        onReqestChars();
    }, [])
    
    // additional request by scroll
    useEffect(() => { 
        const scrollHandler = () => {
            if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1 & !newCharsLoading & !loading) {
                onReqestChars(offset);
            } 
        }

        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler)
        }

    }, [loading, newCharsLoading, offset])

    const onReqestChars = (offset) => {
        charList.length === 0 ? setNewCharsLoading(false) : setNewCharsLoading(true);
        getAllCharacters(offset)
            .then(onCharsLoaded)
    }

    const onCharsLoaded = (newChars) => { // 
        let ended = false
        if(newChars.length < 9) {
            ended = true; 
        }
        setCharList(charList => [...charList, ...newChars]);
        setNewCharsLoading(newCharsLoading => newCharsLoading = false);
        setOffset(offset => offset + 9);
        setCharEnded(ended)
    }

    const arrRefs = useRef([]);

    const onFocusItem = (id) => {
        arrRefs.current.forEach(item => {
           item.classList.remove('char__item_selected');
        })
        arrRefs.current[id].classList.add('char__item_selected');
    }

    const createCharElemets = (arr) => {
        const elems = arr.map((char, i) => {    
            let imgClass = char.thumbnail.includes('image_not_available') ? 'contain' : null;
            
            return (
                <li className="char__item"
                    tabIndex={0}
                    ref={elem => arrRefs.current[i] = elem}
                    onClick={() => {
                        props.onCharSelected(char.id); 
                        onFocusItem(i);
                    }}
                    key={char.id}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            props.onCharSelected(char.id);
                            onFocusItem(i)
                        }
                    }}>
                    <img className={imgClass} src={char.thumbnail} alt={char.name}/>
                    <div className="char__name">{char.name}</div>
                    
                </li>
            )
        })

        return (
            <ul className="char__grid">
                 {elems}
             </ul>
        );
    }

    const charsElems = createCharElemets(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newCharsLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {charsElems}
            <button 
                className="button button__main button__long"
                onClick={() => onReqestChars(offset)}
                style={{'display': charEnded ? 'none' : 'block'}}
                disabled={newCharsLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )}

export default CharList;