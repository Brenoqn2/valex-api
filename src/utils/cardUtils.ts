import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();
const cryptr = new Cryptr(process.env.CRYPTR_KEY);

function generateName(name: string) {
  let splittedName = name.split(" ");
  splittedName = splittedName.filter((name) => name.length >= 3);
  splittedName = splittedName.map((name, index) => {
    if (index === 0 || index === splittedName.length - 1) {
      return name.toUpperCase();
    } else {
      return name.charAt(0).toUpperCase();
    }
  });
  return splittedName.join(" ");
}

function generateExpirationDate() {
  const expirationDate = dayjs().add(5, "year");
  return expirationDate.format("MM/YY");
}

function generateCVC() {
  const cvc = faker.random.numeric(3);
  return cryptr.encrypt(cvc);
}

function generateCard(
  type: cardRepository.TransactionTypes,
  employee: employeeRepository.Employee
) {
  const cardData: cardRepository.CardInsertData = {
    employeeId: employee.id,
    number: faker.random.numeric(16),
    cardholderName: generateName(employee.fullName),
    securityCode: generateCVC(),
    expirationDate: generateExpirationDate(),
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: true,
    type: type,
  };

  return cardData;
}

export { generateCard };
