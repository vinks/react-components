import React from 'react';
import LoadingSpinner from '../../loading-spinner';
import ExampleCard from './ExampleCard';

<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
export default class Component extends React.Component {
=======
export default class Content extends React.Component {
>>>>>>> refactor KitchenSink to show plain markdown sections too

  static propTypes = {
    iso: React.PropTypes.bool,
    scope: React.PropTypes.object.isRequired,
    component: React.PropTypes.object
  }

  render() {
    const { scope, component, iso, header, footer } = this.props;
    const { examples } = component || {};
    return (
      <div className='component'>
<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
        <div className='header markdown-body'>
=======
        <div className='header'>
>>>>>>> refactor KitchenSink to show plain markdown sections too
          {header}
        </div>
        <div className='examples'>
          {examples ? examples.map((codeText, key) => <ExampleCard {...{ codeText, iso, scope, key }} />) : <LoadingSpinner />}
        </div>
<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
        <div className='footer markdown-body'>
=======
        <div className='footer'>
>>>>>>> refactor KitchenSink to show plain markdown sections too
          {footer}
        </div>
      </div>
    );
  }

}
