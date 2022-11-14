import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login';
import { Search } from './pages/Search';
import { Album } from './pages/Album';
import { Favorites } from './pages/Favorites';
import { Profile } from './pages/Profile';
import { ProfileEdit } from './pages/ProfileEdit';
import { NotFound } from './pages/NotFound';
import { Header } from './pages/Header/Header';

class App extends Component {
  state = {
    name: '',
    // artist: '',
  };

  onChangeHandler = ({ target }) => {
    const { value, name } = target;

    this.setState({ [name]: value });
  };

  render() {
    const { name } = this.state;
    return (
      <div className="app">
        <Header user={ name } />
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              onChangeHandler={ this.onChangeHandler }
              name={ name }
            />) }
          />
          <Route
            exact
            path="/search"
            render={ (props) => (<Search
              { ...props }
              onChangeHandler={ this.onChangeHandler }
            />) }
          />
          <Route path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="/:not" render={ (props) => <NotFound { ...props } /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
