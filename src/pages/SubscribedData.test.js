import React from 'react';
import SubscribedData from './SubscribedData';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

it('renders sunscribe page correctly', () => {
    const wrapper = shallow(<SubscribedData />);
    expect(wrapper).toMatchSnapshot();
  });