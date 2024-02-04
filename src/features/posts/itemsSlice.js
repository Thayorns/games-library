import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: '1', title: 'First Post!', body: 'Hello!' },
  { id: '2', title: 'Second Post', body: 'More text' }
]
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {

  }
})
export default itemsSlice.reducer