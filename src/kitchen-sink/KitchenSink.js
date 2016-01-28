import React from 'react';
import find from 'lodash/collection/find';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';
import Component from './content/Component';

export default class KitchenSink extends React.Component {

  static propTypes = {
    componentId: React.PropTypes.string,
    contentId: React.PropTypes.string,
    sectionId: React.PropTypes.string,
    sections: React.PropTypes.array.isRequired,
    openSections: React.PropTypes.array,
    components: React.PropTypes.array,
    onSelectItem: React.PropTypes.func.isRequired,
    onToggleSection: React.PropTypes.func.isRequired,
    scope: React.PropTypes.object,
    iso: React.PropTypes.bool,
    header: React.PropTypes.node,
    footer: React.PropTypes.node,
    loading: React.PropTypes.bool
  };

  static defaultProps = {
    openSections: []
  };

  findSection = () => find(this.props.sections, { id: this.props.sectionId }) || {};

  findComponent = () => find(this.findSection().components, { id: this.props.componentId });

  findContent = () => find(this.findSection().contents, { id: this.props.contentId });

  render() {
    const {
      props: {
        componentId,
        contentId,
        sections,
        openSections,
        onSelectItem,
        onToggleSection,
        scope,
        iso,
        header,
        footer,
        loading
      }
    } = this;

    const children = componentId ?
      <Component {...{ component: this.findComponent(), scope, iso, header, footer }} />
      :
      <Content content={this.findContent()} />;

    return (
      <div className='kitchen-sink'>
        <Sidebar {...{ sections, openSections, onToggleSection, componentId, contentId, onSelectItem, loading }} >
          {!loading && children}
        </Sidebar>
      </div>
    );
  }

}
