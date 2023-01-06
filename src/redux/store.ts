import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice'
import adminReducer from './slice/adminSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


export default store;



