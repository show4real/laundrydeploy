import { identity } from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Pagination } from "antd";
import { getSearches } from "../services/categoryService";
import Header from "./Header";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            searches: [],
            rows: 10,
            page: 1,
            total: 0,
            search: window.search,
        };
    }

    componentDidMount() {
        this.getSearches();
    }

    getSearches = async () => {
        this.setState({ loading: true });
        const { search, rows, page } = this.state;
        await getSearches({ search, rows, page }).then(
            (res) => {
                this.setState({
                    searches: res.searches.data,
                    page: res.searches.current_page,
                    total: res.searches.total,
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
        await this.getSearches();
    };

    render() {
        const { searches, rows, page, total, search } = this.state;
        console.log(search);

        return (
            <>
                <Header />

                <div class="container-fluid-lg">
                    <div
                        className="row d-md-none d-block"
                        style={{ marginBottom: 30, marginTop: 20 }}
                    >
                        <div className="col-sm-12">
                            <div class="middle-box">
                                <SearchBar />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-custome-12">
                            <div class="row g-sm-4 g-3 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section">
                                {searches.map((search) => (
                                    <div>
                                        <div class="product-box-3 h-100 wow fadeInUp">
                                            <div class="product-header">
                                                <div class="product-image">
                                                    <a href="#">
                                                        <img
                                                            src={
                                                                search.image_url
                                                            }
                                                            class="img-fluid blur-up lazyload"
                                                            alt=""
                                                        />
                                                    </a>

                                                    <ul class="product-option">
                                                        <li
                                                            data-bs-toggle="tooltip"
                                                            data-bs-placement="top"
                                                            title="View"
                                                        >
                                                            <a
                                                                href="javascript:void(0)"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#view"
                                                            >
                                                                <i data-feather="eye"></i>
                                                            </a>
                                                        </li>

                                                        <li
                                                            data-bs-toggle="tooltip"
                                                            data-bs-placement="top"
                                                            title="Compare"
                                                        >
                                                            <a href="compare.html">
                                                                <i data-feather="refresh-cw"></i>
                                                            </a>
                                                        </li>

                                                        <li
                                                            data-bs-toggle="tooltip"
                                                            data-bs-placement="top"
                                                            title="Wishlist"
                                                        >
                                                            <a
                                                                href="wishlist.html"
                                                                class="notifi-wishlist"
                                                            >
                                                                <i data-feather="heart"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="product-footer">
                                                <div class="product-detail">
                                                    <span class="span-name">
                                                        {search.category_name}
                                                    </span>
                                                    <a href="product-left-thumbnail.html">
                                                        <h5 class="name">
                                                            {search.name}
                                                        </h5>
                                                    </a>
                                                    <p class="text-content mt-1 mb-2 product-content">
                                                        Vendor:
                                                        {
                                                            search.vendor
                                                                .shop_name
                                                        }
                                                    </p>
                                                    <p class="text-content mt-1 mb-2 product-content">
                                                        Service:{" "}
                                                        {
                                                            search.vendor
                                                                .service_name
                                                        }
                                                    </p>

                                                    <h5 class="price">
                                                        <span class="theme-color">
                                                            ${search.price}
                                                        </span>
                                                    </h5>
                                                    <div class="addtocart_btn">
                                                        <div class="qty-box cart_qty">
                                                            <div class="input-group">
                                                                <button
                                                                    type="button"
                                                                    class="btn qty-left-minus"
                                                                    data-type="minus"
                                                                    data-field=""
                                                                >
                                                                    <i
                                                                        class="fa fa-shopping-cart"
                                                                        aria-hidden="true"
                                                                    ></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="row" style={{ marginTop: "100px" }}>
                                {searches.length < 1 && (
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
                                        No product for your search{" "}
                                        <b>{search}</b>
                                    </div>
                                )}
                            </div>

                            <nav class="custome-pagination">
                                {searches.length > 0 && (
                                    <Pagination
                                        total={total}
                                        showTotal={(total) =>
                                            `Total ${total} Searches`
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

                <Footer />
            </>
        );
    }
}

export default Search;

if (document.getElementById("search")) {
    ReactDOM.render(<Search />, document.getElementById("search"));
}
