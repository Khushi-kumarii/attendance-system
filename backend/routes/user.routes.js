const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const {
  addUser,
  getUsers,
  updateUser,
  toggleStatus,
  softDelete,
  getMyProfile
} = require('../controllers/user.controller');


router.use(auth, role('admin'));
router.get('/me', auth, getMyProfile);
router.post('/', addUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.patch('/:id/status', toggleStatus);
router.delete('/:id', softDelete);

module.exports = router;
