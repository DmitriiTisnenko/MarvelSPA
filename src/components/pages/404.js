import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    return (
        <>
            <ErrorMessage />
            <h2 style={{textAlign: 'center', marginTop: 50}}>Page is not found, please click <Link style={{color: '#9F0013'}} to='/'>here</Link> to back to home page</h2>
        </>
    )
}

export default Page404;