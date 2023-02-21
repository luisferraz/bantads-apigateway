//importing modules
const express = require("express");
const validaJWT = require("../middleware/auth");
const { loginServiceProxy, logout } = require("../middleware/login");
const createUserProxy = require("../middleware/admin");

const router = express.Router();

//Endpoint de Login e logout

//Comentado pra franciela testar o de baixo
router.post("/login", loginServiceProxy);

//Aqui vai retornar um objeto de login com auth: true, token e um usuario admin de mentira
// Se quiser testar o login de verdade, só subir no docker tudo isso aqui, comentar a função abaixo e descomentar a de cima
//Da pra testar no docker desse jeito também, sem descomentar as funções, ai sempre vai retornar esse user aqui
//
// router.post("/login", (req, res, next) => {
//   return res
//     .status(200)
//     .json({
//       auth: true,
//       token: "token1234",
//       data: { nome: "Admin", email: "admin@email.com", perfil: "ADMIN" },
//     });
// });


router.post("/logout", logout);

router.post("/usuario", createUserProxy);

// //Inserção do gerente pelo Admin
// router.post("/gerente", validaJWT, insereGerenteProxy);

// //Remoção do gerente pelo Admin
// router.delete("/gerente/:id", validaJWT, removeGerenteProxy);

// //Listagem de Gerentes pelo Admin
// router.get("/gerente", validaJWT, listaTodosGerentesProxy);

// //Listagem de Gerentes Totalizados pelo Admin
// router.get("/gerente", validaJWT, listaGerentesAgrupadosProxy);

// //Alteração de Gerente pelo Admin
// router.put("/gerente/:id", validaJWT, atualizaGerenteProxy);

// //Listagem de todos os clientes pelo Admin
// router.get("/cliente", validaJWT, relatorioClientesAdminProxy);

module.exports = router;
