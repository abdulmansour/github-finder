import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  //get searched github users
  searchUsers = async (text) => {
    this.setState({loading: true});
    var url = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const res = await axios.get(url);
    this.setState({loading: false, users: res.data.items});
  }

  //get single github user
  getUser = async (login) => {
    this.setState({loading: true});
    var url = `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const res = await axios.get(url);
    this.setState({loading: false, user: res.data});
  }

    //get repos of single github user
    getUserRepos = async (login) => {
      this.setState({loading: true});
      var url = `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
      const res = await axios.get(url);
      this.setState({loading: false, repos: res.data});
    }

  //clear fetched github users
  clearSearch = () => {
	  this.setState({users: [], loading: false});
  }

  showAlert = (msg, type) => {
    this.setState({alert: {msg, type}});
    setTimeout(() => {this.setState({alert: null})}, 5000);
  }

  render() {
    const {loading, users, user} = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className="container">
            <Alert 
            alert={this.state.alert}
            />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search 
                    searchUsers={this.searchUsers}
                    clearSearch={this.clearSearch} 
                    isSearchEmpty={users.length === 0? true:false} 
                    showAlert={this.showAlert}
                  />
                  <Users
                  loading={loading}
                  users={users}
                  />
                </Fragment>
              )}/>
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} user={user} getUserRepos={this.getUserRepos} loading={this.state.loading}/>
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}



export default App;
