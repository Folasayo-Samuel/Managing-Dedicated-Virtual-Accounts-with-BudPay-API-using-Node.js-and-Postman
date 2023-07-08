const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(express.json());

const secretKey = process.env.BUDPAY_SECRET_KEY;

const api = axios.create({
  baseURL: "https://api.budpay.com/api/v2/",
  headers: {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
  },
});

app.post("/dedicated_virtual_accounts", async (req, res) => {
  const { customer, first_name, last_name, phone } = req.body;
  try {
    const response = await api.post("/dedicated_virtual_account", {
      customer,
      first_name,
      last_name,
      phone,
    });

    const virtualAccount = response.data;
    res.json({ message: "Dedicated Virtual Account created", virtualAccount });
  } catch (error) {
    res.status(500).json({
      error: "Error creating Dedicated Virtual Account",
      message: error.message,
    });
  }
});

app.get("/list_dedicated_accounts", async (req, res) => {
  try {
    const response = await api.get("/list_dedicated_accounts");

    const dedicatedAccounts = response.data.data;
    res.json({
      message: "Dedicated Virtual Accounts retrieved",
      dedicatedAccounts,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving Dedicated Virtual Accounts",
      message: error.message,
    });
  }
});

app.get("/dedicated_account/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await api.get(`/dedicated_account/${id}`);

    const dedicatedAccount = response.data.data;
    res.json({
      message: "Dedicated Virtual Account retrieved",
      dedicatedAccount,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving Dedicated Virtual Account",
      message: error.message,
    });
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
