export interface OrderData {
    brandName: string;
    modelName: string;
    manufactureYear: number;
    condition: string;
    imageUrl: string;
    salePriceCents: number;
    commissionRateBips: number;
    sellerFeeCents: number;
    payoutAmountCents: number;
    insuredShipping?: number;
    authentication?: number;
}