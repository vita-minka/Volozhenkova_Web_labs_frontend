import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Добавляем type для StageResponseDto
import { StagesApi, type StageResponseDto } from '../../api/generated';
import { STAGES_MOCK } from '../../mock/stages';

export const fetchStages = createAsyncThunk(
  'stages/fetchStages',
  async (century: number | undefined) => {
    try {
      return await StagesApi.getStages(century);
    } catch (error) {
      return STAGES_MOCK as unknown as StageResponseDto[];
    }
  }
);

const stagesSlice = createSlice({
  name: 'stages',
  initialState: {
    list: [] as StageResponseDto[],
    filterCentury: '' as string | number,
    loading: false,
  },
  reducers: {
    setFilterCentury: (state, action) => {
      state.filterCentury = action.payload;
    },
    resetFilters: (state) => {
      state.filterCentury = '';
    },
    toggleLikeInList: (state, action) => {
      const stage = state.list.find((s) => s.id === action.payload.id);
      if (stage) {
        stage.isLiked = action.payload.isLiked;
        stage.likesCount += action.payload.isLiked ? 1 : -1;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStages.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchStages.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilterCentury, resetFilters, toggleLikeInList } = stagesSlice.actions;
export default stagesSlice.reducer;