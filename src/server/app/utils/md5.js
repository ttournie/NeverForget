const crypto = require('crypto');

const md5 = function(string, callback) {
  const withCallback = typeof callback === 'function';
  
  try {
  
    const hash = crypto.createHash('md5')
      .update(string)
      .digest('hex');
      
    withCallback && callback(null, hash);
    
  } catch (e) {
    if (withCallback) callback(e);
    else throw e;
  }
}

module.exports = (string) => new Promise(
    (resolve, reject) => {
      md5(string, (err, hash) => {
        return err ? reject(err) : resolve(hash)
      })
    }
  )