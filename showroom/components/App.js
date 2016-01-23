import React from 'react';
import _axios from 'axios';
import { RouteHandler } from 'react-router-transition-context';
import lodash from 'lodash';
import { find } from 'lodash';
import { props, t } from 'tcomb-react';
import SidebarContent from '../../src/kitchen-sink/sidebar/SidebarContent';
import ReactSidebar from 'react-sidebar';
import * as brc from '../../src';
import * as RCDatepicker from 'rc-datepicker/src';
import InputChildren from 'react-input-children/src';
import TextareaAutosize from 'react-autosize-textarea/src';
import { cookie, default as CookieBanner } from 'react-cookie-banner/src';
import json from 'raw!../components.json';

require('./app.scss');

const scope = {
  React,
  ...lodash,
  ...brc,
  ...RCDatepicker,
  InputChildren,
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
    if (process.env.NODE_ENV === 'development') {
      const sections = JSON.parse(json);
      this.setState({ sections });
    } else {
      this.axios.get('react-components/gh-pages/showroom/components.json')
        .then((res) => this.setState({ sections: res.data }));
    }
  }

  onSelectItem = (sectionId, id) => {
    const section = find(this.state.sections, { id: sectionId });
    const route = section.components ? 'component' : 'content';
    const param = `${route}Id`;
    this.props.router.transitionToPatch(route, { sectionId, [param]: id });
  }

  onToggleSection = (sectionId) => {
    const { query: { openSections: querySections }, router } = this.props;
    const openSections = (querySections || '').split(';');
    if (openSections.indexOf(sectionId) === -1) {
      router.transitionToPatch(null, null, { openSections: openSections.concat(sectionId).join(';') });
    } else {
      router.transitionToPatch(null, null, { openSections: openSections.filter(s => s !== sectionId).join(';') });
    }
  }

  render() {
    const {
      state: { sections },
      props: { query: { openSections: querySections } },
      onToggleSection, onSelectItem
    } = this;
    if (!sections) {
      return null;
    }

    const openSections = (querySections || '').split(';');

    return (
      <div>
        <div className='kitchen-sink'>
          <div className='sidebar'>
            <ReactSidebar docked sidebar={<SidebarContent {...{ sections, onToggleSection, openSections, onSelectItem }} />} transitions={false}>
              <div />
            </ReactSidebar>
          </div>
        </div>
        <RouteHandler {...{ ...this.props, sections, openSections, onToggleSection, onSelectItem, scope }} />
      </div>
    );
  }

}
