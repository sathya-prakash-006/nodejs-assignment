const Summary = require("../models/user-summary-model");
const User = require("../models/user.model");

// Create user account
exports.createSummary = async (req, res) => {
  const income = req.body.income;
  const spends = req.body.spends;
  const accountNum = 6723 + Math.floor(Math.random() * 100000);
  const userId = req.body.userId;

  const existSummary = await Summary.findOne({
    where: {
      userId: userId,
    },
  });

  if (existSummary) {
    return res.status(400).json("User Summary already exist");
  }

  try {
    const data = await Summary.create({
      accountNumber: accountNum,
      income: income,
      spends: spends,
      userId: userId,
    });

    res.status(201).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get account details by ID
exports.getSummaryById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await Summary.findOne({
      where: {
        userId: userId,
      },
    });
    const profile = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!profile) {
      return res.status(404).json("User does't exist");
    }

    return res.status(201).json({ user: profile, summary: user });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};
