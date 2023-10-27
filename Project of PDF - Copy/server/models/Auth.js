import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
      
        name:{
            type: String,
            max:100,

        },
        email:{
            type: String,
            max:100,
        },
        pass:{
            type :String,
            max:200,
        },
        pdfs: [{
            type: Object, // Use mongoose.Schema.Types.ObjectId
            // Reference to another model (if applicable)
        }]
    },{timestamps:true}
);

const User1 = mongoose.model("User",User);
export default User1;