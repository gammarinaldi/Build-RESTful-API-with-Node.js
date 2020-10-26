let express = require('express'), //Express sebagai framework node.js untuk membuat RESTful API
    path = require('path'), //Path menyediakan fungsi-fungsi untuk akses file dan direktori
    mongoose = require('mongoose'), //Mongoose menyediakan koneksi dari node.js ke mongoDB
    cors = require('cors'), 
    //CORS adalah singkatan dari Cross-Origin Resource Sharing. 
    //Ini adalah mekanisme untuk mengizinkan atau membatasi sumber daya yang diminta di server web 
    //bergantung pada tempat permintaan HTTP dimulai. 
    //Digunakan untuk mengamankan web server tertentu dari akses website atau domain lain.
    bodyParser = require('body-parser'), 
    //Body parser adalah sebuah middleware dari express, yg membaca form input
    //yg akan dikirim dari client, menyimpannya sebagai objek javascript, yg dapat diakses melalui req.body
    dbConfig = require('./db/database');


// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log('Database connected')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)

// Setting up express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// Api root
const userRoute = require('./routes/doctor.route')
app.use('/endpoint', userRoute)

// Create port
const port = process.env.PORT || 8080;

// Conectting port
const server = app.listen(port, () => {
    console.log('Port connected to: ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res) => {
    res.send('Error 404 not found')
});

// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

// Error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

// Static build location
app.use(express.static(path.join(__dirname, 'dist')));