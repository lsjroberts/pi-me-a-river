import React, { Component } from 'react';


export default class Search extends Component {
  render() {
    const { search, actions } = this.props;

    if (!search) {
      return (
        <p>nope</p>
      );
    }

    let { rivers, keywords } = search;

    return (
      <section className="search">
        <SearchInput keywords={keywords} {...actions} />
        <ul className="search-item-list">
          {rivers.map(river =>
            <p>{river}</p>
          )}
        </ul>
      </section>
    );
  }
}

class SearchInput extends Component {
  // static propTypes = {
  //   text: PropTypes.string
  // };

  constructor(props, context) {
    super(props, context);

    this.state = {
      text: this.props.text || ''
    };
  }

  handleChange(e) {
    if (e.target.value.length === 0) {
      this.props.search.clearRivers();
    } else {
      this.props.search.fetchRivers(e.target.value);
    }
    this.setState({ text: e.target.value });
  }

  render() {
    const { keywords } = this.state;

    return (
      <section className="search-input">
        <label>Search</label>
        <input name="keywords"
               type="search"
               value={keywords}
               onChange={(e) => this.handleChange(e)} />
      </section>
    );
  }
}
