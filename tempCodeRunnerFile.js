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





// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);