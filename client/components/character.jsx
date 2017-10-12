import React from 'react';
import PropTypes from 'prop-types';

class Character extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const character = this.props.character;
    // const image = character.name.toLowerCase(); Use this once we have images

    return (
      <div id="character">
        <h1>{character.character}</h1>
        <img src="assets/assassin.jpg" alt="" />
        <p>{character.special.description}</p>
        <table>
          <tbody>
            {character.special.chars.map((char, i) =>
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
