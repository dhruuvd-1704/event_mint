const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    hosted: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'  // Assuming you have an Event model
        }
    ],
    collectibles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'  // Assuming you have an NFT model
        }
    ]
}, 
{ timestamps: true });

// Before saving, you should hash the password using bcrypt (Optional but recommended).
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
