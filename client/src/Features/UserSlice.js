import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const login = createAsyncThunk(
  "users/login",
  async (userData) =>{
    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`,{
        email: userData.email,
        password:userData.password,
      })
      const user= response.data.user;
      const msg = response.data.msg;
      return({user,msg})
      }
      catch(error){
        const msg = error.message;
        return({msg})
      }
    }
    

  
)
// Async function for registering a user
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/registerUser`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      // Log response data for debugging
      console.log(response);
      // Return an object with both 'user' and 'msg' for handling in the slice
      return {
        user: response.data.user,
        msg: response.data.msg
      };

    } catch (error) {
      console.error("Error during user registration:", error);
      throw error; // Make sure to throw error to trigger rejected case
    }
  }
)
export const logout = createAsyncThunk("/users/logout", async () => {
  try {
    // Send a request to your server to log the user out
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/logout`);
    const msg = response.data.msg
    console.log(msg)
  } catch (error) {
    const msg = error.msg;
    return({msg})
  }
});


// Initial state for the user slice
const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  msg: null,
  isLogin:false,

};
// Create the user slice
export const userSlice = createSlice({
  name: "users", // Name of the slice
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => { //Completed
        state.isSuccess = true;
        state.user = action.payload.user;
        state.msg = action.payload.msg;
        
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.msg = action.payload.message; // Store error message for UI feedback
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => { //Completed
        state.isSuccess = true;
        state.user = action.payload.user;
        state.msg = action.payload.msg;
        state.isLogin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.msg = action.payload.message; // Store error message for UI feedback
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        // Clear user data or perform additional cleanup if needed
        state.isLogin = false;
        state.user = null;
        state.msg = action.payload.msg;
      })
      .addCase(logout.rejected, (state) => {
        state.isError = true;
      });

  },

});

 

// Export the reducer

export default userSlice.reducer;

 

 
