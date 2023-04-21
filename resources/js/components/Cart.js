import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Card, Button } from "antd";
import { getProducts } from "../services/categoryService";
import Header from "./Header";
import Footer from "./Footer";
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products: [],
            symbol: "$",
            deleted: 0,
            carts:
                JSON.parse(localStorage.getItem("cart")) !== null
                    ? JSON.parse(localStorage.getItem("cart"))
                    : [],
        };
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = () => {
        this.setState({ loading: true });
        getProducts().then(
            (res) => {
                this.setState({
                    products: res.products,
                    loading: false,
                });
            },
            (error) => {
                this.setState({ loading: false });
            }
        );
    };

    incrementCount(item, index) {
        const items = this.state.carts;
        item.quantity = Number(item.quantity) + 1;
        items.splice(index, 1, item);
        this.setState({
            carts: items,
        });
        localStorage.setItem("cart", JSON.stringify(items));
    }

    decrementCount(item, index) {
        const items = this.state.carts;
        if (item.quantity > 1) {
            item.quantity -= 1;
        }
        items.splice(index, 1, item);
        this.setState({
            carts: items,
        });
        localStorage.setItem("cart", JSON.stringify(items));
    }

    removeFromCart(index) {
        const list = this.state.carts;

        list.splice(index, 1);
        this.setState({ carts: list, deleted: 1 });
        localStorage.setItem("cart", JSON.stringify(list));
    }

    formatCurrency(x) {
        if (x !== null && x !== 0) {
            const parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return `${parts.join(".")}`;
        }
        return 0;
    }

    totalCart() {
        const { carts, company } = this.state;
        let sum = 0;

        for (let i = 0; i < carts.length; i += 1) {
            sum +=
                carts[i].quantity !== 0
                    ? carts[i].quantity * carts[i].price
                    : 0 * carts[i].price;
        }
        return this.formatCurrency(sum);
    }

    render() {
        const { carts, deleted } = this.state;
        console.log(carts);

        return (
            <>
                <Header cartItems={carts} added={deleted} />
                <section class="breadscrumb-section pt-0">
                    <div class="container-fluid-lg">
                        <div class="row">
                            <div class="col-12">
                                <div class="breadscrumb-contain">
                                    <h2>Cart</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="cart-section section-b-space">
                    <div class="container-fluid-lg">
                        <div class="row g-sm-5 g-3">
                            <div class="col-xxl-9">
                                <div class="cart-table">
                                    <div class="table-responsive-xl">
                                        <table class="table">
                                            <tbody>
                                                {carts.map((cart, key) => (
                                                    <tr
                                                        class="product-box-contain"
                                                        key={key}
                                                    >
                                                        <td class="product-detail">
                                                            <div class="product border-0">
                                                                <a
                                                                    href="product-left-thumbnail.html"
                                                                    class="product-image"
                                                                >
                                                                    <img
                                                                        src={
                                                                            cart.image_url
                                                                        }
                                                                        class="img-fluid blur-up lazyload"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                                <div class="product-detail">
                                                                    <ul>
                                                                        <li class="name">
                                                                            <a
                                                                                href="#"
                                                                                style={{
                                                                                    textTransform:
                                                                                        "capitalize",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    cart.cloth_name
                                                                                }
                                                                            </a>
                                                                        </li>

                                                                        <li class="text-content">
                                                                            <span class="text-title">
                                                                                Sold
                                                                                By:
                                                                            </span>{" "}
                                                                            {
                                                                                cart.shop_name
                                                                            }
                                                                        </li>

                                                                        <li>
                                                                            <h5 class="text-content d-inline-block">
                                                                                Price
                                                                                :
                                                                            </h5>
                                                                            <span>
                                                                                $
                                                                                {
                                                                                    cart.price
                                                                                }
                                                                            </span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td class="price">
                                                            <h4 class="table-title text-content">
                                                                Price
                                                            </h4>
                                                            <h5>
                                                                ${cart.price}{" "}
                                                            </h5>
                                                        </td>

                                                        <td class="quantity">
                                                            <h4 class="table-title text-content">
                                                                Qty
                                                            </h4>
                                                            <div class="quantity-price">
                                                                <div class="cart_qty">
                                                                    <div class="input-group">
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline-primary"
                                                                            onClick={() =>
                                                                                this.decrementCount(
                                                                                    cart,
                                                                                    key
                                                                                )
                                                                            }
                                                                        >
                                                                            -
                                                                        </Button>

                                                                        <span
                                                                            style={{
                                                                                padding:
                                                                                    "10px",
                                                                            }}
                                                                        >
                                                                            {
                                                                                cart.quantity
                                                                            }
                                                                        </span>

                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline-primary"
                                                                            onClick={() =>
                                                                                this.incrementCount(
                                                                                    cart,
                                                                                    key
                                                                                )
                                                                            }
                                                                        >
                                                                            +
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td class="subtotal">
                                                            <h4 class="table-title text-content">
                                                                Total
                                                            </h4>
                                                            <h5>
                                                                $
                                                                {cart.quantity *
                                                                    cart.price}
                                                            </h5>
                                                            <Button
                                                                size="xs"
                                                                style={{
                                                                    marginLeft: 10,
                                                                    backgroundColor:
                                                                        "white",
                                                                    color: "black",
                                                                }}
                                                                onClick={() =>
                                                                    this.removeFromCart(
                                                                        key
                                                                    )
                                                                }
                                                            >
                                                                <i className="fa fa-trash" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xxl-3">
                                <div class="summery-box p-sticky">
                                    <div class="summery-header">
                                        <h3>Cart Total</h3>
                                    </div>

                                    <div class="summery-contain">
                                        <ul>
                                            <li>
                                                <h4>Subtotal</h4>
                                                <h4 class="price">
                                                    ${this.totalCart()}
                                                </h4>
                                            </li>

                                            <li class="align-items-start">
                                                <h4>Shipping</h4>
                                                <h4 class="price text-end">
                                                    $6.90
                                                </h4>
                                            </li>
                                        </ul>
                                    </div>

                                    <ul class="summery-total">
                                        <li class="list-total border-top-0">
                                            <h4>Total (USD)</h4>
                                            <h4 class="price theme-color">
                                                ${this.totalCart() + 6.9}
                                            </h4>
                                        </li>
                                    </ul>

                                    <div class="button-group cart-button">
                                        <ul>
                                            <li>
                                                <a href="/checkout">
                                                    <button class="btn btn-animation proceed-btn fw-bold">
                                                        Process To Checkout
                                                    </button>
                                                </a>
                                            </li>

                                            <li>
                                                <a href="/">
                                                    <button class="btn btn-light shopping-button text-dark">
                                                        <i class="fa-solid fa-arrow-left-long"></i>
                                                        Return To Shopping
                                                    </button>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    }
}

export default Cart;

if (document.getElementById("cart")) {
    ReactDOM.render(<Cart />, document.getElementById("cart"));
}
