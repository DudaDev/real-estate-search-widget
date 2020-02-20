import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';


export function init({ containerId, container, props } = {}) {
  const parent = container || document.getElementById(containerId)
  ReactDOM.render(<App {...props} />, parent);
}

export function clean({ container } = {}) {
  if (container) {
    React.DOM.unmountComponentAtNode(container);
  }
}

if (process.env.NODE_ENV === "development") {
  init({ containerId: 'root' });
}
