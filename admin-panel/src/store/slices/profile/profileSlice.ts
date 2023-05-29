import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userProfileThunk } from "src/store/thunks/userThunks/userProfileThunk";

type ProfileData = {
  firstName: string;
  lastName: string;
  avatar: string;
};

type profileState = {
  isLoading: boolean;
  profileData: ProfileData | null;
  error: string | null;
};

const initialState: profileState = {
  isLoading: false,
  profileData: null,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileData>) {
      state.profileData = action.payload;
    },
  },
  extraReducers(builder) {
    //================= Profile User ==============
    builder.addCase(userProfileThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      userProfileThunk.fulfilled,
      (state, action: PayloadAction<ProfileData>) => {
        state.isLoading = false;
        state.profileData = action.payload;
      }
    );
    builder.addCase(userProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export const { setProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
