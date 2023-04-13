import { identity } from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Pagination } from "antd";
import {
    getCategories,
    getCategoryProducts,
} from "../services/categoryService";
import Header from "./Header";
import Footer from "./Footer";
export class DetailedCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            categories: [],
            products: [],
            category_id: "",
            vendor: JSON.parse(localStorage.getItem("vendor")),
            all: "",
            rows: 10,
            page: 1,
            total: 0,
        };
    }

    componentDidMount() {
        this.getCategories();
        this.getProducts();
    }

    getCategories = () => {
        this.setState({ loading: true });
        getCategories().then(
            (res) => {
                this.setState({
                    categories: res.categories,
                    loading: false,
                });
            },
            (error) => {
                this.setState({ loading: false });
            }
        );
    };

    onOpen = async (category_id) => {
        await this.setState({ category_id, rows: 10, page: 1 });

        await this.getProducts();
    };

    onPage = async (page, rows) => {
        await this.setState({ page, rows });
        await this.getProducts();
    };

    getProducts = () => {
        const { category_id, page, rows, vendor } = this.state;
        this.setState({ loading: true });

        getCategoryProducts({ category_id, page, vendor, rows }).then(
            (res) => {
                this.setState({
                    products: res.products.data,
                    page: res.products.current_page,
                    total: res.products.total,
                    loading: false,
                });
            },
            (error) => {
                this.setState({ loading: false });
            }
        );
    };

    render() {
        const { categories, products, vendor, all, rows, page, total } =
            this.state;
        return (
            <>
                <Header />
                {vendor !== null ? (
                    <>
                        <section class="breadscrumb-section pt-0">
                            <div class="container-fluid-lg">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="breadscrumb-contain">
                                            <h2>Shop Category</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class="section-b-space shop-section">
                            <div class="container-fluid-lg">
                                <div class="row">
                                    <div class="col-custome-3">
                                        <div class="left-box wow fadeInUp">
                                            <div class="shop-left-sidebar">
                                                <ul
                                                    class="nav nav-pills mb-3 custom-nav-tab"
                                                    id="pills-tab"
                                                    role="tablist"
                                                >
                                                    <li
                                                        class="nav-item"
                                                        role="presentation"
                                                    >
                                                        <button
                                                            class="nav-link active"
                                                            id="pills-vegetables"
                                                            data-bs-toggle="pill"
                                                            data-bs-target="#pills-vegetable"
                                                            type="button"
                                                            role="tab"
                                                            aria-selected="true"
                                                            onClick={() =>
                                                                this.onOpen(all)
                                                            }
                                                        >
                                                            All
                                                        </button>
                                                    </li>
                                                    {categories.map(
                                                        (category) => (
                                                            <li
                                                                class="nav-item"
                                                                role="presentation"
                                                            >
                                                                <button
                                                                    class="nav-link active"
                                                                    id="pills-vegetables"
                                                                    data-bs-toggle="pill"
                                                                    data-bs-target="#pills-vegetable"
                                                                    type="button"
                                                                    role="tab"
                                                                    aria-selected="true"
                                                                    onClick={() =>
                                                                        this.onOpen(
                                                                            category.id
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                    <img
                                                                        src={
                                                                            category.image_url
                                                                        }
                                                                        class="blur-up lazyload"
                                                                        alt=""
                                                                    />
                                                                </button>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-custome-9">
                                        <div class="show-button">
                                            <div class="filter-button d-inline-block d-lg-none">
                                                <a>
                                                    <i class="fa-solid fa-filter"></i>{" "}
                                                    Filter Menu
                                                </a>
                                            </div>

                                            <div class="top-filter-menu">
                                                <div class="category-dropdown">
                                                    <h5 class="text-content">
                                                        {/* Sort By : */}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row g-sm-4 g-3 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section">
                                            {products.length > 0 ? (
                                                products.map((product) => (
                                                    <div>
                                                        <div class="product-box-3 h-100 wow fadeInUp">
                                                            <div class="product-header">
                                                                <div class="product-image">
                                                                    <a
                                                                        href={`/product/${product.id}`}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                product.image_url
                                                                            }
                                                                            class="img-fluid blur-up lazyload"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="product-footer">
                                                                <div class="product-detail">
                                                                    <span class="span-name">
                                                                        {
                                                                            product.category_name
                                                                        }
                                                                    </span>
                                                                    <a
                                                                        href={`/product/${product.id}`}
                                                                    >
                                                                        <h5 class="name">
                                                                            {
                                                                                product.cloth_name
                                                                            }
                                                                        </h5>
                                                                    </a>

                                                                    <h5 class="price">
                                                                        <span class="theme-color">
                                                                            $
                                                                            {
                                                                                product.price
                                                                            }
                                                                        </span>
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div
                                                    style={{
                                                        color: "#ccc",
                                                        alignSelf: "center",
                                                        paddingLeft: 10,
                                                        fontSize: 20,
                                                    }}
                                                >
                                                    <i
                                                        className="fa fa-ban"
                                                        style={{
                                                            marginRight: 5,
                                                        }}
                                                    />
                                                    No Product found for this
                                                    category
                                                </div>
                                            )}
                                        </div>

                                        <nav class="custome-pagination">
                                            {products.length > 0 && (
                                                <Pagination
                                                    total={total}
                                                    showTotal={(total) =>
                                                        `Total ${total} Products`
                                                    }
                                                    onChange={this.onPage}
                                                    pageSize={rows}
                                                    current={page}
                                                />
                                            )}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <>
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
                            Please select a Vendor with your location on the
                            icon above
                        </div>
                    </>
                )}
                <Footer />
            </>
        );
    }
}

export default DetailedCategory;

if (document.getElementById("detailedcategory")) {
    ReactDOM.render(
        <DetailedCategory />,
        document.getElementById("detailedcategory")
    );
}
