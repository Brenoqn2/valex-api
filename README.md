<p align="center">
  <a href="https://github.com/brenoqn2/valex-api">
    <img src="./readme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    valex-api
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/Brenoqn2/valex-api.git

$ cd valex-api

$ npm install

$ npm run dev
```

API:

```
- POST /card/create
    - Route to create a new card
    - headers: {
        "x_api_key":"api-key"
    }
    - body: {
        "type": <"groceries", "restaurants", "transport", "education", "health">,
        "employeeId":"1"
    }

- POST /card/activate
    - Route to activate a card
    - headers: {}
    - body: {
        "cardId":"1",
        "cvc":"123",
        "password":"1234"
    }

-POST /card/list
    - Route to get a list of all cards from a single employee
    - headers{}
    - body: {
        "employeeId":"1",
        "passwords":["1234","5678",...]
    }


-POST /card/block
    - Route to block a card
    - headers{}
    - body: {
        "cardId":"1",
        "password":"1234"
    }


-POST /card/unblock
    - Route to unblock a card
    - headers{}
    - body: {
        "cardId":"1",
        "password":"1234"
    }


-POST /recharge
    - Route to recharge an employee card
    - headers{
        "x_api_key":"api-key"
    }
    - body: {
        "cardId":"1",
        "amount":"5000"
    }

-POST /payment
    - Route to proccess a payment
    - headers{}
    - body: {
        "cardId":"1",
        "password":"1234",
        "businessId":"1",
        "amount":"30"
    }

- GET /card/transactions/:cardId
    - Route to get all transactions from a card
    - headers: {}
    - body: {}
```
