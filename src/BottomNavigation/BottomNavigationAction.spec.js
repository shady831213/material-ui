import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, getClasses } from '../test-utils';
import Icon from '../Icon';
import BottomNavigationAction from './BottomNavigationAction';

describe('<BottomNavigationAction />', () => {
  let shallow;
  let classes;
  const icon = <Icon>restore</Icon>;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<BottomNavigationAction />);
  });

  it('should render a ButtonBase', () => {
    const wrapper = shallow(<BottomNavigationAction icon={icon} />);
    assert.strictEqual(wrapper.name(), 'WithStyles');
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<BottomNavigationAction icon={icon} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(
      <BottomNavigationAction className="woofBottomNavigationAction" icon={icon} />,
    );
    assert.strictEqual(wrapper.hasClass('woofBottomNavigationAction'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the selected and root classes', () => {
    const wrapper = shallow(<BottomNavigationAction icon={icon} selected />);
    assert.strictEqual(wrapper.hasClass(classes.selected), true, 'should have the selected class');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the selectedIconOnly and root classes', () => {
    const wrapper = shallow(<BottomNavigationAction icon={icon} showLabel={false} />);
    assert.strictEqual(
      wrapper.hasClass(classes.selectedIconOnly),
      true,
      'should have the selectedIconOnly class',
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render icon with the icon class', () => {
    const wrapper = shallow(<BottomNavigationAction icon={icon} />);
    const iconWrapper = wrapper.childAt(0).childAt(0);
    assert.strictEqual(iconWrapper.hasClass(classes.icon), true, 'should have the icon class');
  });

  it('should render icon with the user and icon classes', () => {
    const wrapper = shallow(<BottomNavigationAction icon={icon} />);

    const iconWrapper = wrapper.childAt(0).childAt(0);
    assert.strictEqual(iconWrapper.is(Icon), true, 'should be an Icon');
    assert.strictEqual(iconWrapper.hasClass(classes.icon), true, 'should have the icon class');

    const labelWrapper = wrapper.childAt(0).childAt(1);
    assert.strictEqual(labelWrapper.hasClass(classes.label), true, 'should have the label class');
  });

  it('should render label with the selectedLabel class', () => {
    const wrapper = shallow(<BottomNavigationAction icon={icon} selected />);
    const labelWrapper = wrapper.childAt(0).childAt(1);
    assert.strictEqual(labelWrapper.hasClass(classes.selectedLabel), true);
    assert.strictEqual(labelWrapper.hasClass(classes.label), true);
  });

  it('should render label with the hiddenLabel class', () => {
    const wrapper = shallow(<BottomNavigationAction icon={icon} showLabel={false} />);
    const labelWrapper = wrapper.childAt(0).childAt(1);
    assert.strictEqual(
      labelWrapper.hasClass(classes.hiddenLabel),
      true,
      'should have the hiddenLabel class',
    );
    assert.strictEqual(labelWrapper.hasClass(classes.label), true, 'should have the label class');
  });

  it('should render a font icon if a icon string is provided', () => {
    const wrapper = shallow(<BottomNavigationAction icon="book" />);
    const iconWrapper = wrapper.childAt(0).childAt(0);
    assert.strictEqual(iconWrapper.is(Icon), true, 'should be an Icon');
  });

  it('should not render an Icon if icon is not provided', () => {
    const wrapper = shallow(<BottomNavigationAction />);
    assert.strictEqual(wrapper.find(Icon).exists(), false);
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const wrapper = shallow(
        <BottomNavigationAction icon="book" onClick={handleClick} value="foo" />,
      );
      wrapper.simulate('click', 'bar');
      assert.strictEqual(handleClick.callCount, 1, 'it should forward the onClick');
    });
  });

  describe('prop: onChange', () => {
    it('should be called when a click is triggered', () => {
      const handleChange = spy();
      const wrapper = shallow(
        <BottomNavigationAction icon="book" onChange={handleChange} value="foo" />,
      );
      wrapper.simulate('click', 'bar');
      assert.strictEqual(handleChange.callCount, 1, 'it should forward the onChange');
    });
  });
});
