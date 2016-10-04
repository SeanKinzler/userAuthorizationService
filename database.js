// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema( {
//   google: {
//     id: String,
//     token: String,
//     email: String,
//     name: String
//   }
// });

// userSchema.methods.generateHash = (password) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// userSchema.methods.validPassword = (password) => {
//   return bcrypt.compareSync(password, this.local.password);
// };

// module.exports = {
//   'user': mongoose.model('User', userSchema),
//   'url' : 'mongodb://localhost/test'
// };
