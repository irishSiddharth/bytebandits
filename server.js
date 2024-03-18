const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;







// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/userinfo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));





// Set up multer storage for storing image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '/imgstore'); // Defining  the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname); // Keep the original filename
  }
});

const upload = multer({ storage: storage });

app.use('/imgstore', express.static('imgstore')); // Serve uploaded files statically



























// Create user schema and model for signin singup
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Confirm_password: {
        type: String,
        required: true
    }

});
const User = mongoose.model('User', userSchema);







// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:false}));















// Serve static files (HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

// Route for login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route for signup page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Dashboard route (after login/signup)
app.get('/dashboard', (req, res) => {
    // Check if user is logged in (we'll need to implement this logic)
    // For now, let's assume the user is logged in
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/peopleTracker', (req, res) => {
    // Check if user is logged in (you'll need to implement this logic)
    // For now, let's assume the user is logged in
    res.sendFile(path.join(__dirname, 'public', 'peopleTracker.html'));
});

app.get('/cms', (req, res) => {
    // Check if user is logged in (you'll need to implement this logic)
    // For now, let's assume the user is logged in
    res.sendFile(path.join(__dirname, 'public', 'cms.html'));
});


app.get('/search', (req, res) => {
  // Check if user is logged in (you'll need to implement this logic)
  // For now, let's assume the user is logged in
  res.sendFile(path.join(__dirname, 'public', 'search3.html'));
});


app.get('/notavailable', (req, res) => {
    // Check if user is logged in (you'll need to implement this logic)
    // For now, let's assume the user is logged in
    res.sendFile(path.join(__dirname, 'public', 'notavailable.html'));
});


//Route to handle signup form submission
app.post('/register', async (req, res) => {
    try {
        const { username, email, password,Confirm_password } = req.body;
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.sendFile(path.join(__dirname, 'public', 'Emailreuse.html'));
        }
        // Create a new user
        const newUser = new User({ username, email, password,Confirm_password });
        await newUser.save();
        // Return HTML page for successful registration
        res.sendFile(path.join(__dirname, 'public', 'registration_success.html'));
    } catch (err) {
        console.error(err);
        res.sendFile(path.join(__dirname, 'public', 'serverError.html'));
    }
});



app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email and password
        const user = await User.findOne({ email, password });
        if (user) {
            res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
        } else {
            res.sendFile(path.join(__dirname, 'public', 'invalidEmailPass.html'));
        }
    } catch (err) {
        console.error(err);
        res.sendFile(path.join(__dirname, 'public', 'serverError.html'));
    }
});























//for for people tracker


const userSchema1 = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    details: {
      type:mongoose.Schema.Types.Mixed,
      required: true,
    },
    image: {
      type: String,
      default: '', // Optional: Set a default value for image path
    },
  });
  
  // Consider using a different model name to avoid conflicts with existing user variable
  const Account = mongoose.model('Account', userSchema1); // New model name




  app.post('/peopleTracker', async (req, res) => {
    try {
      const { name, profession, details, image } = req.body; // Extract data from request body
      const newAccount = new Account({ name, profession, details, image });
      await newAccount.save();
      res.sendFile(path.join(__dirname, 'public', 'witnessDataStored.html'));
    } catch (error) {
      console.error(error);
      res.sendFile(path.join(__dirname, 'public', 'witnessDataStoredError.html'))
    }
  });













  const clueSchema = new mongoose.Schema({
    category: {
      type: String,
      required: true,
    },
    date1: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Array of image URLs
    }});

    const Clue = mongoose.model('Clue', clueSchema);






    
    
    
    
    
    
    
    
    
    
    
    
    app.post('/cms', async (req, res) => {
        try {
          const { category, date1, description, images } = req.body;
          const newClue = new Clue({
            category,
            date1: new Date(date1), // Convert to Date object
            description,
            images,
            
          });
      
          await newClue.save();
      
          res.sendFile(path.join(__dirname, 'public', 'cluestored.html'));
        } catch (error) {
          console.error(error);
          res.sendFile(path.join(__dirname, 'public', 'cluestorederror.html'));
        }
      });
























      















      










      






  


    



















  



























// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
