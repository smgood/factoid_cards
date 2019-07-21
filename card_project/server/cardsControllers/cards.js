const AWS = require("aws-sdk");
const uuidv1 = require('uuid/v1');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

let docClient = new AWS.DynamoDB.DocumentClient();
let table = "Cards";

class CardsController {
  getAllCards(req, res) {
    let params = {
        TableName : table,
    };

    docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            return res.status(400).send({
              success: 'false',
              message: 'Unable to query cards',
            });
        } else {
            console.log("Query succeeded.");
            return res.status(200).send({
              success: 'true',
              message: 'Cards retrieved successfully',
              cards: data.Items,
            });
        }
    });
  }

  getCard(req, res) {
    let params = {
        TableName: table,
        Key:{ "id": req.params.id }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            return res.status(404).send({
              success: 'false',
              message: 'Card not found',
            });
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            return res.status(200).send({
              success: 'true',
              message: 'Card retrieved successfully',
              card: data.Item,
            });
        }
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

    let params = {
        TableName: table,
        Item: {
          "id": uuidv1(),
          "date": Date.now(),
          "description": req.body.description,
          "factoid": req.body.factoid,
        }
    };

    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            return res.status(400).send({
              success: 'false',
              message: 'Unable to create card',
            });
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            return res.status(201).send({
              success: 'true',
              message: 'Card added successfully',
            });
        }
    });
  }

  updateCard(req, res) {
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

    let params = {
        TableName:table,
        Key:{ "id": req.params.id },
        UpdateExpression: "set description = :d, factoid=:f",
        ExpressionAttributeValues:{
            ":d":req.body.description,
            ":f":req.body.factoid
        },
        ReturnValues:"ALL_NEW"
    };

    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            return res.status(404).send({
              success: 'false',
              message: 'Card not found',
            });
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            return res.status(201).send({
              success: 'true',
              message: 'Card updated successfully',
              card: data.Attributes,
            });
        }
    });
  }

  deleteCard(req, res) {
    let params = {
        TableName:table,
        Key:{ "id": req.params.id },
    };

    console.log("Attempting a conditional delete...");
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            return res.status(404).send({
              success: 'false',
              message: 'Card not found',
            });
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            return res.status(200).send({
              success: 'true',
              message: 'Card deleted successfuly',
            });
        }
    });
  }
}

const cardController = new CardsController();
export default cardController;
