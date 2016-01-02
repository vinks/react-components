import React from 'react';
import _axios from 'axios';
import lodash from 'lodash';
import { find } from 'lodash';
import { props, t } from 'revenge';
import KitchenSink from '../../src/kitchen-sink';
import * as brc from '../../src';
import * as RCDatepicker from 'rc-datepicker/src';
import components from 'raw!../components.json';

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
    if (process.env.NODE_ENV === 'development') {
      const sections = JSON.parse(components)
      this.setState(
        { sections },
        () => this.loadComponent(componentId)
      );
    } else {
      this.axios.get('react-kitchen-sink/master/src/components.json')
        .then((res) => {
          const sections = res.data;
          this.setState(
            { sections },
            () => this.loadComponent(componentId))
        });
    }
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
