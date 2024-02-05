import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}
export const fetchPosts = createAsyncThunk('items/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()
  initialState.posts.push(...data)
  return initialState.posts
})
console.log(initialState.posts);
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    
  }
})
export default itemsSlice.reducer