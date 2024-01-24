import './errorMessage.scss';
import errorGif from './error.gif'

const ErrorMessage = () => {
    return (
        <img className='errorImg' src={errorGif} alt="error" />
    )
}

export default ErrorMessage;
