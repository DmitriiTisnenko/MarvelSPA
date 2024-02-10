import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a target='_blank' rel="noreferrer" href="https://www.marvel.com">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a target='_blank' rel="noreferrer" href="https://www.marvel.com/characters">Characters</a></li>
                    /
                    <li><a target='_blank' rel="noreferrer" href="http://marvel.com/comics">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;