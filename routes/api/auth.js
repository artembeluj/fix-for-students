const express = require("express");

const { validateBody } = require("../../middlewares");

const { authentificate } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.get("/logout", authentificate, ctrlWrapper(ctrl.logout));


module.exports = router;