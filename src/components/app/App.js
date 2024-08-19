import {Suspense, lazy} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";

const Page404 = lazy(() => import('../pages/404.js'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const MainPage = lazy(() => import('../pages/MainPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

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
                                <Route path='comics/:comicID' element={<SingleComicPage/>} />
                                <Route path='*' element={<Page404/>} />
                            </Routes>
                        </main>
                    </Suspense>
            </div>
        </Router>
    )
}
 
export default App;


