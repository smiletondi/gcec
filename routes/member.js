const router = require('express').Router();
const memberController = require('../Controller/member');

router.get('/addMember', memberController.getAddMember);
router.post('/addMember', memberController.postAddMember);

router.post('/deleteMember', memberController.postdeleteMember)

module.exports = router;