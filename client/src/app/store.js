import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/auth';
import postsReducer from './slices/posts';
import profileReducer from './slices/profile';
import searchReducer from './slices/search';
import registerReducer from './slices/registration';


const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        profile: profileReducer,
        search: searchReducer,
        register: registerReducer
    }
})


export default store;