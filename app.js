const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { encrypt, decrypt } = require('./encryptDecrypt');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configura EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/encrypt', (req, res) => {
    const { password } = req.body;
    const encryptedPassword = encrypt(password);
    res.render('result', { message: 'Contraseña encriptada:', result: encryptedPassword });
});

app.post('/decrypt', (req, res) => {
    const { encryptedPassword } = req.body;
    try {
        const decryptedPassword = decrypt(encryptedPassword);
        res.render('result', { message: 'Contraseña desencriptada:', result: decryptedPassword });
    } catch (error) {
        res.render('error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
