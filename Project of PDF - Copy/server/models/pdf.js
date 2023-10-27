import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
   user:{
    type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
        ref: 'Auth' 
   },
    pdf:{
        type: mongoose.Schema.Types.Buffer, // Use mongoose.Schema.Types.ObjectId
        // ref: 'Pdf' // Reference to another model (if applicable)
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the createdAt timestamp
      },
      fileName:{
        type: String,

      }
})


const pdf1 = mongoose.model("Pdf", userSchema);
export default pdf1;

