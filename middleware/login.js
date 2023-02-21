const jwt = require("jsonwebtoken");
const httpProxy = require("express-http-proxy");

const authBodyDecorator = function (bodyContent, srcReq) {
  try {
    let retBody = {};
    retBody.email = bodyContent.user;
    retBody.senha = bodyContent.password;
    bodyContent = retBody;
  } catch (e) {
    console.log(`ERRO! ${e}`);
  }
  return bodyContent;
};

const authHeadersDecorator = function (proxyReqOpts, srcReq) {
  proxyReqOpts.headers["Content-Type"] = "application/json";
  proxyReqOpts.method = "POST";
  return proxyReqOpts;
};

const authResponseDecorator = function (
  proxyRes,
  proxyResData,
  userReq,
  userRes
) {
  try {
    if (proxyRes.statusCode == 200) {
      var str = Buffer.from(proxyResData).toString("utf-8");
      var objBody = JSON.parse(str);
      const id = objBody.id;
      const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 300,
      });
      userRes.status(200);
      return { auth: true, token: token, data: objBody };
    } else {
      userRes.status(401);
      return { message: "Login inválido!" };
    }
  } catch (error) {
    console.log(`ERRO AQUI: ${error}`);
    userRes.status(401);
    return { message: "Login inválido!" };
  }
};

const loginServiceProxy = httpProxy(
  `${process.env.AUTH_SERVICE_HOST}`,
  {
    proxyReqBodyDecorator: authBodyDecorator,
    proxyReqOptDecorator: authHeadersDecorator,
    userResDecorator: authResponseDecorator,
  }
);

const logout = (req, res) => {
  return res.json({ auth: false, token: null });
};

//exporting module
module.exports = {
  loginServiceProxy,
  logout,
};
