var express = require('express');
var router = express.Router();
let landing = require('../controllers/landing')

/* GET home page. */
router.get('/', landing.get_landing);
router.post('/Query', landing.submit_Query)
router.get('/Queries', landing.get_Queries)
router.post('/Query/:id/edit', landing.edit_Query);
router.post('/Query/:id/delete', landing.delete_Query);
router.post('/Queries/delete', landing.delete_Queries);

module.exports = router;
