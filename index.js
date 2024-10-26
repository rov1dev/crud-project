const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Multer sozlamalari
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Rasmlar yuklanadigan papka
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Fayl yuklash uchun endpoint
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.send('Rasm muvaffaqiyatli yuklandi!');
    } catch (err) {
        res.status(500).send('Rasm yuklashda xato yuz berdi.');
    }
});

// Serverni ishga tushirish
app.listen(3000, () => {
    console.log('Server 3000-portda ishga tushdi');
});

const uploadsDir = path.join(__dirname, 'uploads');

fs.readdir(uploadsDir, (err, files) => {
    if (err) {
        return console.error('Xato:', err);
    }
    console.log('Uploads papkasidagi fayllar:');
    files.forEach(file => {
        console.log(file);
    });
});