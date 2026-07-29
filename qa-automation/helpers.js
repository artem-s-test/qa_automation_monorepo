export function generateRandomEmail(prefix) {
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}_${random}@test.com`;
}
export function calculateDiscountedPrice(price, discountPercent) {
       const discount = price * (discountPercent / 100);
       return price - discount;
    }