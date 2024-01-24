import { Component } from 'react';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';


class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps){
        if(prevProps.charID !== this.props.charID) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charID} = this.props;
        if(!charID) {
            return;
        }

        this.onCharLoading(); 
        this.marvelService
            .getCharacter(charID)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoading = () => {
        this.setState({loading: true})
    }
    
    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    render() {
        const {loading, char, error} = this.state;

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
}

const View = ({char}) => {
    const {name, thumbnail, wiki, homepage, description, comics} = char;
    const thumbnailStyle = thumbnail.includes('image_not_available') ? {'objectFit': 'unset'} : null;
    const comicsList = comics?.slice(0, 10).map((comics, i) => {
        return (
            <li className="char__comics-item" key={i}>
                    {comics.name}
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