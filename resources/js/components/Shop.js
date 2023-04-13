import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Card, Button } from "antd";
import { getShops } from "../services/categoryService";
import Placeholder from "./Placeholder";
const { Meta } = Card;
class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            shops: props.shops,
            symbol: "$",
        };
    }

    // componentDidMount() {
    //     this.getShops();
    // }

    // getShops = () => {
    //     this.setState({ loading: true });
    //     getShops().then(
    //         (res) => {
    //             this.setState({
    //                 shops: res.shops,
    //                 loading: false,
    //             });
    //         },
    //         (error) => {
    //             this.setState({ loading: false });
    //         }
    //     );
    // };

    render() {
        const { shops, loading, symbol } = this.state;

        return (
            <>
                {shops.map((shop) => (
                    <div class="container-fluid-lg">
                        <div class="title" style={{ paddingTop: 20 }}>
                            <h2>{shop.shop_name}</h2>
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
                                                    product={shop.products}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div class="row g-sm-4 g-3 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section">
                                        {shop.products.map((product) => (
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
                                                            <a
                                                                href={`/product/${product.id}`}
                                                            >
                                                                <h5
                                                                    class="name"
                                                                    style={{
                                                                        paddingLeft: 4,
                                                                    }}
                                                                >
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
                                                            <div class="input-group">
                                                                <button
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
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    }
}

export default Shop;

if (document.getElementById("shop")) {
    ReactDOM.render(<Shop />, document.getElementById("shop"));
}
