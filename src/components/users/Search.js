import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {

    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearSearch: PropTypes.func.isRequired,
        isSearchEmpty: PropTypes.bool.isRequired,
        showAlert: PropTypes.func.isRequired,
    }

    onSubmit = (e) => {
        if (this.state.text === '') {
            e.preventDefault();
            this.props.showAlert('Please enter something.', 'light')
        }
        else {
            e.preventDefault();
            this.props.searchUsers(this.state.text);
            this.setState({text: ''});
        }
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {clearSearch, isSearchEmpty} = this.props;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type='text' name='text' placeholder='Search Users...' value={this.state.text} onChange={this.onChange}/>
                    <input type='submit' value='Search' className='btn btn-dark btn-block'/>
                </form>
                {!isSearchEmpty && <button className='btn btn-light btn-block' onClick={clearSearch}>Clear</button>}
                
            </div>
        )
    }
}

export default Search