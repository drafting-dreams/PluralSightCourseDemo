import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
  return(
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {"|"}
      <Link to="/courses" activeClassName="active">Course</Link>
      {"|"}
      <Link to="/about" activeClassName="active">About</Link>
      {loading && <LoadingDots dots={20} interval={100}/>}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
