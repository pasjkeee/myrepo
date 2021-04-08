import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';

import {Provider} from 'react-redux';
import RestoServiceContext from './components/resto-service-context';

import RestoService from './services/resto-service';

import store from './store';

const restoService = new RestoService();

ReactDOM.render(
  <Provider store={store}>
            <RestoServiceContext.Provider value={restoService}>
                    <App/>
            </RestoServiceContext.Provider>
    </Provider>,
  document.getElementById('root')
);
