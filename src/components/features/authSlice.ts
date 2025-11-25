import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";
import { signUp, signIn, signOut, getUserProfile } from "../../supabaseAuth";

interface User {
  id: string;
  email: string;
  username: string;
  occupation?: string;
  profilePic?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

/* ---------------------- SIGNUP ----------------------- */
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { email, password, username }: 
    { email: string; password: string; username: string },
    thunkAPI
  ) => {
    try {
      const authUser = await signUp(email, password, username);

      // ⚠️ Si el usuario aún no confirma el correo, Supabase no permite sesión
      if (!authUser) {
        return thunkAPI.rejectWithValue(
          "Revisa tu correo y confirma tu cuenta para continuar."
        );
      }

      // ✔ obtener el perfil recién insertado
      const profile = await getUserProfile(authUser.id);

      return {
        id: profile.id,
        email: profile.email,
        username: profile.username,
        occupation: profile.occupation,
        profilePic: profile.profile_pic,
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);



/* ---------------------- LOGIN ----------------------- */
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const authUser = await signIn(email, password);
      if (!authUser) {
        return thunkAPI.rejectWithValue("Invalid login");
      }
      const profile = await getUserProfile(authUser.id);

      return {
        id: profile.id,
        email: profile.email,
        username: profile.username,
        profilePic: profile.profile_pic,
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

/* ---------------------- LOAD SESSION ----------------------- */
export const loadSession = createAsyncThunk("auth/loadSession", async (_, thunkAPI) => {
  try {
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (!session) return null;

    const userId = session.user.id;
    const profile = await getUserProfile(userId);

    return {
      id: profile.id,
      email: profile.email,
      username: profile.username,
      profilePic: profile.profile_pic,
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

/* ---------------------- LOGOUT ----------------------- */
export const logout = createAsyncThunk("auth/logoutUser", async () => {
  await signOut();
  return null;
});

/* ---------------------- UPDATE USER ----------------------- */
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (
    updates: { 
      username?: string; 
      profilePic?: string; 
      occupation?: string;  // ✔ ahora sí
      userId: string;
    }, 
    thunkAPI
  ) => {
    try {
      const { username, profilePic, occupation, userId } = updates;

      const { data, error } = await supabase
        .from("users")
        .update({
          username,
          profile_pic: profilePic,
          occupation,  // ✔ también lo enviamos a la BD
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        email: data.email,
        username: data.username,
        profilePic: data.profile_pic,
        occupation: data.occupation,  // ✔ ya es consistente
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


/* ---------------------- SLICE ----------------------- */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ---------------- SIGNUP ------------------- */
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;

        const msg = action.payload as string;

        if (msg.includes("409") || msg.includes("duplicate") || msg.includes("already registered")) {
          state.error = "Ya existe una cuenta con este correo. Revisa tu bandeja de entrada para confirmar tu cuenta.";
        } else {
          state.error = msg;
        }
      })


      /* ---------------- LOGIN ------------------- */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ---------------- LOAD SESSION ------------------- */
      .addCase(loadSession.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      /* ---------------- LOGOUT ------------------- */
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })

      /* ---------------- UPDATE ------------------- */
      .addCase(updateUser.fulfilled, (state, action) => {
        if (!state.user) return;
        state.user = {
          ...state.user,
          username: action.payload.username,
          profilePic: action.payload.profilePic,
          occupation: action.payload.occupation,  // ✔ añadir
        };
      });
  },
});

export default authSlice.reducer;
