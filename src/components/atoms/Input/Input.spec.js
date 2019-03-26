import React from 'react';
import { mount } from 'enzyme';
import Input from './Input';

const MountComponent = props => mount(<Input {...props} />);

describe('Render Input', () => {
  const component = MountComponent();

  it('should render Input as expected', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('Input Events', () => {
  const onChange = jest.fn();
  const component = MountComponent({ onChange });
  it('should call OnChange Input as expected', () => {
    const expectValue = 'Star Wars';
    const input = component.find('input');
    input.value = 'Star Wars';
    input.props().onChange({ value: 'Star Wars' });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input.value).toEqual(expectValue);
  });
});
