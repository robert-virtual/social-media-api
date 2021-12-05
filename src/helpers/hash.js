const { scryptSync, randomBytes, timingSafeEqual } = require("crypto");

function hash(password) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashedPassword}`;
}

function verify(password, hashedPassword) {
  const [salt, storedPassword] = hashedPassword.split(":");

  const hashedBuffer = scryptSync(password, salt, 64);
  const storedBuffer = Buffer.from(storedPassword, "hex");

  return timingSafeEqual(hashedBuffer, storedBuffer);
}

module.exports = {
  hash,
  verify,
};
