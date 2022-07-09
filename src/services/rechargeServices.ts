import * as cardRepository from "../repositories/cardRepository.js";
import * as cardUtils from "../utils/cardUtils.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import e from "express";

async function rechargeCard(cardId: number, amount: number, apiKey: string) {
  const card = await cardRepository.findById(cardId);

  if (!card) {
    throw { type: "error_not_found", message: "Card not found" };
  }

  const employee = await employeeRepository.findById(card.employeeId);
  const company = await companyRepository.findByApiKey(apiKey);

  if (employee.companyId !== company.id) {
    throw { type: "error_unauthorized", message: "Unauthorized" };
  }

  if (card.password === null) {
    throw { type: "error_forbidden", message: "Card not activated" };
  }

  if (!cardUtils.checkExpirationDate(card.expirationDate)) {
    throw { type: "error_expired", message: "Card expired" };
  }

  await rechargeRepository.insert({ cardId, amount });
}

export { rechargeCard };
