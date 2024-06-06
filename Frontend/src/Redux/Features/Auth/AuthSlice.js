import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { username: "", email: "", isLoggedIn: false };

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
  const api = "http://localhost:3000/user/getUserInfo";
  const response = await fetch(api);
  const responseJson = await response.json();
  return { username: responseJson.username, email: responseJson.email };
});

export const handleSignIn = createAsyncThunk(
  "auth/handleSignIn",
  async (payload) => {
    const api = "http://localhost:3000/user/register";
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responseJson = await response.json();
    return responseJson;
  }
);

export const handleLogIn = createAsyncThunk(
  "auth/handleLogIn",
  async (payload) => {
    const api = "http://localhost:3000/user/login";
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responseJson = await response.json();
    localStorage.setItem("token", responseJson.token);
    return { token: responseJson.token };
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogOut: (state) => {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.username = "";
      state.email = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
      })
      .addCase(handleLogIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
      });
  },
});

export const { handleLogOut } = authSlice.actions;

export default authSlice.reducer;
