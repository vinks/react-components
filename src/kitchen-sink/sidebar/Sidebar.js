import React from 'react';
import ReactSidebar from 'react-sidebar';
import LoadingSpinner from '../../loading-spinner';
import SidebarContent from './SidebarContent';

export default class Sidebar extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
    sections: React.PropTypes.array.isRequired,
    openSections: React.PropTypes.array.isRequired,
    onSelectItem: React.PropTypes.func.isRequired,
    onToggleSection: React.PropTypes.func,
=======
    sections: React.PropTypes.array,
    components: React.PropTypes.array,
    componentId: React.PropTypes.string,
    onSelectItem: React.PropTypes.func.isRequired,
>>>>>>> refactor KitchenSink to show plain markdown sections too
    loading: React.PropTypes.bool
  }

  render() {
    const { children, loading, ...props } = this.props;
    const sidebar = <SidebarContent {...props} />;
    return (
      <div className='sidebar'>
        <ReactSidebar shadow={false} docked sidebar={sidebar} transitions={false}>
          {loading ? <LoadingSpinner /> : children}
        </ReactSidebar>
      </div>
    );
  }

}
