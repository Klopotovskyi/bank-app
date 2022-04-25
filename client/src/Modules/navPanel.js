import React from "react";
import {BrowserRouter, Link} from "react-router-dom";

const Nav = ()=> {
    return(
        <div>
            <nav>
                <div className="nav-wrapper">
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><Link to="/banks">Management Page</Link></li>
                        <li><Link to="/calculator">Mortgage Calculator</Link></li>
                    </ul>
                </div>
            </nav>
        </div>

    )
}
export default Nav;
