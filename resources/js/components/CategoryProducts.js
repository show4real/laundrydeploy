import React, { Component } from "react";
import { getCategoryProducts, getCategory } from "../services/categoryService";
import ReactDOM from "react-dom";
import { Pagination } from "antd";
import Header from "./Header";
import Footer from "./Footer";

export class CategoryProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_id: window.category_id,
            vendor: JSON.parse(localStorage.getItem("vendor")),
            products: [],
            rows: 10,
            page: 1,
            total: 0,
            category: {},
            loading: false,
        };
    }
    componentDidMount() {
        this.getProducts();
        this.getCategory();
    }

    getCategory = () => {
        getCategory({ category_id }).then(
            (res) => {
                this.setState({
                    category: res.category,
                    loading: false,
                });
            },
            (error) => {
                this.setState({ loading: false });
            }
        );
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

    onPage = async (page, rows) => {
        await this.setState({ page, rows });
        await this.getProducts();
    };
    render() {
        const { products, vendor, rows, page, total, category, loading } =
            this.state;
        return (
            <>
                <Header />
                {loading && (
                    <div class="fullpage-loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
                {vendor !== null && category !== {} ? (
                    <>
                        <section class="breadscrumb-section pt-0">
                            <div class="container-fluid-lg">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="breadscrumb-contain">
                                            <h2
                                                style={{
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {category.name} Category
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class="section-b-space shop-section">
                            <div class="container-fluid-lg">
                                <div class="row">
                                    <div class="col-custome-12">
                                        <div class="show-button">
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

export default CategoryProducts;
if (document.getElementById("categoryproducts")) {
    ReactDOM.render(
        <CategoryProducts />,
        document.getElementById("categoryproducts")
    );
}
