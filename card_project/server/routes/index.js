import express from 'express';
import CardController from '../cardsControllers/cards';

const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

router.get('/api/v1/cards', CardController.getAllCards);
router.get('/api/v1/cards/:id', CardController.getCard);
router.post('/api/v1/cards', CardController.createCard);
router.put('/api/v1/cards/:id', CardController.updateCard);
router.delete('/api/v1/cards/:id', CardController.deleteCard);

export default router;
