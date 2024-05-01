import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/auth';
import postsReducer from './slices/posts';
import profileReducer from './slices/profile';
import searchReducer from './slices/search';
import registerReducer from './slices/registration';
import recommendationReducer from './slices/recommendations';
import notifications from './slices/notifications';


const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        profile: profileReducer,
        search: searchReducer,
        recommendations: recommendationReducer,
        register: registerReducer,
        notifications
    }
})


export default store;