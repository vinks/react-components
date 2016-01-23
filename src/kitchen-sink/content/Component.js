import React from 'react';
import LoadingSpinner from '../../loading-spinner';
import ExampleCard from './ExampleCard';

<<<<<<< 284355914c8ef8a44e78f8a2f1f0a08ba78f4ca2
<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
export default class Component extends React.Component {
=======
export default class Content extends React.Component {
>>>>>>> refactor KitchenSink to show plain markdown sections too
=======
export default class Component extends React.Component {
>>>>>>> use MoreOrLess to toggle code in LiveDemo; improve style

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
<<<<<<< 54f48e0c636d871b74a157a9a3fd57aab072bf6c
<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
        <div className='header markdown-body'>
=======
        <div className='header'>
>>>>>>> refactor KitchenSink to show plain markdown sections too
=======
        <div className='header markdown-body'>
>>>>>>> improve style: use github css + other fixes
          {header}
        </div>
        <div className='examples'>
          {examples ? examples.map((codeText, key) => <ExampleCard {...{ codeText, iso, scope, key }} />) : <LoadingSpinner />}
        </div>
<<<<<<< 54f48e0c636d871b74a157a9a3fd57aab072bf6c
<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
        <div className='footer markdown-body'>
=======
        <div className='footer'>
>>>>>>> refactor KitchenSink to show plain markdown sections too
=======
        <div className='footer markdown-body'>
>>>>>>> improve style: use github css + other fixes
          {footer}
        </div>
      </div>
    );
  }

}
