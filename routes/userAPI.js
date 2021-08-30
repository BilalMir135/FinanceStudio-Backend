const express = require('express');
const fs = require('fs');

const User = require('../models/User');
const upload = require('../helpers/uploadFiles');
const { handleError, handleSuccess } = require('../helpers/handlers');
const router = express.Router();

// @route  POST /api/createUser
// @desc   Register User
router.post('/api/createUser', (req, res) => {
  try {
    const { name, email } = req.body;
    if (name && email) {
      User.findOne({ email }, (err, doc) => {
        if (doc) {
          return res.json(handleError('User already exists'));
        }
        User.create(req.body, (err, doc) => {
          if (err) return res.json(handleError(err));
          else {
            return res.json(handleSuccess(doc));
          }
        });
      });
    } else {
      return res.json(handleError('User details cannot be null'));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(handleError('Server Error'));
    process.exit(1);
  }
});

// @route  PUT /api/uploadUserImage
// @desc   Add User Profile Pic
router.put('/api/uploadUserImage', upload.single('fileData'), (req, res) => {
  try {
    fs.readFile(req.file.path, (err, contents) => {
      if (err) {
        return res.json(handleErr(err));
      } else {
        User.findByIdAndUpdate(
          req.body.id,
          { image: req.file.filename },
          { new: true },
          (err, doc) => {
            if (err) return res.json(handleError(err));
            else {
              return res.json(handleSuccess(doc));
            }
          }
        );
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(handleError('Server Error'));
    process.exit(1);
  }
});

// @route  GET /api/getUserid
// @desc   Get user details by id
router.get('/api/getUser:id', (req, res) => {
  try {
    User.findOne({ firebaseUid: req.params.id }, (err, doc) => {
      if (err) return res.json(handleErr(err));
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

// @route  GET /api/getAllUsers
// @desc   Get all users
router.get('/api/getAllUsers', (req, res) => {
  try {
    User.find({}, (err, doc) => {
      if (err) return res.json(handleErr(err));
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

// @route  PUT /api/deleteUser
// @desc   Delete User
router.delete('/api/deleteUser', (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      User.findByIdAndDelete(id, (err, doc) => {
        if (err) return res.json(handleErr(err));
        else {
          return res.json(handleSuccess(doc));
        }
      });
    } else {
      return res.json(handleErr('User cannot be null'));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(handleError('Server Error'));
    process.exit(1);
  }
});

module.exports = router;
