import React from 'react';
import FavoritesPage from './Favorites';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

it('renders favorite page correctly', () => {
    const wrapper = shallow(<FavoritesPage />);
    expect(wrapper).toMatchSnapshot();
  });