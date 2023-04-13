import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-multi-carousel/lib/styles.css";

import { getAllCategories } from "../services/categoryService";
import Header from "./Header";
import { Pagination } from "antd";
import Footer from "./Footer";

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            categories: [],
            vendor: JSON.parse(localStorage.getItem("vendor")),
            total: 0,
            page: 1,
            rows: 10,
        };
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories = async () => {
        this.setState({ loading: true });
        await getAllCategories().then(
            (res) => {
                this.setState({
                    categories: res.categories.data,
                    page: res.categories.current_page,
                    total: res.categories.total,
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
        await this.getCategories();
    };

    render() {
        const { categories, loading, total, page, rows, vendor } = this.state;
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
                <section class="breadscrumb-section pt-0">
                    <div class="container-fluid-lg">
                        <div class="row">
                            <div class="col-12">
                                <div class="breadscrumb-contain">
                                    <h2>Categories</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {!loading && vendor !== null && (
                    <section class="section-b-space shop-section">
                        <div class="container-fluid-lg">
                            <div class="row">
                                <div class="col-custome-12">
                                    <div class="row g-sm-4 g-3 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section">
                                        {categories.length > 0 ? (
                                            categories.map((category) => (
                                                <div>
                                                    <div class="product-box-3 h-100 wow fadeInUp">
                                                        <div class="product-header">
                                                            <div class="product-image">
                                                                <a
                                                                    href={`/category/${category.id}`}
                                                                >
                                                                    <img
                                                                        src={
                                                                            category.image_url
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
                                                                        category.name
                                                                    }
                                                                </span>
                                                                <a
                                                                    href={`/category/${category.id}`}
                                                                ></a>
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
                                                No Category found
                                            </div>
                                        )}
                                    </div>

                                    <nav class="custome-pagination">
                                        {categories.length > 0 && (
                                            <Pagination
                                                total={total}
                                                showTotal={(total) =>
                                                    `Total ${total} Categories`
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
                )}
                <Footer />
            </>
        );
    }
}

export default Categories;

// We only want to try to render our component on pages that have a div with an ID
// of "Category"; otherwise, we will see an error in our console
if (document.getElementById("categories")) {
    ReactDOM.render(<Categories />, document.getElementById("categories"));
}
