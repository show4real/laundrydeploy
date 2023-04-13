import React, { Component } from "react";
import ReactDOM from "react-dom";
import Category from "./Category";
import Product from "./Product";

import {
    getProducts,
    getShops,
    getCategories,
} from "../services/categoryService";
import Header from "./Header";
import Shop from "./Shop";
import Footer from "./Footer";

const MyBackgroundImage = "../assets/images/grocery/banner/1.jpg";

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            product_loading: false,
            category_loading: false,
            shop_loading: false,
            categories: [],
            shops: [],
            products: [],
            vendor: JSON.parse(localStorage.getItem("vendor")),
            rows: 10,
            page: 1,
            total: 0,
        };
    }

    componentDidMount() {
        this.getProducts();
        this.getShops();
        this.getCategories();
    }

    onPage = async (page, rows) => {
        await this.setState({ page, rows });
        await this.getProducts();
    };

    getProducts = async () => {
        this.setState({ product_loading: true });
        const { vendor, rows, page } = this.state;
        await getProducts({ vendor, rows, page }).then(
            (res) => {
                this.setState({
                    products: res.products.data,
                    page: res.products.current_page,
                    total: res.products.total,
                    product_loading: false,
                });
            },
            (error) => {
                this.setState({ product_loading: false });
            }
        );
    };

    getCategories = async () => {
        this.setState({ category_loading: true });
        await getCategories().then(
            (res) => {
                this.setState({
                    categories: res.categories,
                    category_loading: false,
                });
            },
            (error) => {
                this.setState({ category_loading: false });
            }
        );
    };

    getShops = async () => {
        this.setState({ shop_loading: true });
        await getShops().then(
            (res) => {
                this.setState({
                    shops: res.shops,
                    shop_loading: false,
                });
            },
            (error) => {
                this.setState({ shop_loading: false });
            }
        );
    };

    render() {
        const {
            products,
            shops,
            categories,
            product_loading,
            category_loading,
            shop_loading,
            vendor,
            page,
            rows,
            total,
        } = this.state;
        return (
            <>
                <div style={{ margin: 0, padding: 0 }}>
                    <Header />
                </div>
                {product_loading && (
                    <div class="fullpage-loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
                <section
                    class="home-section-2 home-section-bg pt-0 overflow-hidden"
                    style={{
                        backgroundImage: `url(${MyBackgroundImage})`,
                        // backgroundImage: `url(${externalImage})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        height: "500px",
                    }}
                >
                    <div class="container-fluid p-0">
                        <div class="row">
                            <div class="col-12">
                                <div class="home-contain rounded-0 p-0">
                                    <div class="home-detail home-big-space p-center-left home-overlay position-relative">
                                        <div class="container-fluid-lg">
                                            <div>
                                                <h6 class="ls-expanded theme-color text-uppercase">
                                                    Weekend Special offer
                                                </h6>
                                                <h1 class="heding-2">
                                                    Premium Quality Dry Fruits
                                                </h1>
                                                <h2 class="content-2">
                                                    Dryfruits shopping made Easy
                                                </h2>
                                                <h5 class="text-content">
                                                    Fresh & Top Quality Dry
                                                    Fruits are available here!
                                                </h5>
                                                <button
                                                    class="btn theme-bg-color btn-md text-white fw-bold mt-md-4 mt-2 mend-auto"
                                                    onclick="location.href = 'shop-left-sidebar.html';"
                                                >
                                                    Shop Now{" "}
                                                    <i class="fa-solid fa-arrow-right icon"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {vendor !== null ? (
                    <>
                        {/* <!-- Category Section Start --> */}
                        <section class="category-section-3">
                            <div class="container-fluid-lg">
                                <div class="title">
                                    <h2>Shop By Categories</h2>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        {!category_loading && (
                                            <Category categories={categories} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                        {!product_loading && (
                            <>
                                {" "}
                                <section class="product-section-3">
                                    <Product
                                        products={products}
                                        page={page}
                                        rows={rows}
                                        total={total}
                                        onPage={this.onPage}
                                    />
                                </section>
                            </>
                        )}
                        <div className="row" style={{ marginTop: "100px" }}>
                            {products.length < 1 && (
                                <div
                                    style={{
                                        color: "#ccc",
                                        alignSelf: "center",
                                        padding: 10,
                                        fontSize: 30,
                                    }}
                                >
                                    <i
                                        className="fa fa-ban"
                                        style={{
                                            marginRight: 5,
                                        }}
                                    />
                                    No Product for the Vendor with this location
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="row" style={{ marginTop: "100px" }}>
                            {products.length < 1 && (
                                <div
                                    style={{
                                        color: "#ccc",
                                        alignSelf: "center",
                                        paddingLeft: 40,
                                        fontSize: 30,
                                    }}
                                >
                                    <i
                                        className="fa fa-ban"
                                        style={{
                                            marginRight: 5,
                                        }}
                                    />
                                    Please select a Vendor with your location on
                                    the icon above
                                </div>
                            )}
                        </div>
                    </>
                )}
                <div style={{ padding: 0, margin: 0 }}>
                    <Footer />
                </div>
            </>
        );
    }
}

export default Home;

if (document.getElementById("home")) {
    ReactDOM.render(<Home />, document.getElementById("home"));
}
