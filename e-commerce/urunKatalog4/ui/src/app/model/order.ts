export interface ShippingAdres {
    aliciName: string;
    adres1: string;
    adres2: string;
    il: string;
    ilce: string;
    ulke: string;
}

export interface OrderItem {
    urunId: number;
    urunName: string;
    urunImageUrl: string;
    urunFiyat: number;
    quantity: number;
}

export interface Order {
    id: number;
    aliciId: string;
    shippingAdres: ShippingAdres;
    orderDate: string;
    orderItems: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    orderStatus: string;
    paymentIntentId: string;
    total: number;
}
