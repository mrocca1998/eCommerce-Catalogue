var express = require('express');
var router = express.Router();
let landing = require('../controllers/landing')

/* GET home page. */
router.get('/', landing.get_landing);
router.post('/', landing.submit_Albanian)
router.get('/Albanians', landing.show_Albanians)
router.get('/Albanian/:Albanian_id', landing.show_Albanian)
router.get('/Albanian/:Albanian_id/edit', landing.show_edit_Albanian);
router.post('/Albanian/:Albanian_id/edit', landing.edit_Albanian);
router.post('/Albanian/:Albanian_id/delete', landing.delete_Albanian);
router.post('/Albanian/:Albanian_id/delete-json', landing.delete_Albanian_json);
module.exports = router;
