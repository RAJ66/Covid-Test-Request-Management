const bcrypt = require("bcrypt");

module.exports = async function generatePassCrypt(password) {
  const passwordHash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return passwordHash;
};
