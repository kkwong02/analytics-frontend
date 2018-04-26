import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap'
import { _navItems } from './settings/_navItems'


class SidebarNav extends Component {
    renderHeader(item) {
        return (
        <li className="nav-title">{item.name}</li>
        );
    }

    renderIcon(iconName) {

    }

    renderNavItem(item) {
        return (
            <NavItem>
                <NavLink href={item.url}>
                    {this.renderIcon(item.icon)}
                    {item.name}
                </NavLink>
            </NavItem>
        );
    }

    render() {
        let navComponents = _navItems.map(item => {
            if (item.title) {
                return this.renderHeader(item)
            }
            return this.renderNavItem(item)

        })

        return (
            <Nav>
            {navComponents}
            </Nav>
        );
    }
}

export default SidebarNav;