import React from 'react';
import _axios from 'axios';
import { RouteHandler } from 'react-router-transition-context';
import lodash from 'lodash';
import { find } from 'lodash';
import { props, t } from 'tcomb-react';
import { FlexView } from '../../src/flex';
import SidebarContent from '../../src/kitchen-sink/sidebar/SidebarContent';
import ReactSidebar from 'react-sidebar';
import * as brc from '../../src';
import * as RCDatepicker from 'rc-datepicker/src';
import InputLink from 'react-input-link/src';
import TextareaAutosize from 'react-autosize-textarea/src';
import { cookie, default as CookieBanner } from 'react-cookie-banner/src';
import json from 'raw!../components.json';

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
    this.axios = _axios.create({ baseURL: 'https://rawgit.com/buildo' });
    this.state = {};
  }

  componentDidMount() {
    this.loadJSON();
  }

  loadJSON = () => {
    const { query: { componentId } } = this.props;
    if (process.env.NODE_ENV === 'development') {
      const sections = JSON.parse(json)
      this.setState({ sections });
    } else {
      this.axios.get('react-components/gh-pages/showroom/components.json')
        .then((res) => this.setState({ sections: res.data }));
    }
  }

  onSelectItem = (sectionId, id) => {
    const section = find(this.state.sections, { id: sectionId });
    const route = section.components ? 'component' : 'content';
    const param = route + 'Id';
    this.props.router.transitionTo(route, { sectionId, [param]: id });
  }

  render() {
    const { state: { sections }, onSelectItem } = this;
    if (!sections) {
      return null;
    }

    return (
      <div>
        <div className='kitchen-sink'>
          <div className='sidebar'>
            <ReactSidebar docked sidebar={<SidebarContent {...{ sections, onSelectItem }} />} transitions={false} />
          </div>
        </div>
        <RouteHandler {...{ ...this.props, sections, onSelectItem, scope }} />
      </div>
    );
  }

}
