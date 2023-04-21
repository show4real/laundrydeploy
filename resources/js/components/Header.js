import React, { Component } from "react";
import ReactDOM from "react-dom";
import { getVendors } from "../services/categoryService";
import SearchBar from "./SearchBar";
import { throttle, debounce } from "./debounce";

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            vendor: "",
            vendors: [],
            carts:
                JSON.parse(localStorage.getItem("cart")) !== null
                    ? JSON.parse(localStorage.getItem("cart"))
                    : [],
            cartItems: props.cartItems,
        };
        this.searchDebounced = debounce(this.searchVendors, 500);
        this.searchThrottled = throttle(this.searchVendors, 500);
    }

    componentDidMount() {
        this.getVendors();
    }

    onOpen = async (vendor) => {
        await this.setState({ vendor, shop_location: vendor });
        localStorage.setItem("vendor", JSON.stringify(vendor));
        localStorage.removeItem("cart");
        await this.getVendors();
        window.location.reload();
        location.assign("/");
    };

    getVendors = () => {
        const { page, rows, search, vendors, vendor } = this.state;
        this.setState({ loading: true });

        getVendors({ page, rows, search, vendors }).then(
            (res) => {
                this.setState({
                    vendors: res.vendors.data,
                    page: res.vendors.current_page,
                    total: res.vendors.total,
                    loading: false,
                });
            },
            (error) => {
                this.setState({ loading: false });
            }
        );
    };

    searchVendors = () => {
        const { page, rows, search, vendors } = this.state;
        this.setState({ loading: false });
        getVendors({ page, rows, search, vendors }).then(
            (res) => {
                this.setState({
                    vendors: res.vendors.data,
                    page: res.vendors.current_page,
                    total: res.vendors.total,
                    loading: false,
                });
            },
            (error) => {
                this.setState({ loading: false });
            }
        );
    };

    onChange = (e, state) => {
        this.setState({ [state]: e });
    };

    onPage = async (page, rows) => {
        await this.setState({ page, rows });
        await this.getVendors();
    };

    handleSearch = (event) => {
        this.setState({ search: event.target.value }, () => {
            if (this.state.search < 5) {
                this.searchThrottled(this.state.search);
            } else {
                this.searchDebounced(this.state.search);
            }
        });
    };

    render() {
        const { vendors, loading, carts, vendor, cartItems } = this.state;

        return (
            <>
                <header class="pb-md-4 pb-0">
                    <div class="header-top">
                        <div class="container-fluid-lg">
                            <div class="row">
                                <div class="col-xxl-3 d-xxl-block d-none">
                                    <div class="top-left-header">
                                        <i class="iconly-Location icli text-white"></i>
                                        <span class="text-white">
                                            1418 Riverwood Drive, CA 96052, US
                                        </span>
                                    </div>
                                </div>

                                <div class="col-xxl-6 col-lg-9 d-lg-block d-none">
                                    <div class="header-offer">
                                        <div class="notification-slider">
                                            <div>
                                                <div class="timer-notification">
                                                    <h6>
                                                        <strong class="me-1">
                                                            Welcome to Fastkart!
                                                        </strong>
                                                        Wrap new offers/gift
                                                        every signle day on
                                                        Weekends.
                                                        <strong class="ms-1">
                                                            New Coupon Code:
                                                            Fast024
                                                        </strong>
                                                    </h6>
                                                </div>
                                            </div>

                                            <div>
                                                <div class="timer-notification">
                                                    <h6>
                                                        Something you love is
                                                        now on sale!
                                                        <a
                                                            href="shop-left-sidebar.html"
                                                            class="text-white"
                                                        >
                                                            Buy Now !
                                                        </a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="top-nav top-header sticky-header">
                        <div class="container-fluid-lg">
                            <div class="row">
                                <div class="col-12">
                                    <div class="navbar-top">
                                        <button
                                            class="navbar-toggler d-xl-none d-inline navbar-menu-button"
                                            type="button"
                                            data-bs-toggle="offcanvas"
                                            data-bs-target="#primaryMenu"
                                        >
                                            <span class="navbar-toggler-icon">
                                                <i class="fa fa-bars"></i>
                                            </span>
                                        </button>
                                        <a href="/" class="web-logo nav-logo">
                                            <img
                                                src="/assets/images/logo/1.png"
                                                class="img-fluid blur-up lazyload"
                                                alt=""
                                            />
                                        </a>

                                        <div class="middle-box">
                                            <div class="location-box">
                                                <button
                                                    class="btn location-button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#locationModal"
                                                >
                                                    <span class="location-arrow">
                                                        <i data-feather="map-pin"></i>
                                                    </span>
                                                    <span class="locat-name">
                                                        Your Location
                                                    </span>
                                                    <i class="fa fa-solid fa-angle-down"></i>
                                                </button>
                                            </div>
                                            <SearchBar />
                                        </div>

                                        <div class="rightside-box">
                                            <ul class="right-side-menu">
                                                <li class="right-side">
                                                    <div class="delivery-login-box">
                                                        <div class="delivery-icon">
                                                            <div class="search-box">
                                                                <i data-feather="search"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="right-side">
                                                    <a
                                                        href="contact-us.html"
                                                        class="delivery-login-box"
                                                    >
                                                        <div class="delivery-icon">
                                                            <i data-feather="phone-call"></i>
                                                        </div>
                                                        <div class="delivery-detail">
                                                            <h6>
                                                                24/7 Delivery
                                                            </h6>
                                                            <h5>
                                                                +91 888 104 2340
                                                            </h5>
                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="right-side">
                                                    <div class="header-badge">
                                                        <a href={`/carts`}>
                                                            <button
                                                                type="button"
                                                                class="btn p-0 position-relative header-wishlist"
                                                            >
                                                                <i data-feather="shopping-cart"></i>
                                                                <span class="position-absolute top-0 start-100 translate-middle badge">
                                                                    {this.props
                                                                        .added ==
                                                                    1
                                                                        ? this
                                                                              .props
                                                                              .cartItems
                                                                              .length
                                                                        : carts.length}
                                                                </span>
                                                            </button>
                                                        </a>
                                                    </div>
                                                </li>
                                                <li class="right-side onhover-dropdown">
                                                    <div class="delivery-login-box">
                                                        <div class="delivery-icon">
                                                            <i data-feather="user"></i>
                                                        </div>
                                                        <div class="delivery-detail">
                                                            <h6>Hello,</h6>
                                                            <h5>My Account</h5>
                                                        </div>
                                                    </div>

                                                    <div class="onhover-div onhover-div-login">
                                                        <ul class="user-box-name">
                                                            <li class="product-box-contain">
                                                                <i></i>
                                                                <a href="login.html">
                                                                    Log In
                                                                </a>
                                                            </li>

                                                            <li class="product-box-contain">
                                                                <a href="sign-up.html">
                                                                    Register
                                                                </a>
                                                            </li>

                                                            <li class="product-box-contain">
                                                                <a href="forgot.html">
                                                                    Forgot
                                                                    Password
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container-fluid-lg">
                        <div class="row">
                            <div class="col-12">
                                <div class="header-nav">
                                    <div class="">
                                        <div class="main-nav navbar navbar-expand-xl navbar-light navbar-sticky">
                                            <div
                                                class="offcanvas offcanvas-collapse order-xl-2"
                                                id="primaryMenu"
                                            >
                                                <div class="offcanvas-header navbar-shadow">
                                                    <h5>Menu</h5>
                                                    <button
                                                        class="btn-close lead"
                                                        type="button"
                                                        data-bs-dismiss="offcanvas"
                                                        aria-label="Close"
                                                    ></button>
                                                </div>
                                                <div class="offcanvas-body">
                                                    <ul
                                                        class="navbar-nav"
                                                        style={{
                                                            paddingTop: 10,
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        <li class="nav-item">
                                                            <a
                                                                class="#"
                                                                href="/"
                                                            >
                                                                Home
                                                            </a>
                                                        </li>

                                                        <li class="nav-item">
                                                            <a
                                                                class="#"
                                                                href="/shop"
                                                            >
                                                                Shop
                                                            </a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a
                                                                class="#"
                                                                href="/categories"
                                                            >
                                                                Categories
                                                            </a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a
                                                                class="#"
                                                                href="/services"
                                                            >
                                                                Services
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div class="mobile-menu d-md-none d-block mobile-cart">
                    <ul style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <li class="active">
                            <a href="/">
                                <span>Home</span>
                            </a>
                        </li>

                        <li class="mobile-category">
                            <a href="/categories">
                                <span>Category</span>
                            </a>
                        </li>

                        <li>
                            <a href="/carts">
                                <span>Cart</span>
                            </a>
                        </li>
                        <li>
                            <a href="/search/search">
                                <span>Search</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div
                    class="modal location-modal fade theme-modal"
                    id="locationModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    Choose your Vendor within your Location
                                </h5>
                                <p class="mt-1 text-content">
                                    Enter your address and we will specify the
                                    offer for your area.
                                </p>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <i class="fa fa-times"></i>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="location-list">
                                    <div class="search-input">
                                        <input
                                            type="search"
                                            class="form-control"
                                            placeholder="Search Your Area"
                                            onChange={this.handleSearch}
                                        />
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </div>

                                    <div class="disabled-box">
                                        <h6>Select a Location</h6>
                                    </div>

                                    <ul class="location-select custom-height">
                                        {!loading &&
                                            vendors.map((vendor) => (
                                                <li>
                                                    <a
                                                        onClick={() =>
                                                            this.onOpen(
                                                                vendor.vendor.id
                                                            )
                                                        }
                                                        data-bs-dismiss="modal"
                                                        aria-label="Close"
                                                    >
                                                        <h6>
                                                            {
                                                                vendor.vendor
                                                                    .shop_name
                                                            }
                                                        </h6>
                                                        <span>
                                                            Address:{" "}
                                                            {
                                                                vendor.vendor
                                                                    .address
                                                            }
                                                        </span>
                                                    </a>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Header;

if (document.getElementById("header")) {
    ReactDOM.render(<Header />, document.getElementById("header"));
}
