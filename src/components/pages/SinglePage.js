import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner' 


const SinglePage = ({Component, dataType}) => {
    const [data, setData] = useState(null);
    let {id} = useParams();// получаем id из url пути, id записываеся в parasm, когда мы кликаем на копмонент Link 
    const {getSingleComics, getCharacter, loading, error, clearError} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id])

    const updateData = () => {
        clearError();

        switch(dataType) {
            case 'comic': 
                getSingleComics(id)
                    .then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id)
                    .then(onDataLoaded);           
        }
    }

    const onDataLoaded = (data) => setData(data);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !loading && !error && data ? <Component data={data}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;
