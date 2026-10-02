import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const STARTING_CREDITS = 20;
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    credits : {
        type: Number,
        default: STARTING_CREDITS,
        min: 0
    },
    emailVerified: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

//to return a safe user obj (no password) to sent to fronend
userSchema.methods.toClient = function() {
    return {
        _id: this._id.tostring(),
        name: this.name,
        email: this.email,
        credits: this.credits,
        emailVerified: Boolean(this.emailVerified),
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

// to hash the password before saving it to the database
userSchema.statics.hashPassword = function(plain) {
    return bcrypt.hash(plain, 10);
};

// to verify the hash password with the user password before login
userSchema.methods.verifyPassword = function(plain) {
    return bcrypt.compare(plain, this.passwordHash);
}; 

userSchema.statics.STARTING_CREDITS = STARTING_CREDITS;

export const User = mongoose.model("User", userSchema);