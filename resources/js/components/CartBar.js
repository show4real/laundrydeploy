import React, { Component } from "react";

export class CartBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>{this.props.cartItems.length}</div>;
    }
}

export default CartBar;
