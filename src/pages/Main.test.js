import React from 'react';
import Main from './Main';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

it('renders favorite page correctly', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper).toMatchSnapshot();
  });