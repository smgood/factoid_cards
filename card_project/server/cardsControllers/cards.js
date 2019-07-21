/* eslint-disable class-methods-use-this */
import db from '../db/db';

class CardsController {
  getAllCards(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'Cards retrieved successfully',
      cards: db,
    });
  }

  getCard(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map((card) => {
      if (card.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'Card retrieved successfully',
          card,
        });
      }
    });
    return res.status(404).send({
      success: 'false',
      message: 'Card does not exist',
    });
  }

  createCard(req, res) {
    if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    } else if (!req.body.factoid) {
      return res.status(400).send({
        success: 'false',
        message: 'factoid is required',
      });
    }
    const card = {
      id: db.length + 1,
      description: req.body.description,
      factoid: req.body.factoid,
    };
    db.push(card);
    return res.status(201).send({
      success: 'true',
      message: 'Card added successfully',
      card,
    });
  }

  updateCard(req, res) {
    const id = parseInt(req.params.id, 10);
    let cardFound;
    let itemIndex;
    db.map((card, index) => {
      if (card.id === id) {
        cardFound = card;
        itemIndex = index;
      }
    });

    if (!cardFound) {
      return res.status(404).send({
        success: 'false',
        message: 'Card not found',
      });
    }

    if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
      });
    } else if (!req.body.factoid) {
      return res.status(400).send({
        success: 'false',
        message: 'factoid is required',
      });
    }

    const newCard = {
      id: cardFound.id,
      description: req.body.description || cardFound.description,
      factoid: req.body.factoid || cardFound.factoid,
    };

    db.splice(itemIndex, 1, newCard);

    return res.status(201).send({
      success: 'true',
      message: 'Card added successfully',
      newCard,
    });
  }

  deleteCard(req, res) {
    const id = parseInt(req.params.id, 10);
    let cardFound;
    let itemIndex;
    db.map((card, index) => {
      if (card.id === id) {
        cardFound = card;
        itemIndex = index;
      }
    });

    if (!cardFound) {
      return res.status(404).send({
        success: 'false',
        message: 'Card not found',
      });
    }
    db.splice(itemIndex, 1);

    return res.status(200).send({
      success: 'true',
      message: 'Card deleted successfuly',
    });
  }
}

const cardController = new CardsController();
export default cardController;
