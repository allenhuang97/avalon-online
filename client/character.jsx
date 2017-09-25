import React from 'react';
import PropTypes from 'prop-types';

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="character">
        <h1>{this.props.character.character}</h1>
        <img src="assets/assassin.jpg" alt="" />
        <p>{this.props.character.special.description}</p>
        <table>
          <tbody>
            {this.props.character.special.chars.map((char, i) =>
              (
                <tr key={i}>
                  <td key={i}>{char}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

Character.propTypes = {
  character: PropTypes.object.isRequired
};

export default Character;
