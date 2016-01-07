import React from 'react';
import _axios from 'axios';
import lodash from 'lodash';
import { find } from 'lodash';
import { props, t } from 'revenge';
import KitchenSink from 'buildo-react-components/src/kitchen-sink';
import * as brc from 'buildo-react-components/src';
import * as rrc from 'revenge-react-components/src';
import * as RCDatepicker from 'rc-datepicker/src';
import InputLink from 'react-input-link/src';
import TextareaAutosize from 'react-autosize-textarea/src';
// import { cookie, default as CookieBanner } from 'react-cookie-banner/src';
import components from 'raw!../components.json';

require('./app.scss');

const scope = {
  React,
  ...lodash,
  ...brc,
  ...rrc,
  ...RCDatepicker,
  InputLink,
  TextareaAutosize,
  // cookie, CookieBanner
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
      this.axios.get('react-components/gh-pages/kitchen-sink/components.json')
        .then((res) => {
          const sections = res.data;
          this.setState(
            { sections },
            () => this.loadComponent(componentId)
          );
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
