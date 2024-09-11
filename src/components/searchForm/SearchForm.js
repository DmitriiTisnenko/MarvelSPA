import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FromikErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './searchForm.scss';

const SearchForm = () => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }
    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const results = char?.length > 0 ? 
        <div className="form__message-wrapper">
            <div className="form__message-success">There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">TO PAGE</div>
            </Link>
        </div> : 
        <div className="error">The character was not found. Check the name and try again</div>;

    return (
        <Formik
            initialValues={{
                charName: '',
            }}
            validate={values => {
                const errors = {};
                if(!values.charName) {
                    errors.charName = "Введите персонажа для поиска!"
                }
                return errors;
            }}
            onSubmit={({charName}) => updateChar(charName)}
        >
            <Form className='form'>
                <label htmlFor='charName' className='form__header'>Or find a character by name:</label>
                <div className="form__wrapper">
                    <Field
                        id="charName"
                        name="charName"
                        type="text"
                        className="form__input"
                        placeholder="Enter name"/>
                    <button 
                        className="button button__main"
                        disabled={loading}>
                        <div className="inner">Find</div>
                    </button>
                </div>
                <FromikErrorMessage name="charName" component="div" className="error"/>
                {char ? results : null}
                {errorMessage}
            </Form>
        </Formik>
    )
}

export default SearchForm
