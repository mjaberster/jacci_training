import React from 'react';
import ReactDom from 'react-dom';
import './MainHeader.css';

const MainHeader = props => {
  const content = <header className="main-header">{props.children}</header>;
  return ReactDom.createPortal(content, document.getElementById("header-nav"));
};

export default MainHeader;
