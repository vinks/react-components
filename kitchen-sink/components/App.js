import React from 'react';
import _axios from 'axios';
import lodash from 'lodash';
import { find } from 'lodash';
import { props, t } from 'revenge';
import KitchenSink from 'buildo-react-components/src/kitchen-sink';
import * as brc from 'buildo-react-components/src';

require('./app.scss');

const scope = {
  React,
  ...lodash,
  ...brc
};

@props({
  router: t.Function,
  query: t.Object,
  params: t.Object
})
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.axios = _axios.create({ baseURL: 'https://raw.githubusercontent.com/buildo/' });
    this.state = {};
  }

  componentDidMount() {
    this.loadJSON();
  }

  loadJSON = () => {
    const { query: { componentId } } = this.props;
    this.axios.get('react-kitchen-sink/master/src/components.json')
      .then((res) => {
        const sections = res.data;
        this.setState(
          { initialSections: sections, sections },
          () => this.loadComponent(componentId))
      });
  }

  loadComponent = (id) => {
    if (id) {
      const component = this.state.sections.reduce((acc, s) => acc || find(s.components, { id }), null) || {};
      _axios.all(component.examples.map(e => this.axios.get(e)))
        .then(res => {
          const examples = res.map(r => r.data);
          this.setState({ componentId: id, examples });
        });
    }
  }

  onSelectItem = (componentId) => this.props.router.transitionTo('/', { componentId }, { componentId })

  getSections = () => {
    const { sections, examples, componentId } = this.state;
    if (sections) {
      return sections.map((s) => ({ ...s, components: s.components.map(c => c.id === componentId ? { ...c, examples } : c) }));
    }
  }

  render() {
    const {
      state: { componentId },
      onSelectItem
    } = this;
    const sections = this.getSections();

    if (!sections) {
      return null;
    }

    return (
      <div>
        <KitchenSink {...{ sections, componentId, onSelectItem, scope }} />
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { query: { componentId } } = nextProps;
    if (componentId !== this.props.query.componentId) {
      this.loadComponent(componentId);
    }
  }

}
