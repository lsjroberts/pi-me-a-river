import React, { PropTypes, Component } from 'react';


export default class SearchInput extends Component {
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
      this.props.clearRivers();
    } else {
      this.props.searchRivers(e.target.value);
    }
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <section className="search-input">
        <label>Search</label>
        <input name="keywords"
               type="search"
               value={this.state.text}
               onChange={(e) => this.handleChange(e)} />
      </section>
    );
  }
}
