const expensesModel = require('../models/expenses.model');

function getAllExpenses(req, res) {
  try {
    const expenses = expensesModel.getAllExpenses();

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати витрати' });
  }
}

function getExpense(req, res) {
  try {
    const expId = +req.params.expId;
    const expense = expensesModel.getExpense(expId);

    if (!expId) {
      return res.status(404).json({ message: `Витрату ${expId} не знайдено` });
    }

    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати витрату' });
  }
}

function createExpense(req, res) {
  try {
    const body = req.body;

    if (!body) {
      return res.status(404).json({ message: 'Не передано тіло запиту' });
    }

    const newExpance = expensesModel.createExpense(body);

    if (!newExpance) {
      return res.status(500).json({ message: 'Нову витрату не створено' });
    }

    res.status(200).json(newExpance);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося створити витрату' });
  }
}

function removeExpense(req, res) {
  try {
    const expId = +req.params.expId;
    const removedExpence = expensesModel.removeExpense(expId);

    if (!removedExpence) {
      return res.status(404).json({ message: `Витрату ${expId} не знайдено` });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося видалити витрату' });
  }
}

function updateExpanse(req, res) {
  try {
    const body = req.body;
    const expId = +req.params.expId;

    if (!body) {
      return res.status(400).json({ error: 'Body is required' });
    } else if (!expId) {
      return res
        .status(400)
        .json({ error: 'Expense id is required in request body' });
    }

    const updatedExpanse = expensesModel.editExpense(expId, body);

    res.status(200).json(updatedExpanse);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося оновити користувача' });
  }
}

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  removeExpense,
  updateExpanse,
};
