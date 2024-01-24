import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="https://www.codewars.com/kata/56dec885c54a926dcd001095/solutions/javascript?filter=all&sort=clever&invalids=false">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Language_overview">Characters</a></li>
                    /
                    <li><a href="https://ru.react.js.org/docs/introducing-jsx.html">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;