export function generateRandomEmail(prefix: string):string {
  const random: number = Math.floor(Math.random() * 10000);
  return `${prefix}_${random}@test.com`;
}
export function calculateDiscountedPrice(price: number, discountPercent: number): number {
       const discount: number = price * (discountPercent / 100);
       return price - discount;
    }