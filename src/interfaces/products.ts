export interface Iproduct {
    "createdAt": string,
    "title": string,
    "company_title": string,
    "image": string,
    "image_gallery": string[],
    "price": number,
    "discount_percent": number,
    "details": {
        "title": string,
        "content": string
    }[],
    "in_stock": number,
    "id": string
}