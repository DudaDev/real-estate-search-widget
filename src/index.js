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
  init({
    containerId: 'root',
    props: {
      dudaConfig: {
        'mls': 'actris'
        /*
        'properties': [
          { mlsNumber: 2406916 },
          { mlsNumber: 1576428 },
          { mlsNumber: 4923985 },
          { mlsNumber: 4419826 },
          { mlsNumber: 9513356 },
          { mlsNumber: 3227133 }
        ]
        */
      }
    }
  });
}
