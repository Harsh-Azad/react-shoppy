import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { checkUser, createUser ,signOut} from './authAPI';
import { updateUser } from '../user/userAPI';

const initialState = {
  loggedInUser: null, //this should only contain user identity => 'id', '/role'
  status: 'idle',
  error:null
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// export const updateUserAsync = createAsyncThunk(
//   'user/updateUser',
//   async (update) => {
//     const response = await updateUser(update);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo,{rejectWithValue}) => {
try{    const response = await checkUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;}
catch(error){
 console.log(error)
 return rejectWithValue(error);
}
  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      }) 
      // .addCase(updateUserAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(updateUserAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.loggedInUser = action.payload;
      // })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })
  },
});

export const selectLoggedInUser = (state)=>state.auth.loggedInUser;
export const selectError = (state)=>state.auth.error;

export default authSlice.reducer;
