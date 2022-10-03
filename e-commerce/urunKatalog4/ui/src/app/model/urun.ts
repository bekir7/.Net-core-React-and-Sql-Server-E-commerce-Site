export interface Urun{
    urunId: number,
    urunName: string,
    urunDescription: string,
    urunColor: string,
    urunMarka: string,
    urunDurum: string,
    urunImageUrl: string,
    urunFiyat: number,
   isOfferable?: true,
    isApproved?: true,
    stok?: number,
    type?: string

}

export interface UrunParams{
    orderBy:string;
    searchTerm?:string;
    type:string[];
    marka:string[];
    pageNumber:number;
    pageSize:number;
    
}