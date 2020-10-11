var crypto = require('crypto');

encryptPassword=(password, salt) =>{
    var encodedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
    return Buffer.from(encodedPassword, 'binary').toString('hex');
  }
module.exports.encryptPassword=encryptPassword;

module.exports.salt=()=>{
    return crypto.randomBytes(32).toString("hex");
}
module.exports.checkPassword=(password, hashedPassword, salt) =>{
    if (encryptPassword(password, salt) === hashedPassword) {
      return true;
    }
    return false;
  }
module.exports.generateVarificatioCode=()=>{
    let min=111111;
    let max=999999;
    return Math.floor(Math.random() * (max - min)) + min; 
}
