// our contact schema
module.exports = (mongoose) => {
  var ContactSchema = mongoose.Schema({
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    company: {
      type: String,
    },
    phone: {
      type: Number,
    },
    created_date: {
      type: Date,
      default: Date.now,
    },
  });

  const Contact = mongoose.model("Contact", ContactSchema);
  return Contact;
};
