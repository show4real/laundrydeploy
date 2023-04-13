import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-multi-carousel/lib/styles.css";

import { getAllServices } from "../services/categoryService";
import Header from "./Header";
import { Pagination } from "antd";
import Footer from "./Footer";

class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            services: [],
            vendor: JSON.parse(localStorage.getItem("vendor")),
            total: 0,
            page: 1,
            rows: 10,
        };
    }

    componentDidMount() {
        this.getServices();
    }

    getServices = async () => {
        this.setState({ loading: true });
        await getAllServices().then(
            (res) => {
                this.setState({
                    services: res.services.data,
                    page: res.services.current_page,
                    total: res.services.total,
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
        await this.getServices();
    };

    render() {
        const { services, loading, total, page, rows, vendor } = this.state;
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
                                    <h2>Services</h2>
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
                                        {services.length > 0 ? (
                                            services.map((service) => (
                                                <div>
                                                    <div class="product-box-3 h-100 wow fadeInUp">
                                                        <div class="product-header">
                                                            <div class="product-image">
                                                                <a
                                                                    href={`/service/${service.id}`}
                                                                >
                                                                    <img
                                                                        src="../assets/images/service2.jpeg"
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
                                                                        service.name
                                                                    }
                                                                </span>
                                                                <a
                                                                    href={`/service/${service.id}`}
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
                                                No service found
                                            </div>
                                        )}
                                    </div>

                                    <nav class="custome-pagination">
                                        {services.length > 0 && (
                                            <Pagination
                                                total={total}
                                                showTotal={(total) =>
                                                    `Total ${total} Services`
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

export default Services;

// We only want to try to render our component on pages that have a div with an ID
// of "service"; otherwise, we will see an error in our console
if (document.getElementById("services")) {
    ReactDOM.render(<Services />, document.getElementById("services"));
}
