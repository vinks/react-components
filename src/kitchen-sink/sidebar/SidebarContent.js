import React from 'react';
import Item from './Item';
import Accordion from './Accordion/Accordion';

export default class SidebarContent extends React.Component {

  static propTypes = {
    sections: React.PropTypes.array,
<<<<<<< 00c4ba345bf788190fa67bf64c63e9848d183a3b
<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
    openSections: React.PropTypes.array.isRequired,
    onSelectItem: React.PropTypes.func.isRequired,
    onToggleSection: React.PropTypes.func
  }

  isActive = (id) => false && id

  isOpen = (sectionId) => this.props.openSections.indexOf(sectionId) !== -1

  onToggle = (id) => () => this.props.onToggleSection(id)
=======
    onSelectItem: React.PropTypes.func.isRequired
=======
    openSections: React.PropTypes.array.isRequired,
    onSelectItem: React.PropTypes.func.isRequired,
    onToggleSection: React.PropTypes.func
>>>>>>> add sectionsOpen and onToggleSections to KitchenSink
  }

  isActive = (id) => false
>>>>>>> refactor KitchenSink to show plain markdown sections too

  isOpen = (sectionId) => this.props.openSections.indexOf(sectionId) !== -1

  onToggle = (id) => () => this.props.onToggleSection(id)

  render() {
    const { sections, onSelectItem } = this.props;
    const getItems = (sectionId, items) => items.map(({ id, ...item }) =>
      <Item {...item} id={id} onClick={onSelectItem} sectionId={sectionId} indent active={this.isActive(id)} key={id} />
    );

<<<<<<< 192c63eeef423357c5e0742f575625807303c2f9
<<<<<<< 392de274684b69f40edfe884a5e87555dbcaf006
    const getSections = (sections) => sections.map(({ id, components, contents, title }) =>
      <Accordion onToggle={this.onToggle(id)} isOpen={this.isOpen(id)} title={title} key={id}>
        {getItems(id, components || contents)}
      </Accordion>);
=======
    const getSections = (sections) => sections.map(({ id, components, title }) =>
      <Accordion title={title} key={id}>{getItems(id, components)}</Accordion>)
>>>>>>> kitchen-sink sections should be accordions
=======
    const getSections = (sections) => sections.map(({ id, components, contents, title }) =>
<<<<<<< 00c4ba345bf788190fa67bf64c63e9848d183a3b
      <Accordion title={title} key={id}>{getItems(id, components || contents)}</Accordion>)
>>>>>>> refactor KitchenSink to show plain markdown sections too
=======
      <Accordion onToggle={this.onToggle(id)} isOpen={this.isOpen(id)} title={title} key={id}>
        {getItems(id, components || contents)}
      </Accordion>)
>>>>>>> add sectionsOpen and onToggleSections to KitchenSink

    return (
      <div className='sidebar-content'>
        {getSections(sections)}
      </div>
    );
  }

}
