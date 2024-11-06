export function formatCurrency(amount: number) {
  if (typeof amount !== "number") {
    amount = parseInt(amount, 10);
  }
  return "Rp. " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
