const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const articleSchema = new Schema( {
    title: { type: String, required: true },
    body: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, {
    timestamps: true,
} );

module.exports = mongoose.model( "Article", articleSchema );
