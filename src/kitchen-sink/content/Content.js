import React from 'react';
import Markdown from 'react-remarkable';

export default class Content extends React.Component {

  static propTypes = {
    content: React.PropTypes.shape({
      content: React.PropTypes.string.isRequired
    }).isRequired
  }

  render() {
<<<<<<< 0bb8d30883ebffc86e98419f48b6a6995b84a2ce
    return (
      <div className='content'>
        <div className='body markdown-body'>
          <Markdown source={this.props.content.content} options={{ html: true }} />
=======
    const { scope, component, iso, header, footer } = this.props;
    const { examples } = component || {};
    return (
      <div className='content'>
        <div className='header'>
          {header}
        </div>
        <div className='examples'>
          {examples ? examples.map((codeText, key) => <ExampleCard {...{ codeText, iso, scope, key }} />) : <LoadingSpinner />}
        </div>
        <div className='footer'>
          {footer}
>>>>>>> add header and footer to KitchenSink
        </div>
      </div>
    );
  }

}
