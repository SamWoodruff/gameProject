import React from 'react';
import { render } from 'react-dom';
import  ViewPort  from './ViewPort/';
import { Provider } from "react-redux";
import { store } from "./reduxConfig/store";

render(<Provider store={store}><ViewPort /></Provider>, document.getElementById('root'));
