import React from 'react';
import { FlexView } from '../../../flex';
<<<<<<< c4e426ba275c7758b7b4bb59f81db60632d0feee
<<<<<<< 392de274684b69f40edfe884a5e87555dbcaf006
import Icon from '../../../Icon';
=======
import { Icon } from '../../../Icon';
>>>>>>> kitchen-sink sections should be accordions
=======
import Icon from '../../../Icon';
>>>>>>> fix Icon import in Accordion

import './accordion.scss';

export default class Accordion extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
<<<<<<< 00c4ba345bf788190fa67bf64c63e9848d183a3b
<<<<<<< 392de274684b69f40edfe884a5e87555dbcaf006
=======
>>>>>>> add sectionsOpen and onToggleSections to KitchenSink
    title: React.PropTypes.string,
    isOpen: React.PropTypes.bool,
    onToggle: React.PropTypes.func
  }

  static defaultProps = {
    onToggle: () => {}
<<<<<<< 00c4ba345bf788190fa67bf64c63e9848d183a3b
=======
    title: React.PropTypes.string
>>>>>>> kitchen-sink sections should be accordions
=======
>>>>>>> add sectionsOpen and onToggleSections to KitchenSink
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

  toggleOpen = () => {
    const { onToggle } = this.props;
    if (onToggle) {
      onToggle();
    } else {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }

  render() {
<<<<<<< 00c4ba345bf788190fa67bf64c63e9848d183a3b
    const { children, title } = this.props;

>>>>>>> kitchen-sink sections should be accordions
=======
    const { children, title, isOpen } = this.props;
    const showContent = typeof isOpen !== 'undefined' ? isOpen : this.state.isOpen;
>>>>>>> add sectionsOpen and onToggleSections to KitchenSink
    return (
      <div className='accordion'>
        <FlexView className='header' onClick={this.toggleOpen}>
          <div>{title}</div>
          <FlexView marginLeft='auto' shrink={false}>
<<<<<<< bf2d28bedfac74a940a88deca7c7fd5b7519a507
<<<<<<< 392de274684b69f40edfe884a5e87555dbcaf006
            <Icon icon={showContent ? 'angle-up' : 'angle-down'} />
          </FlexView>
        </FlexView>
        {showContent &&
=======
            <Icon icon='user' />
=======
            <Icon icon={showContent ? 'angle-up' : 'angle-down'} />
>>>>>>> fix Accordion icons
          </FlexView>
        </FlexView>
<<<<<<< 00c4ba345bf788190fa67bf64c63e9848d183a3b
        {this.state.isOpen &&
>>>>>>> kitchen-sink sections should be accordions
=======
        {showContent &&
>>>>>>> add sectionsOpen and onToggleSections to KitchenSink
          <div className='content'>
            {children}
          </div>
        }
      </div>
    );
  }

}
