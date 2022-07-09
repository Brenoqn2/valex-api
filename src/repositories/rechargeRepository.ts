import { connection } from "../database.js";

export interface Recharge {
  id: number;
  cardId: number;
  timestamp: Date;
  amount: number;
}
export type RechargeInsertData = Omit<Recharge, "id" | "timestamp">;

export async function findByCardId(cardId: number) {
  const result = await connection.query<Recharge, [number]>(
    `SELECT recharges.id, recharges."cardId", to_char(recharges.timestamp::timestamp::date, 'DD/MM/YYYY') as timestamp, recharges.amount 
    FROM recharges WHERE "cardId"=$1`,
    [cardId]
  );

  return result.rows;
}

export async function insert(rechargeData: RechargeInsertData) {
  const { cardId, amount } = rechargeData;

  connection.query<any, [number, number]>(
    `INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)`,
    [cardId, amount]
  );
}
