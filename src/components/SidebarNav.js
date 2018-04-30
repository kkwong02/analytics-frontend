import React, { PureComponent } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap'
import { _navItems } from '../constants/_navItems'


class SidebarNav extends PureComponent {
    renderHeader(item, index) {
        return (
        <li key={index} className="nav-title">{item.name}</li>
        );
    }

    renderIcon(iconName) {

    }

    renderNavItem(item, index) {
        return (
            <NavItem key={index}>
                <NavLink href={item.url}>
                    {this.renderIcon(item.icon)}
                    {item.name}
                </NavLink>
            </NavItem>
        );
    }

    render() {
        let navComponents = _navItems.map((item, index) => {
            if (item.title) {
                return this.renderHeader(item, index)
            }
            return this.renderNavItem(item, index)

        })

        return (
            <Nav>
            {navComponents}
            </Nav>
        );
    }
}

export default SidebarNav;