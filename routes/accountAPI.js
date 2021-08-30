const express = require('express');

const Account = require('../models/Account');
const { handleError, handleSuccess } = require('../helpers/handlers');
const router = express.Router();

// @route  POST /api/createAccount
// @desc   Create Account
router.post('/api/createAccount', (req, res) => {
  try {
    const data = req.body;
    Account.create(data, (err, doc) => {
      if (err) return res.json(handleError(err));
      else {
        return res.json(handleSuccess(doc));
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(handleError('Server Error'));
    process.exit(1);
  }
});

// @route  PUT /api/updateProject
// @desc   Update Project
router.put('/api/updateAccount', (req, res) => {
  try {
    const { _id: id } = req.body;
    if (id) {
      Account.findByIdAndUpdate(id, req.body, { new: true }).exec((err, doc) => {
        if (err) return res.json(handleError(err));
        else {
          return res.json(handleSuccess(doc));
        }
      });
    } else {
      return res.json(handleError('Account cannot be null'));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(handleError('Server Error'));
    process.exit(1);
  }
});

// @route  GET /api/getAccount
// @desc   Get account by userId
router.get('/api/getAccounts:userId', (req, res) => {
  try {
    Account.find({ user: req.params.userId }, (err, doc) => {
      if (err) return res.json(handleError(err));
      else {
        return res.json(handleSuccess(doc));
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(handleError('Server Error'));
    process.exit(1);
  }
});

// @route  PUT /api/deleteAccount
// @desc   Delete Account
router.delete('/api/deleteAccount:id', (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      Account.findByIdAndDelete(id, (err, doc) => {
        if (err) return res.json(handleErr(err));
        else {
          return res.json(handleSuccess(doc));
        }
      });
    } else {
      return res.json(handleErr('Account cannot be null'));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(handleError('Server Error'));
    process.exit(1);
  }
});

module.exports = router;
