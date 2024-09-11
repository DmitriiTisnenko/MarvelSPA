import {Suspense, lazy} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import SingleComicLayout from '../pages/singleComicLayout/SingleComicLayout';
import SingleCharacterLayout from '../pages/singleCharacterLayout/SingleCharacterLayout'

const Page404 = lazy(() => import('../pages/404.js'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const MainPage = lazy(() => import('../pages/MainPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => { 

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <main>
                            <Routes>
                                <Route path='/' element={<MainPage/>} />
                                <Route path='comics' element={<ComicsPage/>} />
                                <Route path='comics/:id' element={<SinglePage dataType='comic' Component={SingleComicLayout}/>} />
                                <Route path='characters/:id' element={<SinglePage dataType='character' Component={SingleCharacterLayout}/>} />
                                <Route path='*' element={<Page404/>} />
                            </Routes>
                        </main>
                    </Suspense>
            </div>
        </Router>
    )
}
 
export default App;


