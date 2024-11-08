import {format} from "date-fns"
import {id} from "date-fns/locale"

export function formatCurrency(amount: number) {
  if (typeof amount !== "number") {
    amount = parseInt(amount, 10);
  }
  return "Rp. " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


export const formatDate = (date: Date) => format(date, "eeee, dd MMMM yyyy HH:mm", { locale: id });