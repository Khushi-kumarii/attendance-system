const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const { checkIn, checkOut } = require('../controllers/attendance.controller');

router.post('/checkin', auth, checkIn);
router.post('/checkout', auth, checkOut);

module.exports = router;
