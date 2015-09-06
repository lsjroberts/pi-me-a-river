var auth = function (req, res) {
  return res.status(401).send({
    error: 'unauthorised',
    message: 'Unable to authorise request'
  });
};

module.exports = auth;