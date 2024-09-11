import { Link } from 'react-router-dom';

import './singleCharacterLayout.scss'

const SingleCharacterLayout = ({data}) => {
    const {title, thumbnail, description} = data;

    return (
        <div className="single-character">
            <img src={thumbnail} alt={title} className="single-character__img"/>
            <div className="single-character__info">
                <h2 className="single-character__name">{title}</h2>
                <p className="single-character__descr">{description}</p>
            </div>
            <Link to="/" className="single-character__back">Back to main page</Link>
        </div>
        )
}

export default SingleCharacterLayout;