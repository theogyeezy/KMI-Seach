import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../services/supabase';
import { TargetMunicipality, FilterOptions } from '../types';

interface MunicipalitiesState {
  municipalities: TargetMunicipality[];
  filteredMunicipalities: TargetMunicipality[];
  filterOptions: FilterOptions;
  loading: boolean;
  error: string | null;
}

const initialState: MunicipalitiesState = {
  municipalities: [],
  filteredMunicipalities: [],
  filterOptions: {
    regions: [],
    divisions: [],
    populationRange: [0, 200000],
    bondAmountRange: [0, 15000000],
    approvalDateRange: ['2022-01-01', '2025-12-31'],
    states: []
  },
  loading: false,
  error: null
};

// Async thunk for fetching municipalities data
export const fetchMunicipalities = createAsyncThunk(
  'municipalities/fetchMunicipalities',
  async (_, { rejectWithValue }) => {
    try {
      // In a real application, this would fetch from the Supabase view we created
      const { data, error } = await supabase
        .from('target_municipalities_view')
        .select('*');

      if (error) throw error;
      return data as TargetMunicipality[];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const municipalitiesSlice = createSlice({
  name: 'municipalities',
  initialState,
  reducers: {
    setFilterOptions: (state, action: PayloadAction<Partial<FilterOptions>>) => {
      state.filterOptions = { ...state.filterOptions, ...action.payload };
      state.filteredMunicipalities = applyFilters(state.municipalities, state.filterOptions);
    },
    resetFilters: (state) => {
      state.filterOptions = initialState.filterOptions;
      state.filteredMunicipalities = state.municipalities;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMunicipalities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMunicipalities.fulfilled, (state, action) => {
        state.loading = false;
        state.municipalities = action.payload;
        state.filteredMunicipalities = action.payload;
      })
      .addCase(fetchMunicipalities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

// Helper function to apply filters
const applyFilters = (municipalities: TargetMunicipality[], filters: FilterOptions): TargetMunicipality[] => {
  return municipalities.filter(item => {
    // Region filter
    if (filters.regions.length > 0 && !filters.regions.includes(item.municipality.region)) {
      return false;
    }
    
    // Division filter
    if (filters.divisions.length > 0 && !filters.divisions.includes(item.institution.athletic_division)) {
      return false;
    }
    
    // Population range filter
    if (
      item.municipality.population < filters.populationRange[0] ||
      item.municipality.population > filters.populationRange[1]
    ) {
      return false;
    }
    
    // Bond amount range filter
    if (
      item.bond.amount < filters.bondAmountRange[0] ||
      item.bond.amount > filters.bondAmountRange[1]
    ) {
      return false;
    }
    
    // Approval date range filter
    const approvalDate = new Date(item.bond.approval_date);
    const startDate = new Date(filters.approvalDateRange[0]);
    const endDate = new Date(filters.approvalDateRange[1]);
    if (approvalDate < startDate || approvalDate > endDate) {
      return false;
    }
    
    // State filter
    if (filters.states.length > 0 && !filters.states.includes(item.municipality.state)) {
      return false;
    }
    
    return true;
  });
};

export const { setFilterOptions, resetFilters } = municipalitiesSlice.actions;
export default municipalitiesSlice.reducer;
