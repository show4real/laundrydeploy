import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Card, Button } from "antd";
import { getProducts } from "../services/categoryService";
import Placeholder from "./Placeholder";
import CartBar from "./CartBar";
import { Pagination } from "antd";
const { Meta } = Card;
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products: props.products,
            page: props.page,
            rows: props.rows,
            total: props.total,
            cartItems: [],
            symbol: "$",
        };
    }

    render() {
        const { products, loading, symbol, cartItems, page, rows, total } =
            this.state;

        return (
            <>
                <div class="container-fluid-lg">
                    <div class="title">
                        <h2>Top Selling Products</h2>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <Card
                                style={{
                                    borderRadius: "5px",
                                    boxShadow:
                                        "5px 8px 24px 5px rgba(208, 216, 243, 0.4)",
                                }}
                            >
                                <div class="row">
                                    <div className="col-md-12">
                                        {loading && (
                                            <Placeholder
                                                loading={loading}
                                                product={products}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div class="row g-sm-4 g-3 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section">
                                    {products.map((product) => (
                                        <div>
                                            <div class="product-box-4 h-100 wow fadeInUp">
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
                                                        <h3
                                                            class="name"
                                                            style={{
                                                                textTransform:
                                                                    "capitalize",
                                                            }}
                                                        >
                                                            {product.cloth_name}
                                                        </h3>

                                                        <p class="text-content mt-1 mb-2 product-content">
                                                            <b>Vendor</b>:
                                                            {product.shop_name}
                                                        </p>

                                                        <h5 class="price">
                                                            <span class="theme-color">
                                                                ${product.price}
                                                            </span>
                                                        </h5>
                                                        <h5 class="price">
                                                            <button
                                                                style={{
                                                                    display:
                                                                        "inline-table",
                                                                }}
                                                                type="button"
                                                                class="btn"
                                                                data-type="minus"
                                                                data-field=""
                                                            >
                                                                <i
                                                                    class="fa fa-shopping-cart"
                                                                    aria-hidden="true"
                                                                ></i>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <nav class="custome-pagination">
                                    {products.length > 0 && (
                                        <Pagination
                                            total={total}
                                            showTotal={(total) =>
                                                `Total ${total} Products`
                                            }
                                            onChange={this.props.onPage}
                                            pageSize={rows}
                                            current={page}
                                        />
                                    )}
                                </nav>
                            </Card>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Product;

if (document.getElementById("product")) {
    ReactDOM.render(<Product />, document.getElementById("product"));
}
