import settings from "./settings";
import { Header } from "./authHeader";
import { responseService } from "./responseService";

export function getCategories() {
    const requestOptions = {
        method: "GET",
        headers: Header(),
    };
    return fetch(`${settings.API_URL}categories`, requestOptions).then(
        responseService.handleResponse
    );
}

export function getProducts(data) {
    const requestOptions = {
        method: "POST",
        headers: Header(),
        body: JSON.stringify(data),
    };
    return fetch(`${settings.API_URL}products`, requestOptions).then(
        responseService.handleResponse
    );
}

export function getProduct(id) {
    const requestOptions = {
        method: "GET",
        headers: Header(),
    };
    return fetch(`${settings.API_URL}product/${id}`, requestOptions).then(
        responseService.handleResponse
    );
}

export function getCategoryProducts(data) {
    const requestOptions = {
        method: "POST",
        headers: Header(),
        body: JSON.stringify(data),
    };
    return fetch(`${settings.API_URL}categoryproducts`, requestOptions).then(
        responseService.handleResponse
    );
}
export function getCategory(data) {
    const requestOptions = {
        method: "POST",
        headers: Header(),
        body: JSON.stringify(data),
    };
    return fetch(`${settings.API_URL}category`, requestOptions).then(
        responseService.handleResponse
    );
}

export function getService(data) {
    const requestOptions = {
        method: "POST",
        headers: Header(),
        body: JSON.stringify(data),
    };
    return fetch(`${settings.API_URL}service`, requestOptions).then(
        responseService.handleResponse
    );
}

export function getServiceProducts(data) {
    const requestOptions = {
        method: "POST",
        headers: Header(),
        body: JSON.stringify(data),
    };
    return fetch(`${settings.API_URL}serviceproducts`, requestOptions).then(
        responseService.handleResponse
    );
}

export function getAllCategories(data) {
    const requestOptions = {
        method: "POST",
        headers: Header(),
        body: JSON.stringify(data),
    };
    return fetch(`${settings.API_URL}allcategories`, requestOptions).then(
        responseService.handleResponse
    );
}

export function getAllServices(data) {
    const requestOptions = {
        method: "POST",
        headers: Header(),
        body: JSON.stringify(data),
    };
    return fetch(`${settings.API_URL}allservices`, requestOptions).then(
        responseService.handleResponse
    );
}

export function getSearches(data) {
    const requestOptions = {
        method: "POST",
        headers: Header(),
        body: JSON.stringify(data),
    };
    return fetch(`${settings.API_URL}searches`, requestOptions).then(
        responseService.handleResponse
    );
}

export function getVendors(data) {
    const requestOptions = {
        method: "POST",
        headers: Header(),
        body: JSON.stringify(data),
    };
    return fetch(`${settings.API_URL}vendors`, requestOptions).then(
        responseService.handleResponse
    );
}

export function getShops() {
    const requestOptions = {
        method: "GET",
        headers: Header(),
    };
    return fetch(`${settings.API_URL}shops`, requestOptions).then(
        responseService.handleResponse
    );
}
export function addOrder({
    name,
    phone,
    address,
    longitude,
    latitude,
    vendor,
    carts,
    total_price,
    email,
}) {
    const requestOptions = {
        method: "POST",
        headers: Header(),
        body: JSON.stringify({
            name,
            phone,
            address,
            longitude,
            latitude,
            vendor,
            carts,
            total_price,
            email,
        }),
    };
    return fetch(`${settings.API_URL}addorder`, requestOptions).then(
        responseService.handleResponse
    );
}
