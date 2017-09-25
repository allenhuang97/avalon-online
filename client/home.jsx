import React from 'react';
import PropTypes from 'prop-types';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  userJoin = () => {
    this.props.emit('clientUserJoin', { name: this.state.name });
    this.props.setStateNum(1);
  }

  render() {
    return (
      <div id="home">
        <h1>Choose a Name:</h1>
        <input id="btnChooseName" type="text" onChange={(e) => { this.setState({ name: e.target.value }); }} />
        <div className="type-1">
          <a className="btn btn-3" onClick={this.userJoin}>
            <span className="txt">Enter</span>
            <span className="round"><i className="fa fa-chevron-right" /></span>
          </a>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  emit: PropTypes.func.isRequired,
  setStateNum: PropTypes.func.isRequired
};

export default Home;
