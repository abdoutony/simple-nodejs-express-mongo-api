const express = require("express");
const router = express.Router();

//delaring our controller
const crmController = require("../controllers/crmController");

// create a new instance of the controller
const CrmController = new crmController();
const auth = require("../../middleware/auth");

module.exports = (params) => {
  // route for adding a new contact

  router.post("/contact", async (req, res) => {
    try {
      let body = req.body;
      let contacts = await CrmController.addContact(body);
      res.status(200).json({ data: contacts });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/contact", auth, async (req, res) => {
    //route for getting all the contacts
    try {
      let contacts = await CrmController.getContacts();
      res.status(200).json({ data: contacts });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/contact/:contactId", async (req, res) => {
    //route for getting a contact by id
    try {
      let contact = await CrmController.getContactById(req.params.contactId);
      res.status(200).json({ data: contact });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put("/contact/:contactId", async (req, res) => {
    //route for updating a contact by id
    try {
      let contact = await CrmController.updateContactById(
        req.params.contactId,
        req.body
      );
      res.status(200).json({ data: contact });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete("/contact/:contactId", async (req, res) => {
    // a route for deleting a contact by id
    try {
      let contact = await CrmController.deleteContactById(req.params.contactId);
      res.status(200).json({ message: "a contact has been deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
