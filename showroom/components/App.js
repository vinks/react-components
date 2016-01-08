import React from 'react';
import { parse } from 'react-docgen';
import _axios from 'axios';
import Markdown from 'react-remarkable';
import generateMarkdown from '../../generateReadmes/generateMarkdown';
import lodash from 'lodash';
import { find } from 'lodash';
import { props, t } from 'revenge';
import KitchenSink from '../../src/kitchen-sink';
import * as brc from '../../src';
import * as RCDatepicker from 'rc-datepicker/src';
import InputLink from 'react-input-link/src';
import TextareaAutosize from 'react-autosize-textarea/src';
import { cookie, default as CookieBanner } from 'react-cookie-banner/src';
import components from 'raw!../components.json';

require('./app.scss');

const scope = {
  React,
  ...lodash,
  ...brc,
  ...RCDatepicker,
  InputLink,
  TextareaAutosize,
  cookie, CookieBanner
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
      this.axios.get('react-components/gh-pages/showroom/components.json')
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
      const componentInfo = this.state.sections.reduce((acc, s) => acc || find(s.components, { id }), null) || {};

      const componentLink = this.axios.get(componentInfo.component);
      const examplesLinks = componentInfo.examples.map(e => this.axios.get(e));
      _axios.all([componentLink].concat(examplesLinks))
        .then(res => {
          const component = parse(res[0].data);
          const markdown = generateMarkdown(componentInfo.title, component);
          const header = <Markdown source={markdown.split('Props')[0]} options={{ html: true }}/>;
        const footer = <Markdown source={'Props\n' + markdown.split('Props')[1]} options={{ html: true }}/>;
          const examples = res.slice(1).map(r => r.data);
          this.setState({ componentId: id, examples, header, footer });
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
      state: { componentId, header, footer },
      onSelectItem
    } = this;
    const sections = this.getSections();

    if (!sections) {
      return null;
    }

    return (
      <div>
        <KitchenSink {...{ sections, componentId, onSelectItem, scope, header, footer }} />
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
