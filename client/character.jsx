import React from 'react';

class Character extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div id="character">
				<h1>{this.props.character.character}</h1>
				<img src="assets/assassin.jpg"/>
				<p>{this.props.character.special.description}</p>
				<table>
					<tbody>
		    			{this.props.character.special.chars.map((char, i) => 
		    				<tr key={i}>
		    					<td key={i}>{char}</td>
		    				</tr>
		    			)}
	    			</tbody>
		    	</table>
			</div>
		);
	}
}
export default Character;

