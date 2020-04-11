import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

export class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
    }

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired,
    }

    render() {
        const {name, avatar_url, location, bio, login, html_url, followers, following, public_repos, public_gists} = this.props.user;
        const {loading} = this.props;

        if (loading)
            return <Spinner />
        else {
            return (
                <Fragment>
                    <Link to='/' className='btn btn-light'>
                        Back To Search
                    </Link>
                    <div className='card grid-2'>
                        <div className='all-center'>
                            <img 
                                src={avatar_url}
                                alt=''
                                className='round-img'
                                style={{width: '150px'}}
                            />
                            <h1>{login} - {name}</h1>
                            <p>{location}</p>
                        </div>
                        <div>
                            {bio && (
                                <Fragment>
                                    <h3>Bio</h3>
                                    <p>{bio}</p>
                                </Fragment>
                            )}
                            <a href={html_url} className="btn btn-dark btn-sm my-1" target="_blank" rel="noopener noreferrer">Visit Github Profile</a>
                        </div>
                    </div>
                    <div className='card text-center'>
                        <div className='badge badge-primary'>Followers: {followers}</div>
                        <div className='badge badge-success'>Following: {following}</div>
                        <div className='badge badge-light'>Public Repos: {public_repos}</div>
                        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
                    </div>
                </Fragment>
                
            )
        }
    }
}

export default User
