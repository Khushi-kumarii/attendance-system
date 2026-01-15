const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const { download } = require('../controllers/report.controller');

router.get('/download', auth, role('admin'), download);

module.exports = router;
