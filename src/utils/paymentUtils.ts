import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

function getBalance(array: rechargeRepository.Recharge[]) {
  return array.reduce((previous, current) => previous + current.amount, 0);
}

async function getCardBalance(cardId: number) {
  const payments = await paymentRepository.findByCardId(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);
  const paymentsBalance = getBalance(payments);
  const rechargesBalance = getBalance(recharges);
  return rechargesBalance - paymentsBalance;
}

export { getCardBalance };
