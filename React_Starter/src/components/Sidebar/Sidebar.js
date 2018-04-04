import React, {Component} from 'react';
import {Badge, Nav, NavItem, NavLink as RsNavLink} from 'reactstrap';
import classNames from 'classnames';
import nav from './_nav';
import SidebarForm from './../SidebarForm';
import SidebarHeader from './../SidebarHeader';
import SidebarMinimizer from './../SidebarMinimizer';

class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.hideMobile = this.hideMobile.bind(this);
  }


  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }


  hideMobile() {
    if (document.body.classList.contains('sidebar-mobile-show')) {
      document.body.classList.toggle('sidebar-mobile-show')
    }
  }

  // todo Sidebar nav secondLevel
  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }


  render() {

    // sidebar-nav root
    return (
      <div className="sidebar">
        <SidebarHeader/>
        <SidebarForm/>
        <nav className="sidebar-nav">
          <Nav>

          </Nav>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
