import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/subscribe'>Subscribed Data</Link>
          </li>
          <li>
            <Link to='/favorites'>
              My Favorites
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
