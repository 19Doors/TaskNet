import mongoose from 'mongoose';
const {Schema} = mongoose;

const user = new Schema({
  full_name: String,
  email: String,
  password: String,
  isAuth: Boolean,
  tasks: [{id:Number, title:String, subTasks:[String]}]
})

const userModel = mongoose.model('user', user);

export default userModel;
