class crmController {
  /**
   * Constructor
   * @param  mongoose
   * @param Contact
   */
  constructor() {
    // setting up mongoose and model to be used in the functions
    const mongoose = require("mongoose");
    const Contact = require("../models/crmModel")(mongoose);
    this.mongoose = mongoose;
    this.Contact = Contact;
  }

  //this function recive the body of the request then create a new record using the model
  async addContact(body) {
    let newContact = this.Contact(body);
    newContact.save();
    let contacts = await this.Contact.find();
    return contacts;
  }

  //this function will return all the contacts from the database
  async getContacts() {
    let contacts = await this.Contact.find();
    return contacts;
  }

  //this function will recive the req.params.id then it filters the database and get the record who
  //matches the id
  async getContactById(id) {
    let contact = await this.Contact.findById(id);
    return contact;
  }

  //this function will recive the req.params.id then filters the database and delete the record who
  //matches the id
  async deleteContactById(id) {
    let contact = await this.Contact.deleteOne({ _id: id });
    return contact;
  }

  //this function will recive the req.params.id and the body of the request
  // then filters the database and update the record who matches the id
  async updateContactById(id, body) {
    let contact = await this.Contact.findOneAndUpdate({ _id: id }, body, {
      new: true,
      useFindAndModify: false,
    });
    return contact;
  }
}

module.exports = crmController;
