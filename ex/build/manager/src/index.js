import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import "antd/dist/antd.min.css"
import App from './router/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
