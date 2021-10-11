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
/****************************************************************************** */

//  Update summary by Id
exports.summaryUpdate = (req, res) => {
  const id = +req.params.id;
  //console.log(id);

  Summary.findByPk(id)
    .then((summary) => {
      //console.log(user);
      summary.income = req.body.income;
      summary.spends = req.body.spends;

      return summary.save();
    })
    .then((result) => {
      res.status(201).json("Updated Summary Successfully");
    })
    .catch((err) => {
      return res.status(400).json({ message: err.message });
    });
};

/****************************************************************************** */

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

/***************************************************************** */

// Get All Summary for admins

exports.getAllSummary = async (req, res) => {
  try {
    const user = await Summary.findAndCountAll();

    return res.status(200).json({ summary: user });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};
