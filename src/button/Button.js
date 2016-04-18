import React from 'react';
import cx from 'classnames';
import pick from 'lodash/pick';
import every from 'lodash/every';
import { pure, skinnable, props, t, stateClassUtil } from '../utils';
import ButtonLogic, { buttonState, buttonBaseState } from './ButtonLogic';
import ButtonRenderer from './ButtonRenderer';

// util
const notBoth = (a, b) => !(a && b);
const satisfyAll = (...conditions) => (props) => every(conditions.map(condition => condition(props)));

// invariants
const propsInvariants = [
  ({ label, icon, children }) => notBoth(label || icon, children), // notBothChildrenAndLabelOrIcon
  ({ primary, flat }) => notBoth(primary, flat), // notBothFlatAndPrimary
  ({ fluid, circular }) => notBoth(fluid, circular), // notFluidAndCircular
  ({ circular, icon, label }) => !circular || (icon && !label), // circularOnlyIfIconAndNotLabel
  ({ type, primary, flat }) => notBoth(type, flat || primary) // notTypeAndItsShortucts
];

const ButtonProps = t.subtype(t.struct({
  /**
  * ready or not-allowed; use it if you want button to handle its internal state and onClick is a promise
  */
  baseState: t.maybe(buttonBaseState),
  /**
  * if baseState is passed, it indicates if the success should be persistent or temporary
  */
  stableSuccess: t.maybe(t.Boolean),
  /**
  * if baseState is passed, indicates how long it should take to return to ready state from error state (or from  success state if stableSuccess === false)
  */
  timerMillis: t.maybe(t.Number),
  /**
  * ready, not-allowed, processing, success, error; overrides `baseState`, use it if you want button to be a functional component
  */
  buttonState: t.maybe(buttonState),
  /**
  * callback
  */
  onClick: t.Func,
  /**
  * can be a String, or a dictionary { [buttonState]: String }, t.maybe(t.union([t.Str,  stringForButtonStates])
  */
  label: t.maybe(t.union([t.String, t.Object])),
  /**
  * can be a String referring to an icon, or a dictionary { [buttonState]: String },t.maybe(t.union([t.Str, stringForButtonStates]))
  */
  icon: t.maybe(t.union([t.String, t.Object])),
  /**
  * otherwise just pass children
  */
  children: t.maybe(t.ReactChildren),
  /**
  * type of the button
  */

  type: t.maybe(t.enums.of(['default', 'primary', 'positive', 'negative', 'flat'])),
  /**
  * shortcut for type
  */
  primary: t.maybe(t.Boolean),
  /**
  * shortcut for type,
  */
  flat: t.maybe(t.Boolean),
  /**
  * size of the button,
  */

  size: t.enums.of(['tiny', 'small', 'medium']),
  /**
  * fluid (block) button, takes the width of the container
  */
  fluid: t.maybe(t.Boolean),
  /**
  * circular button, only if it's an icon only button
  */
  circular: t.maybe(t.Boolean),
  /**
  * function to handle the overflow of too long labels, replacing with ellipsed string and tooltip
  */
  textOverflow: t.maybe(t.Function),
  /**
  * custom style
  */
  style: t.maybe(t.Object),
  /**
  * adds a className to top-level tag
  */
  className: t.maybe(t.String)
}), satisfyAll(...propsInvariants), 'ButtonProps');

const defaultProps = {
  size: 'medium',
  baseState: 'ready',
  stableSuccess: false,
  timerMillis: 2000,
  fluid: false,
  primary: false,
  circular: false,
  icon: '',
  className: '',
  style: {}
};

@pure
@skinnable()
@props(ButtonProps)
export default class Button extends React.Component {

  static defaultProps = defaultProps;

  getLocals() {

    const { size, style, textOverflow, fluid, circular } = this.props;

    const defaultLabels = {
      success: 'success',
      error: 'error',
      processing: 'processing'
    };

    const defaultIcons = {
      success: 'validate',
      error: 'exclamation'
    };

    const makeProp = x => ( typeof x === 'string' ? { ready: x, 'not-allowed': x } : x );

    const label = {
      ...defaultLabels,
      ...makeProp(this.props.label || this.props.children)
    };

    const icon = {
      ...defaultIcons,
      ...makeProp(this.props.icon)
    };

    const buttonLogicProps = pick(this.props, ['baseState', 'buttonState', 'onClick', 'stableSuccess', 'timerMillis']);

    const getButtonType = () => {
      const { type, primary, flat } = this.props;
      return type || (primary && 'primary') || (flat && 'flat') || 'default';
    };

    const wrapperStyle = {
      display: fluid ? 'block' : 'inline-block',
      width: fluid ? '100%' : null
    };

    const isIconButton = () => this.props.icon && !this.props.label;

    const className = cx(
      stateClassUtil(getButtonType()),
      { 'icon-button': isIconButton() },
      { circular },
      stateClassUtil(size),
      this.props.className
    );

    const buttonRendererProps = {
      style,
      wrapperStyle,
      className,
      textOverflow,
      label,
      icon
    };

    return {
      buttonLogicProps,
      buttonRendererProps
    };
  }

  template({ buttonLogicProps, buttonRendererProps }) {
    return (
      <ButtonLogic {...buttonLogicProps}>
        {(props) => <ButtonRenderer {...props} {...buttonRendererProps} />}
      </ButtonLogic>
    );
  }

}
