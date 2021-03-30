const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { User, sequelize } = require('../../conexion');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');


const inputUserValidators = [
    check('username', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email no es correcto').isEmail()
];

// http://localhost:3000/api/register
router.post("/register", [
    check("username", "El usuario es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email no es correcto").isEmail()
], async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(404).json({ errores: errors.array() });
    }

    request.body.password = bcrypt.hashSync(request.body.password, 10);
    const user = await User.create(request.body);
    response.json(user);
});

module.exports = router;