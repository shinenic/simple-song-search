import React, { Component } from 'react';

class SearchButton extends Component {
    render() {
        return (
            <button onClick={this.props.searchKeyword}>Search</button>
        );
    }
}

export default SearchButton;
