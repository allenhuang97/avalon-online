import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';

import LandingPage from 'components/landingPage.jsx';

describe('<LandingPage />', () => {
  let wrapper;
  const mockSetView = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<LandingPage setView={mockSetView} numPlayersInLobby={1}/>);
  });

  test('should render the title as <h1/>', () =>{
    expect(wrapper.find('h1')).toHaveLength(1);
  });
});

