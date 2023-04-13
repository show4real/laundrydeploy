import { identity } from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Pagination } from "antd";
import { getProduct } from "../services/categoryService";
import Header from "./Header";
import Footer from "./Footer";
export class DetailedProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            categories: [],
            products: [],
            category_id: "",
            all: "",
            rows: 10,
            page: 1,
            total: 0,
            product_id: window.product_id,
            product: {},
            cartItems: [],
        };
    }

    componentDidMount() {
        this.getProduct();
    }

    getProduct = () => {
        const { product_id } = this.state;
        this.setState({ loading: true });

        getProduct(product_id).then(
            (res) => {
                this.setState({
                    product: res.product,
                    loading: false,
                });
            },
            (error) => {
                this.setState({ loading: false });
            }
        );
    };

    addToCart = (addToCart) => {
        var cart =
            JSON.parse(localStorage.getItem("cart")) !== null
                ? JSON.parse(localStorage.getItem("cart"))
                : [];
        var items = this.state.cartItems === null ? [] : [...cart];

        var item = items.find((item) => item.id === addToCart.id);

        if (item) {
            item.quantity += 1;
        } else {
            items.push(addToCart);
        }

        this.setState({ cartItems: items });
        localStorage.setItem("cart", JSON.stringify(items));
    };

    inCart = (cartId) => {
        let inCartIds =
            JSON.parse(localStorage.getItem("cart")) !== null
                ? JSON.parse(localStorage.getItem("cart"))
                : [];

        var result = inCartIds.map((product, key) => {
            return product.id;
        });
        let validateId = result.includes(cartId);

        return validateId;
    };

    render() {
        const { product, loading, cartItems } = this.state;
        const alreadyAdded = this.inCart(product.id);
        console.log(alreadyAdded);
        return (
            <>
                <Header cartItems={cartItems} />
                {!loading && (
                    <>
                        <section class="breadscrumb-section pt-0">
                            <div class="container-fluid-lg">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="breadscrumb-contain">
                                            <h2>{product.cloth_name}</h2>
                                            <nav>
                                                <ol class="breadcrumb mb-0">
                                                    <li class="breadcrumb-item active">
                                                        {product.cloth_name}
                                                    </li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="product-section">
                            <div class="container-fluid-lg">
                                <div class="row">
                                    <div class="col-xxl-9 col-xl-8 col-lg-7 wow fadeInUp">
                                        <div class="row g-4">
                                            <div class="col-xl-6 wow fadeInUp">
                                                <div class="product-left-box">
                                                    <div class="row g-2">
                                                        <div class="col-xxl-10 col-lg-12 col-md-10 order-xxl-2 order-lg-1 order-md-2">
                                                            <div class="product-main-2 no-arrow">
                                                                <div>
                                                                    <div class="slider-image">
                                                                        <img
                                                                            src={
                                                                                product.image_url
                                                                            }
                                                                            id="img-1"
                                                                            data-zoom-image={
                                                                                product.image_url
                                                                            }
                                                                            class="img-fluid image_zoom_cls-0 blur-up lazyload"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                class="col-xl-6 wow fadeInUp"
                                                data-wow-delay="0.1s"
                                            >
                                                <div class="right-box-contain">
                                                    <h2 class="name">
                                                        {product.cloth_name}
                                                    </h2>

                                                    <div class="price-rating">
                                                        <h3
                                                            class="theme-color price"
                                                            style={{
                                                                paddingBottom: 10,
                                                            }}
                                                        >
                                                            ${product.price}{" "}
                                                        </h3>
                                                    </div>

                                                    <div class="price-rating">
                                                        <h6 class="offer-top">
                                                            Service:{" "}
                                                            {
                                                                product.service_name
                                                            }
                                                        </h6>
                                                    </div>
                                                    <div class="price-rating">
                                                        <h6 class="offer-top">
                                                            Category:{" "}
                                                            {
                                                                product.category_name
                                                            }
                                                        </h6>
                                                    </div>

                                                    <div class="note-box product-packege">
                                                        {alreadyAdded ===
                                                        false ? (
                                                            <button
                                                                onClick={() =>
                                                                    this.addToCart(
                                                                        product
                                                                    )
                                                                }
                                                                class="btn btn-md bg-dark cart-button text-white w-100"
                                                            >
                                                                Add To Cart
                                                            </button>
                                                        ) : (
                                                            <>
                                                                <a href="/carts">
                                                                    <button class="btn btn-md bg-success cart-button text-white w-100">
                                                                        Go to
                                                                        Cart
                                                                    </button>
                                                                </a>
                                                                <a href="/categories">
                                                                    <button class="btn btn-md bg-warning cart-button text-white w-100">
                                                                        Continue
                                                                        Shopping
                                                                    </button>
                                                                </a>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xxl-3 col-xl-4 col-lg-5 d-none d-lg-block wow fadeInUp">
                                        <div class="right-sidebar-box">
                                            <div class="vendor-box">
                                                <div class="verndor-contain">
                                                    <div class="vendor-image">
                                                        <img
                                                            src={
                                                                product.image_url
                                                            }
                                                            class="blur-up lazyload"
                                                            alt=""
                                                        />
                                                    </div>

                                                    <div class="vendor-name">
                                                        <h5 class="fw-500">
                                                            {product.shop_name}
                                                        </h5>
                                                    </div>
                                                </div>

                                                <p class="vendor-detail">
                                                    {product.vendor &&
                                                        product.vendor
                                                            .description}
                                                </p>

                                                <div class="vendor-list">
                                                    <ul>
                                                        <li>
                                                            <div class="address-contact">
                                                                <i data-feather="map-pin"></i>
                                                                <h5>
                                                                    Address:
                                                                    <span class="text-content">
                                                                        {product.vendor &&
                                                                            product
                                                                                .vendor
                                                                                .user
                                                                                .address}
                                                                    </span>
                                                                </h5>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div class="address-contact">
                                                                <i data-feather="headphones"></i>
                                                                <h5>
                                                                    Contact
                                                                    Seller:
                                                                    <span class="text-content">
                                                                        {product.vendor &&
                                                                            product
                                                                                .vendor
                                                                                .user
                                                                                .phone}
                                                                    </span>
                                                                </h5>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <Footer />
                    </>
                )}
            </>
        );
    }
}

export default DetailedProduct;

if (document.getElementById("detailedproduct")) {
    ReactDOM.render(
        <DetailedProduct />,
        document.getElementById("detailedproduct")
    );
}
