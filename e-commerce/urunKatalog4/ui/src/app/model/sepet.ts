export interface SepetItem {
    urunId: number;
    urunName: string;
    urunMarka: string;
    urunImageUrl: string;
    urunFiyat: number;
    quantity: number;
    type: string;
}

export interface Sepet {
    id: number;
    aliciId: string;
    items: SepetItem[];
}