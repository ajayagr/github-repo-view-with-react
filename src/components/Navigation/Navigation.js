import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../routes/routes';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

import classes from './Navigation.module.css';

const Navigation = ({
  location: { pathname },
  organizationName,
  onOrganizationSearch,
}) => (
  <header className={classes.Navigation}>
    <div className={classes.NavigationLink}>
      <Link to={routes.PROFILE}>Profile</Link>
    </div>
    <div className={classes.NavigationLink}>
      <Link to={routes.ORGANIZATION}>Organization</Link>
    </div>

    {pathname === routes.ORGANIZATION && (
      <OrganizationSearch
        organizationName={organizationName}
        onOrganizationSearch={onOrganizationSearch}
      />
    )}
  </header>
);

class OrganizationSearch extends React.Component {
  state = {
    value: this.props.organizationName,
  };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  onSubmit = event => {
    this.props.onOrganizationSearch(this.state.value);

    event.preventDefault();
  };

  render() {
    const { value } = this.state;

    return (
      <div className={classes.NavigationSearch}>
        <form onSubmit={this.onSubmit}>
          <Input
            color={'white'}
            type="text"
            value={value}
            onChange={this.onChange}
          />{' '}
          <Button color={'white'} type="submit">
            Search
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(Navigation);
