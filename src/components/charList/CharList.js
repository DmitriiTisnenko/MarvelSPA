import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';


class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        newCharsLoading: false,
        offset: 210,
        charEnded: false,
        charRefs: [],
        counter: 0
    }

    marvelService = new MarvelService(); 

    componentDidMount() {
        this.onReqestChars();
        document.addEventListener('scroll', this.scrollHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.scrollHandler);
    }

    scrollHandler = () => {
        const baseLoaded = this.state.loading === false;
        const newCharsLoaded = this.state.newCharsLoading === false;

        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1 && baseLoaded & newCharsLoaded) {
            this.onReqestChars(this.state.offset);
        } 
    }

    onReqestChars = (offset) => {
        this.onCharsLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError) 
    }

    onCharsLoading = () => {
        this.setState({newCharsLoading: true})
    }

    onCharsLoaded = (newChars) => {
        let ended = false
        if(newChars.length < 9) {
            ended = true; 
        }
        this.setState(({chars, offset}) => ({
            chars: [...chars, ...newChars], 
            loading: false,
            newCharsLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    onError = () => {
        this.setState({error: true, loading: false})
    }

    onItemSelected = (e) => {
        const charItems = document.querySelectorAll('.char__item');
        charItems.forEach(item => {
            item.classList.remove('char__item_selected')
            if(item === e.currentTarget) {
                item.classList.add('char__item_selected');
            }
        })
    }

    createCharElemets = (arr) => {
        const elems = arr.map(char => {
            let imgClass = char.thumbnail.includes('image_not_available') ? 'contain' : null;
            
            return (
                <li className="char__item"
                    tabIndex={0}
                    onClick={(e) => {this.props.onCharSelected(char.id); {this.onItemSelected(e)}}}
                    key={char.id}
                    onKeyDown={(e) => {
                        if(e.key === ' ' || e.key === 'Enter') {
                            this.props.onCharSelected(e.target.id);
                            this.onItemSelected(e)
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

    render() {

        const {error, loading, chars, newCharsLoading, offset, charEnded} = this.state;
        const charsElems = this.createCharElemets(chars);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !loading || !error  ? charsElems : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    onClick={() => this.onReqestChars(offset)}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    disabled={newCharsLoading}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;