import React from 'react';
import './theme.css';
import TopNav from '../top-nav/index.jsx';
import SideNav from '../side-nav/index.jsx';
export default class Layout extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
          <div id='wrapper'>
            <TopNav/>
            <SideNav/>
              {this.props.children}
          </div>
        );
    }
}
