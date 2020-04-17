import React from 'react';
import ReactDOM from 'react-dom';
import withRedux from 'next-redux-wrapper';
import App from 'next/app';

// import App from './App';
import { BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import store from '../redux/store'

// import * as serviceWorker from './serviceWorker';

class NewApp extends App {
    render() {
        const {Component, pageProps, ...props} = this.props;
        return (
        <Provider store={store}>
           <Component{...pageProps}{...props} />
        </Provider>
        )
    }
}
export default NewApp;
