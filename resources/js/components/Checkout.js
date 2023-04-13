import React, { Component } from "react";
import ReactDOM from "react-dom";
import Footer from "./Footer";
import Header from "./Header";
import { Form } from "react-bootstrap";
import GoogleAutoComplete from "react-auto-complete-address-fields";
import "react-auto-complete-address-fields/build/GoogleAutoComplete.css";
import { addOrder } from "../services/categoryService";
import ReactJsAlert from "reactjs-alert";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyDafPdwDcLIJk5Wd9KBEwcJKnA2mhlrtGg");

export class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {
                name: "",
                phone: "",
                email: "",
            },
            errors: {
                name: "",
                phone: "",
                email: "",
            },
            err: {
                name: "",
            },
            address: "",
            longitude: 0,
            latitude: 0,
            submit: false,
            carts:
                JSON.parse(localStorage.getItem("cart")) !== null
                    ? JSON.parse(localStorage.getItem("cart"))
                    : [],
            vendor:
                JSON.parse(localStorage.getItem("vendor")) !== null
                    ? JSON.parse(localStorage.getItem("vendor"))
                    : "",
            saved: false,
        };

        this.callbackFunc = this.callbackFunc.bind(this);
    }

    callbackFunc = (result) => {
        console.log(result);
        this.setState({ address: result.formatted_address });
        Geocode.fromAddress(result.formatted_address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({ latitude: lat, longitude: lng });
            },
            (error) => {
                console.error(error);
            }
        );

        //You can use the address data, passed by autocomplete as you want.
    };

    handleCustomerInput = (e) => {
        this.setState({
            errors: {
                ...this.state.errors,
                [e.target.name]: this.validate(e.target.name, e.target.value),
            },
            fields: {
                ...this.state.fields,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleStatus = (e, state) => {
        this.setState({ [state]: e });
    };

    handleSubmit = (e) => {
        const { fields, address, vendor, carts, latitude, longitude } =
            this.state;
        let total_price = 0;

        for (let i = 0; i < carts.length; i += 1) {
            total_price +=
                carts[i].quantity !== 0
                    ? carts[i].quantity * carts[i].price
                    : 0 * carts[i].price;
        }
        e.preventDefault();
        let validationErrors = {};
        this.setState({ submit: true });
        Object.keys(fields).forEach((name) => {
            const error = this.validate(name, fields[name]);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            this.setState({ errors: validationErrors });
            return;
        }
        if (fields.name && address && fields.phone && fields.email) {
            const data = {
                name: fields.name,
                phone: fields.phone,
                email: fields.email,
            };
            const { name, phone, email } = data;
            console.log(data);

            this.setState({ saving: true });
            addOrder({
                name,
                phone,
                address,
                longitude,
                latitude,
                vendor,
                carts,
                total_price,
                email,
            })
                .then((v) => {
                    this.setState({
                        fields: {
                            name: "",
                        },
                        saving: false,
                        saved: true,
                    });
                    localStorage.removeItem("cart");

                    //window.location.reload();
                })
                .catch((err) => {
                    this.setState({ err });
                });
        }
    };

    validate = (name, value) => {
        switch (name) {
            case "name":
                if (!value) {
                    return "Your name is Required";
                } else {
                    return "";
                }
            case "phone":
                if (!value) {
                    return "Phone is Required";
                } else {
                    return "";
                }
            case "email":
                if (!value) {
                    return "Email is Required";
                } else if (
                    !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
                ) {
                    return "Enter a valid email address";
                } else {
                    return "";
                }

            default: {
                return "";
            }
        }
    };

    formatCurrency(x) {
        if (x !== null && x !== 0) {
            const parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return `${parts.join(".")}`;
        }
        return 0;
    }

    totalCart() {
        const { carts } = this.state;
        let sum = 0;

        for (let i = 0; i < carts.length; i += 1) {
            sum +=
                carts[i].quantity !== 0
                    ? carts[i].quantity * carts[i].price
                    : 0 * carts[i].price;
        }
        //this.setState({ total_price: sum });
        return this.formatCurrency(sum);
    }

    render() {
        const { fields, errors, err, address, submit, carts, saved } =
            this.state;
        return (
            <div>
                <Header />

                <section class="breadscrumb-section pt-0">
                    <div class="container-fluid-lg">
                        <div class="row">
                            <div class="col-12">
                                <div class="breadscrumb-contain">
                                    <h2>Checkout</h2>
                                    <nav>
                                        <ol class="breadcrumb mb-0">
                                            <li class="breadcrumb-item">
                                                <a href="index.html">
                                                    <i class="fa-solid fa-house"></i>
                                                </a>
                                            </li>
                                            <li
                                                class="breadcrumb-item active"
                                                aria-current="page"
                                            >
                                                Checkout
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {carts.length > 0 ? (
                    <>
                        <section class="checkout-section-2 section-b-space">
                            <div class="container-fluid-lg">
                                <div class="row g-sm-4 g-3">
                                    <div class="col-lg-8">
                                        <div class="left-sidebar-checkout">
                                            <div class="checkout-detail-box">
                                                <ul>
                                                    <li>
                                                        <div class="checkout-icon">
                                                            <lord-icon
                                                                target=".nav-item"
                                                                src="https://cdn.lordicon.com/ggihhudh.json"
                                                                trigger="loop-on-hover"
                                                                colors="primary:#121331,secondary:#646e78,tertiary:#0baf9a"
                                                                class="lord-icon"
                                                            ></lord-icon>
                                                        </div>

                                                        <div class="checkout-box">
                                                            <div class="checkout-title">
                                                                <h4>
                                                                    Delivery
                                                                    Information
                                                                </h4>
                                                            </div>

                                                            <div class="checkout-detail">
                                                                <div class="row">
                                                                    <div class="col-md-9">
                                                                        <div className="form-group">
                                                                            <input
                                                                                type="email"
                                                                                className="form-control form-control-lg"
                                                                                id="exampleInputEmail1"
                                                                                placeholder="Email Address"
                                                                                value={
                                                                                    fields.email
                                                                                }
                                                                                name="email"
                                                                                onChange={(
                                                                                    event
                                                                                ) =>
                                                                                    this.handleCustomerInput(
                                                                                        event
                                                                                    )
                                                                                }
                                                                            />
                                                                            <div>
                                                                                <span className="text-danger">
                                                                                    {
                                                                                        errors.email
                                                                                    }
                                                                                </span>
                                                                                {err.email !==
                                                                                    "" && (
                                                                                    <span className="text-danger">
                                                                                        {
                                                                                            err.email
                                                                                        }
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <Form.Group>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="exampleInputName1"
                                                                                    placeholder="Your Full Name"
                                                                                    name="name"
                                                                                    value={
                                                                                        fields.name
                                                                                    }
                                                                                    onChange={(
                                                                                        event
                                                                                    ) =>
                                                                                        this.handleCustomerInput(
                                                                                            event
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <div>
                                                                                    <span
                                                                                        style={{
                                                                                            paddingTop: 10,
                                                                                            fontSize: 12,
                                                                                            fontWeight:
                                                                                                "bold",
                                                                                        }}
                                                                                        className="text-danger"
                                                                                    >
                                                                                        {
                                                                                            errors.name
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            </Form.Group>
                                                                        </div>
                                                                        <div>
                                                                            <Form.Group>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="exampleInputName1"
                                                                                    placeholder="Your Phone"
                                                                                    name="phone"
                                                                                    value={
                                                                                        fields.phone
                                                                                    }
                                                                                    onChange={(
                                                                                        event
                                                                                    ) =>
                                                                                        this.handleCustomerInput(
                                                                                            event
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <div>
                                                                                    <span
                                                                                        style={{
                                                                                            paddingTop: 10,
                                                                                            fontSize: 12,
                                                                                            fontWeight:
                                                                                                "bold",
                                                                                        }}
                                                                                        className="text-danger"
                                                                                    >
                                                                                        {
                                                                                            errors.phone
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            </Form.Group>
                                                                        </div>
                                                                        <div>
                                                                            <GoogleAutoComplete
                                                                                apiKey="AIzaSyDafPdwDcLIJk5Wd9KBEwcJKnA2mhlrtGg"
                                                                                id="location"
                                                                                placeholder="Enter an Address"
                                                                                fields={{
                                                                                    streetAddress:
                                                                                        "route",
                                                                                    streetAddress2:
                                                                                        "administrative_area_level_4",
                                                                                    locality:
                                                                                        "locality",
                                                                                    cityOrState:
                                                                                        "administrative_area_level_1",
                                                                                    postalcode:
                                                                                        "postal_code",
                                                                                    country:
                                                                                        "country",
                                                                                }}
                                                                                callbackFunction={
                                                                                    this
                                                                                        .callbackFunc
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            {submit &&
                                                                                address ===
                                                                                    "" && (
                                                                                    <span
                                                                                        style={{
                                                                                            paddingTop: 10,
                                                                                            fontSize: 12,
                                                                                            fontWeight:
                                                                                                "bold",
                                                                                        }}
                                                                                        className="text-danger"
                                                                                    >
                                                                                        Address
                                                                                        is
                                                                                        required
                                                                                    </span>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div class="checkout-icon">
                                                            <lord-icon
                                                                target=".nav-item"
                                                                src="https://cdn.lordicon.com/oaflahpk.json"
                                                                trigger="loop-on-hover"
                                                                colors="primary:#0baf9a"
                                                                class="lord-icon"
                                                            ></lord-icon>
                                                        </div>
                                                        <div class="checkout-box">
                                                            <div class="checkout-title">
                                                                <h4>
                                                                    Delivery
                                                                </h4>
                                                            </div>

                                                            <div class="checkout-detail">
                                                                <div class="row g-4">
                                                                    <div class="col-xxl-6">
                                                                        <div class="delivery-option">
                                                                            <div class="delivery-category">
                                                                                <div class="shipment-detail">
                                                                                    <div class="form-check custom-form-check hide-check-box">
                                                                                        <input
                                                                                            class="form-check-input"
                                                                                            type="radio"
                                                                                            name="standard"
                                                                                            id="standard"
                                                                                            checked
                                                                                        />
                                                                                        <label
                                                                                            class="form-check-label"
                                                                                            for="standard"
                                                                                        >
                                                                                            Standard
                                                                                            Delivery
                                                                                            Option
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div class="checkout-icon">
                                                            <lord-icon
                                                                target=".nav-item"
                                                                src="https://cdn.lordicon.com/qmcsqnle.json"
                                                                trigger="loop-on-hover"
                                                                colors="primary:#0baf9a,secondary:#0baf9a"
                                                                class="lord-icon"
                                                            ></lord-icon>
                                                        </div>
                                                        <div class="checkout-box">
                                                            <div class="checkout-title">
                                                                <h4>Payment</h4>
                                                            </div>

                                                            <div class="checkout-detail">
                                                                <div
                                                                    class="accordion accordion-flush custom-accordion"
                                                                    id="accordionFlushExample"
                                                                >
                                                                    <div class="accordion-item">
                                                                        <div
                                                                            class="accordion-header"
                                                                            id="flush-headingFour"
                                                                        >
                                                                            <div
                                                                                class="accordion-button collapsed"
                                                                                data-bs-toggle="collapse"
                                                                                data-bs-target="#flush-collapseFour"
                                                                            >
                                                                                <div class="custom-form-check form-check mb-0">
                                                                                    <label
                                                                                        class="form-check-label"
                                                                                        for="cash"
                                                                                    >
                                                                                        <input
                                                                                            class="form-check-input mt-0"
                                                                                            type="radio"
                                                                                            name="flexRadioDefault"
                                                                                            id="cash"
                                                                                            checked
                                                                                        />{" "}
                                                                                        Cash
                                                                                        On
                                                                                        Delivery
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-4">
                                        <div class="right-side-summery-box">
                                            <div class="summery-box-2">
                                                <div class="summery-header">
                                                    <h3>Order Summary</h3>
                                                    <ReactJsAlert
                                                        status={saved} // true or false
                                                        type="success" // success, warning, error, info
                                                        title="Cart Checked Out Successfully Sign in with your 
                                                        email and your Phone no as password to track your orders
                                                        " // title you want to display
                                                        Close={() =>
                                                            this.setState({
                                                                saved: false,
                                                                carts: [],
                                                            })
                                                        } // callback method for hide
                                                    />
                                                </div>
                                                <ul class="summery-contain">
                                                    {carts.map((cart) => (
                                                        <li>
                                                            <img
                                                                src={
                                                                    cart.image_url
                                                                }
                                                                class="img-fluid blur-up lazyloaded checkout-image"
                                                                alt=""
                                                            />
                                                            <h4>
                                                                {
                                                                    cart.cloth_name
                                                                }{" "}
                                                                <span>
                                                                    X{" "}
                                                                    {
                                                                        cart.quantity
                                                                    }
                                                                </span>
                                                            </h4>
                                                            <h4 class="price">
                                                                $
                                                                {cart.price *
                                                                    cart.quantity}
                                                            </h4>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <ul class="summery-total">
                                                    <li>
                                                        <h4>Subtotal</h4>
                                                        <h4 class="price">
                                                            {this.totalCart()}
                                                        </h4>
                                                    </li>

                                                    <li>
                                                        <h4>Shipping</h4>
                                                        <h4 class="price">
                                                            $8.90
                                                        </h4>
                                                    </li>

                                                    <li class="list-total">
                                                        <h4>Total (USD)</h4>
                                                        <h4 class="price">
                                                            ${" "}
                                                            {this.totalCart() +
                                                                8.9}
                                                        </h4>
                                                    </li>
                                                </ul>
                                            </div>

                                            <button
                                                onClick={this.handleSubmit}
                                                class="btn theme-bg-color text-white btn-md w-100 mt-4 fw-bold"
                                            >
                                                Place Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <div
                        style={{
                            color: "#ccc",
                            alignSelf: "center",
                            padding: 10,
                            fontSize: 30,
                            marginBottom: 100,
                            marginTop: 100,
                        }}
                    >
                        <i
                            className="fa fa-ban"
                            style={{
                                marginRight: 5,
                            }}
                        />
                        No Carts Found
                    </div>
                )}

                <Footer />
            </div>
        );
    }
}

export default Checkout;

// We only want to try to render our component on pages that have a div with an ID
// of "Category"; otherwise, we will see an error in our console
if (document.getElementById("checkout")) {
    ReactDOM.render(<Checkout />, document.getElementById("checkout"));
}
