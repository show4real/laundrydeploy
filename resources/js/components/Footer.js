import React, { Component } from "react";
import ReactDOM from "react-dom";
export class Footer extends Component {
    render() {
        return (
            <footer
                class="section-t-space footer-section-2 footer-color-2"
                style={{ marginTop: 200 }}
            >
                <div class="container-fluid-lg">
                    <div class="main-footer">
                        <div
                            class="row g-md-4 gy-sm-5 "
                            style={{ paddingTop: 40 }}
                        >
                            <div class="col-xxl-3 col-xl-4 col-sm-6">
                                <a href="/" class="foot-logo theme-logo">
                                    <img
                                        src="/assets/images/logo/4.png"
                                        class="img-fluid blur-up lazyload"
                                        alt=""
                                    />
                                </a>
                                <p class="information-text information-text-2">
                                    it is a long established fact that a reader
                                    will be distracted by the readable content.
                                </p>
                            </div>

                            <div class="col-xxl-2 col-xl-4 col-sm-6">
                                <div class="footer-title">
                                    <h4 class="text-white">About Fastkart</h4>
                                </div>
                                <ul class="footer-list footer-contact footer-list-light">
                                    <li>
                                        <a
                                            href="about-us.html"
                                            class="light-text"
                                        >
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="contact-us.html"
                                            class="light-text"
                                        >
                                            Contact Us
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="term_condition.html"
                                            class="light-text"
                                        >
                                            Terms & Coditions
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xxl-2 col-xl-4 col-sm-6">
                                <div class="footer-title">
                                    <h4 class="text-white">Useful Link</h4>
                                </div>
                                <ul class="footer-list footer-list-light footer-contact">
                                    <li>
                                        <a
                                            href="order-success.html"
                                            class="light-text"
                                        >
                                            Your Order
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="user-dashboard.html"
                                            class="light-text"
                                        >
                                            Your Account
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="order-tracking.html"
                                            class="light-text"
                                        >
                                            Track Orders
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xxl-2 col-xl-4 col-sm-6">
                                <div class="footer-title">
                                    <h4 class="text-white">Categories</h4>
                                </div>
                                <ul class="footer-list footer-list-light footer-contact">
                                    <li>
                                        <a
                                            href="vegetables-demo.html"
                                            class="light-text"
                                        >
                                            Fresh Vegetables
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-xxl-3 col-xl-4 col-sm-6">
                                <div class="footer-title">
                                    <h4 class="text-white">Store infomation</h4>
                                </div>
                                <ul class="footer-address footer-contact">
                                    <li>
                                        <a
                                            href="javascript:void(0)"
                                            class="light-text"
                                        >
                                            <div class="inform-box flex-start-box">
                                                <i data-feather="map-pin"></i>
                                                <p>
                                                    Fastkart Demo Store, Demo
                                                    store india 345 - 659
                                                </p>
                                            </div>
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="javascript:void(0)"
                                            class="light-text"
                                        >
                                            <div class="inform-box">
                                                <i data-feather="phone"></i>
                                                <p>Call us: 123-456-7890</p>
                                            </div>
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="javascript:void(0)"
                                            class="light-text"
                                        >
                                            <div class="inform-box">
                                                <i data-feather="mail"></i>
                                                <p>
                                                    Email Us:
                                                    Support@Fastkart.com
                                                </p>
                                            </div>
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="javascript:void(0)"
                                            class="light-text"
                                        >
                                            <div class="inform-box">
                                                <i data-feather="printer"></i>
                                                <p>Fax: 123456</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="sub-footer sub-footer-lite section-b-space section-t-space">
                        <div class="left-footer">
                            <p class="light-text">2023 Copyright</p>
                        </div>

                        <ul class="payment-box">
                            <li>
                                <img
                                    src="/assets/images/icon/paymant/visa.png"
                                    class="blur-up lazyload"
                                    alt=""
                                />
                            </li>
                            <li>
                                <img
                                    src="/assets/images/icon/paymant/discover.png"
                                    alt=""
                                    class="blur-up lazyload"
                                />
                            </li>
                            <li>
                                <img
                                    src="/assets/images/icon/paymant/american.png"
                                    alt=""
                                    class="blur-up lazyload"
                                />
                            </li>
                            <li>
                                <img
                                    src="/assets/images/icon/paymant/master-card.png"
                                    alt=""
                                    class="blur-up lazyload"
                                />
                            </li>
                            <li>
                                <img
                                    src="/assets/images/icon/paymant/giro-pay.png"
                                    alt=""
                                    class="blur-up lazyload"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;

if (document.getElementById("footer")) {
    ReactDOM.render(<Footer />, document.getElementById("footer"));
}
