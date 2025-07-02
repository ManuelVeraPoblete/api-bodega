const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accounts.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, accountController.createAccount);
router.get('/', auth, accountController.getAccounts);
router.get('/:id', auth, accountController.getAccountById);
router.put('/:id', auth, accountController.updateAccount);
router.delete('/:id', auth, accountController.softDeleteAccount);

module.exports = router;
