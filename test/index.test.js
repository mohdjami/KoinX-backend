import request from "supertest";
import app from "../app.js";

describe("Sanity test", () => {
  test("1 should equal 1", () => {
    expect(1).toBe(1);
  });
});

//Task 1
describe("Fetching Transactions", () => {
  test("Task 1: Should create the transactions in Database and return an Object with status", async () => {
    const res = await request(app).get(
      "/api/transactions/0xce94e5621a5f7068253c42558c147480f38b5e0d"
    );
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      status: "success",
    });
  });
});

//Task 2 was to update the Ethereum Price after every 10 minutes which is done by using cron jobs and Redis.
// Build a system within the same server to fetch the price of Ethereum every 10 minutes and store it in the database. For scalability if instances of the server are increased then the job will be done as usual by first instance and will be locked to update for other instances. Using Lock mechanism

//Task 3
describe("Expenses and Price Endpoint", () => {
  test("Task 3: Should return an Object with total Expense", async () => {
    const res = await request(app).get(
      "/api/expenses/?address=0xce94e5621a5f7068253c42558c147480f38b5e0d"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      totalExpense: 0.008045434001388,
      price: "205451",
    });
  });
});
