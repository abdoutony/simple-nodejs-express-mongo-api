// our user schema
const bcrypt = require("bcrypt");
module.exports = (mongoose) => {
  var UserSchema = mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    created_date: {
      type: Date,
      default: Date.now,
    },
  });

  UserSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
  };

  const User = mongoose.model("User", UserSchema);
  return User;
};
