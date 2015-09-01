import React from 'react';
import DropdownTest from './components/Dropdown';
import MenuTest from './components/Menu';
import ModalTest from './components/Modal';
import PopoverTest from './components/Popover';
import FlexViewTest from './components/FlexView';
import LoadingSpinnerTest from './components/LoadingSpinner';
import MobileDetectorTest from './components/MobileDetector';
import LinkStateTest from './components/LinkState';

const modules = [
  // DropdownTest,
  // MenuTest,
  PopoverTest,
  // FlexViewTest,
  // LoadingSpinnerTest,
  // MobileDetectorTest,
  // LinkStateTest
];

const template = (
  <div style={{margin: 20}}>
    {modules.map((Module, i) => <Module key={i} />)}
  </div>
);

React.render(template, document.getElementById('container'));

// React.render(<ModalTest />, document.getElementById('modal'));