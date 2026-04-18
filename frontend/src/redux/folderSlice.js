import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchFolders = createAsyncThunk("folders/get", async () => {
  const res = await API.get("/folders");
  return res.data;
});

export const createFolder = createAsyncThunk(
  "folders/create",
  async (data) => {
    const res = await API.post("/folders", data);
    return res.data;
  }
);

const folderSlice = createSlice({
  name: "folder",
  initialState: { folders: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFolders.fulfilled, (state, action) => {
      state.folders = action.payload;
    });
    builder.addCase(createFolder.fulfilled, (state, action) => {
      state.folders.push(action.payload);
    });
  },
});

export default folderSlice.reducer;