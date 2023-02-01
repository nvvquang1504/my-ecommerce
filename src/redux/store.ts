import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import adminReducer from './slice/adminSlice';
import cartReducer from './slice/cartSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        cart: cartReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


export default store;



