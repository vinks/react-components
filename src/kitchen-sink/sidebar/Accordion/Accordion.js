import React from 'react';
import { FlexView } from '../../../flex';
<<<<<<< 392de274684b69f40edfe884a5e87555dbcaf006
import Icon from '../../../Icon';
=======
import { Icon } from '../../../Icon';
>>>>>>> kitchen-sink sections should be accordions

import './accordion.scss';

export default class Accordion extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
<<<<<<< 392de274684b69f40edfe884a5e87555dbcaf006
    title: React.PropTypes.string,
    isOpen: React.PropTypes.bool,
    onToggle: React.PropTypes.func
  }

  static defaultProps = {
    onToggle: () => {}
=======
    title: React.PropTypes.string
>>>>>>> kitchen-sink sections should be accordions
  }

  constructor(props) {
    super(props);
<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
<<<<<<< 392de274684b69f40edfe884a5e87555dbcaf006
    this.state = { isOpen: true };
  }

  toggleOpen = () => {
    const { onToggle } = this.props;
    if (onToggle) {
      onToggle();
    } else {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }

  render() {
    const { children, title, isOpen } = this.props;
    const showContent = typeof isOpen !== 'undefined' ? isOpen : this.state.isOpen;
=======
    this.state = { isOpen: false };
=======
    this.state = { isOpen: true };
>>>>>>> refactor KitchenSink to show plain markdown sections too
  }

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    const { children, title } = this.props;

>>>>>>> kitchen-sink sections should be accordions
    return (
      <div className='accordion'>
        <FlexView className='header' onClick={this.toggleOpen}>
          <div>{title}</div>
          <FlexView marginLeft='auto' shrink={false}>
<<<<<<< 392de274684b69f40edfe884a5e87555dbcaf006
            <Icon icon={showContent ? 'angle-up' : 'angle-down'} />
          </FlexView>
        </FlexView>
        {showContent &&
=======
            <Icon icon='user' />
          </FlexView>
        </FlexView>
        {this.state.isOpen &&
>>>>>>> kitchen-sink sections should be accordions
          <div className='content'>
            {children}
          </div>
        }
      </div>
    );
  }

}
