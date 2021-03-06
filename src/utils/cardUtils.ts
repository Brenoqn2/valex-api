import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();
const cryptr = new Cryptr(process.env.CRYPTR_KEY);
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat);
import bcrypt from "bcrypt";

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

function checkExpirationDate(date: string) {
  const expirationDate = dayjs(date, "MM/YY");
  const now = dayjs();
  return expirationDate.isAfter(now);
}

function checkCVC(encryptedCVC: string, cvc: string) {
  return cryptr.decrypt(encryptedCVC) === cvc;
}

function checkPasswordMatch(
  encryptedPassword: string,
  passwords: Array<string>
): boolean {
  const match = (password: string) =>
    bcrypt.compareSync(password, encryptedPassword);
  return passwords.some(match);
}

function decrypt(encrypted: string) {
  const decrypted = cryptr.decrypt(encrypted);
  return decrypted;
}

export {
  generateCard,
  checkExpirationDate,
  checkCVC,
  checkPasswordMatch,
  decrypt,
};
