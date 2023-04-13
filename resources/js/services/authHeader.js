import settings from "./settings";

export function Header() {
    return {
        "Content-Type": "application/json",
        "X-Client-Version": settings.VERSION,
        "X-Client-Type": "web",
    };
}
