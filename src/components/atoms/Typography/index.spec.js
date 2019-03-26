import React from 'react';
import { mount } from 'enzyme';
import { BodyText, CharacterName, SearchResultName, Subtitle } from './index';

const MountComponent = (Component, props) => mount(<Component {...props} />);

describe('Render Styled Typography', () => {
  it('should render BodyText as expected', () => {
    const props = {
      tag: 'p',
    };
    const component = MountComponent(BodyText, props);
    expect(component).toMatchSnapshot();
  });

  it('should render CharacterName as expected', () => {
    const props = {
      tag: 'h1',
    };
    const component = MountComponent(CharacterName, props);
    expect(component).toMatchSnapshot();
  });

  it('should render SearchResultName as expected', () => {
    const props = {
      tag: 'h3',
    };
    const component = MountComponent(SearchResultName, props);
    expect(component).toMatchSnapshot();
  });

  it('should render Subtitle as expected', () => {
    const props = {
      tag: 'h3',
    };
    const component = MountComponent(Subtitle, props);
    expect(component).toMatchSnapshot();
  });
});
