import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../FireBase/firebase";

const initialState = {
  username: "",
  email: "",
  profilePhoto: "",
  isLoggedIn: false,
};

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
  const api = "http://localhost:3000/user/getUserInfo";
  const response = await fetch(api);
  const responseJson = await response.json();
  return { username: responseJson.username, email: responseJson.email };
});

export const signUpWithGoogle = createAsyncThunk(
  "auth/SignIpWithGoogle",
  async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("token", result.user.refreshToken);
      return result.user;
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  }
);

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
      state.profilePhoto = "";
    },
    checkIsAuthenticated: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
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
      })
      .addCase(signUpWithGoogle.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.username = action.payload.displayName;
        state.email = action.payload?.email;
        state.profilePhoto = action.payload?.photoURL;
      });
  },
});

export const { handleLogOut, checkIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
