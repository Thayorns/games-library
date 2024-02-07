import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}
export const fetchPosts = createAsyncThunk('items/fetchPosts', async () => {
  const request = new Request('https://jsonplaceholder.typicode.com/posts')
  const response = await fetch(request)
  const data = await response.json()
  return data
})

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    
  },
  extraReducers(builder) {
    builder
    // .addCase(fetchPosts.pending, (state, action) => {
    //   state.status = 'loading'
    // })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.posts = state.posts.concat(action.payload)
    })
    // .addCase(fetchPosts.rejected, (state, action) => {
    //   state.status = 'failed'
    //   state.error = action.error.message
    // })
  }
})
export default itemsSlice.reducer