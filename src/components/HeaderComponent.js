import React, { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';
class Header extends Component{
  render() {
    return(
      //react frangment
        //below one can be just written as <>
      <React.Fragment>

      <Navbar dark>
      <div className="container">

      <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
    </div>
    </Navbar>
    <Jumbotron>
    <div className="container">
    <div className="row row-header">
    <div className="col-12 col-sm-6">
    <h1>Ristorante Con Fusion</h1>
    <p>We tale inspiration from world best experience that is from sreehari the future buisness mains</p>
    </div>
    </div>
    </div>
    </Jumbotron>
      </React.Fragment>
    );
  }
}

export default Header;
