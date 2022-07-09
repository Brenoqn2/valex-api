import * as cardRepository from "../repositories/cardRepository.js";
import * as businessRepository from "../repositories/businessRepository.js";
import * as cardUtils from "../utils/cardUtils.js";
import * as paymentUtils from "../utils/paymentUtils.js";
import * as paymentRepository from "../repositories/paymentRepository.js";

async function buy(
  cardId: number,
  password: string,
  businessId: number,
  amount: number
) {
  const card = await cardRepository.findById(cardId);

  if (!card) {
    throw { type: "error_not_found", message: "Card not found" };
  }

  if (card.password === null) {
    throw { type: "error_forbidden", message: "Card not activated" };
  }

  if (!cardUtils.checkExpirationDate(card.expirationDate)) {
    throw { type: "error_expired", message: "Card expired" };
  }

  if (card.isBlocked) {
    throw { type: "error_forbidden", message: "Card blocked" };
  }

  if (!cardUtils.checkPasswordMatch(card.password, [password])) {
    throw { type: "error_unauthorized", message: "Password is invalid" };
  }

  const business = await businessRepository.findById(businessId);
  if (!business) {
    throw { type: "error_not_found", message: "Business not found" };
  }

  if (business.type !== card.type) {
    throw {
      type: "error_forbidden",
      message: "Business type is different from card type",
    };
  }

  const cardBalance = await paymentUtils.getCardBalance(cardId);
  if (cardBalance < amount) {
    throw { type: "error_forbidden", message: "Insufficient funds" };
  }

  await paymentRepository.insert({ cardId, businessId, amount });
}

export { buy };
