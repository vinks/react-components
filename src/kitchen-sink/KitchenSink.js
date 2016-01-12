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
<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
    sections: React.PropTypes.array.isRequired,
    openSections: React.PropTypes.array,
=======
    sections: React.PropTypes.array,
<<<<<<< 00c4ba345bf788190fa67bf64c63e9848d183a3b
>>>>>>> refactor KitchenSink to show plain markdown sections too
    components: React.PropTypes.array,
    onSelectItem: React.PropTypes.func.isRequired,
<<<<<<< 0bb8d30883ebffc86e98419f48b6a6995b84a2ce
    onToggleSection: React.PropTypes.func.isRequired,
    scope: React.PropTypes.object,
    iso: React.PropTypes.bool,
    header: React.PropTypes.node,
    footer: React.PropTypes.node,
    loading: React.PropTypes.bool
=======
    scope: React.PropTypes.object.isRequired,
=======
    openSections: React.PropTypes.array,
    components: React.PropTypes.array,
    onSelectItem: React.PropTypes.func.isRequired,
    onToggleSection: React.PropTypes.func,
    scope: React.PropTypes.object,
>>>>>>> add sectionsOpen and onToggleSections to KitchenSink
    iso: React.PropTypes.bool,
    header: React.PropTypes.node,
<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
    footer: React.PropTypes.node
>>>>>>> add header and footer to KitchenSink
  }

  static defaultProps = {
    openSections: []
  }

  findSection = () => find(this.props.sections, { id: this.props.sectionId }) || {}
=======
    footer: React.PropTypes.node,
    loading: React.PropTypes.bool
  }

  findSection = () => find(this.props.sections, { id: this.props.sectionId })
>>>>>>> refactor KitchenSink to show plain markdown sections too

  findComponent = () => find(this.findSection().components, { id: this.props.componentId })

  findContent = () => find(this.findSection().contents, { id: this.props.contentId })

  render() {
    const {
      props: {
        componentId,
        contentId,
        sections,
<<<<<<< 00c4ba345bf788190fa67bf64c63e9848d183a3b
<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
        openSections,
=======
>>>>>>> refactor KitchenSink to show plain markdown sections too
=======
        openSections,
>>>>>>> add sectionsOpen and onToggleSections to KitchenSink
        onSelectItem,
        onToggleSection,
        scope,
        iso,
        header,
<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
<<<<<<< 0bb8d30883ebffc86e98419f48b6a6995b84a2ce
        footer,
        loading
      }
=======
        footer
      },
      state: { component }
>>>>>>> add header and footer to KitchenSink
=======
        footer,
        loading
      }
>>>>>>> refactor KitchenSink to show plain markdown sections too
    } = this;

    const children = componentId ?
      <Component {...{ component: this.findComponent(), scope, iso, header, footer }} />
      :
      <Content content={this.findContent()} />;

    return (
      <div className='kitchen-sink'>
<<<<<<< 00c4ba345bf788190fa67bf64c63e9848d183a3b
<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
<<<<<<< 0bb8d30883ebffc86e98419f48b6a6995b84a2ce
        <Sidebar {...{ sections, openSections, onToggleSection, componentId, contentId, onSelectItem, loading }} >
          {!loading && children}
=======
        <Sidebar {...{ sections, components, componentId, onSelectItem }} >
          <Content {...{ component, scope, iso, header, footer }} />
>>>>>>> add header and footer to KitchenSink
=======
        <Sidebar {...{ sections, componentId, contentId, onSelectItem, loading }} >
=======
        <Sidebar {...{ sections, openSections, onToggleSection, componentId, contentId, onSelectItem, loading }} >
>>>>>>> add sectionsOpen and onToggleSections to KitchenSink
          {children}
>>>>>>> refactor KitchenSink to show plain markdown sections too
        </Sidebar>
      </div>
    );
  }

}
