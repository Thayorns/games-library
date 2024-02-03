import { configureStore } from '@reduxjs/toolkit'
import { dataReducer } from '../../features/posts/dataReducer'

const store = configureStore({
    reducer: {
        data: dataReducer,
    },
}) 
export default store