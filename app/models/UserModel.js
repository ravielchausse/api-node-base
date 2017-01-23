import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({

    userName: {
        type: String,
        required: true
    },

    userLogin: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },

    userPassword: {
        type: String,
        required: true
    },

    userEmail: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },

    userPhone: {
        type: String,
        required: true
    },

    userCellPhone: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },

    userType: {
        type: String,
        enum: ['admin', 'asker', 'responder']
    }

});

UserSchema.method({

    create (attributes, callback) {
        try {
            return this.model('User').create(attributes).exec();
        } catch (e) {
            throw new Error(e.message);
        }
    },

    update (id, attributes, callback) {
        try {
            return this.model('User')
                .findByIdAndUpdate(id, { $set: attributes }, { new: true }).exec();
        } catch (e) {
            throw new Error(e.message);
        }
    },

    getAll (callback) {
        try {
            return this.model('User').find().exec();
        } catch (e) {
            throw new Error(e.message);
        }
    },

    getById (id, callback) {
        try {
            return this.model('User').findOne({ _id: id }).exec();
        } catch (e) {
            throw new Error(e.message);
        }
    },

    delete (id, callback) {
        try {
            return this.model('User')
                .findOneAndRemove({ _id: id }, { passRawResult: true }).exec();
        } catch (e) {
            throw new Error(e.message);
        }
    }
});

export default mongoose.model('User', UserSchema);
