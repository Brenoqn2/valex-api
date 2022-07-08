import * as companyRepository from "../repositories/companyRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardUtils from "../utils/cardUtils.js";

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

export { createCard };