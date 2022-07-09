import * as companyRepository from "../repositories/companyRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardUtils from "../utils/cardUtils.js";
import bcrypt from "bcrypt";

async function createCard(
  apiKey: any,
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
  const company = await companyRepository.findByApiKey(apiKey);
  if (!company) {
    throw { type: "error_not_found", message: "Company not found" };
  }

  const cardAlreadyExists = await cardRepository.findByTypeAndEmployeeId(
    type,
    employeeId
  );
  if (cardAlreadyExists) {
    throw { type: "error_conflict", message: "Card already exists" };
  }

  const employee = await employeeRepository.findById(employeeId);
  if (!employee) {
    throw { type: "error_not_found", message: "Employee not found" };
  }

  const cardData = cardUtils.generateCard(type, employee);
  await cardRepository.insert(cardData);
}

async function activateCard(cardId: number, cvc: string, password: string) {
  const card = await cardRepository.findById(cardId);
  if (!card) {
    throw { type: "error_not_found", message: "Card not found" };
  }

  if (!cardUtils.checkExpirationDate(card.expirationDate)) {
    throw { type: "error_expired", message: "Card expired" };
  }

  if (card.password !== null) {
    throw { type: "error_conflict", message: "Card already activated" };
  }

  if (!cardUtils.checkCVC(card.securityCode, cvc)) {
    throw { type: "error_unauthorized", message: "CVC is invalid" };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  await cardRepository.update(cardId, {
    password: hashedPassword,
    isBlocked: false,
  });
}

async function listCards(employeeId: number, passwords: Array<string>) {
  const cards = await cardRepository.findActiveCardsByEmployeeId(employeeId);
  if (!cards) {
    throw {
      type: "error_not_found",
      message: "This employee does not exist or does not have availabe cards",
    };
  }
  const matchedCards = cards.filter((card) => {
    if (cardUtils.checkPasswordMatch(card.password, passwords)) {
      return true;
    }
  });

  const result = matchedCards.map((card) => {
    return {
      number: card.number,
      cardholderName: card.cardholderName,
      expirationDate: card.expirationDate,
      securityCode: cardUtils.decrypt(card.securityCode),
    };
  });

  return result;
}

async function blockCard(cardId: number, password: string) {
  const card = await cardRepository.findById(cardId);
  if (!card) {
    throw { type: "error_not_found", message: "Card not found" };
  }

  if (card.isBlocked) {
    throw {
      type: "error_conflict",
      message: "Card already blocked or not activated",
    };
  }

  if (!cardUtils.checkExpirationDate(card.expirationDate)) {
    throw { type: "error_expired", message: "Card expired" };
  }

  if (!cardUtils.checkPasswordMatch(card.password, [password])) {
    throw { type: "error_unauthorized", message: "Password is invalid" };
  }

  await cardRepository.update(cardId, {
    isBlocked: true,
  });
}

export { createCard, activateCard, listCards, blockCard };
