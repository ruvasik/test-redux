import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search?offset=0&number=10&query=";
let timer;

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (query, thunkAPI) => {
    const response = await fetch(API_URL + query.toLowerCase(), {
      signal: thunkAPI.signal,
      method: "GET",
      headers: {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "cff267e87cmshee6893354d4b2ccp1d0b32jsnb798822a8ae7"
      }
    });

    const data = await response.json();

    if (data && data.products)
      return data.products;

    return [];
  }
)

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
    query: '',
    results: [],
  },
  reducers: {
    changeValue: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
    changeQuery: (state, action) => {
      state.query = action.payload.toLowerCase();
    },
    clear: (state, action) => {
      state.results = []
    },
    onSelect: (state, action) => {
      state.value = action.payload;
      state.query = ''
      state.results = [];
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchProducts.fulfilled]: (state, action) => {
      state.results = action.payload;
    }
  }
});

export const { onSelect, changeQuery, changeValue, clear } = searchSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const onInputChange = (value) => dispatch => {
  dispatch(changeValue(value));
  dispatch(changeQuery(value));
  dispatch(clear());

  clearTimeout(timer);

  if (value.length > 2)
    timer = setTimeout(() => {
        dispatch(fetchProducts(value));
    }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectValue = state => state.search.value || [];
export const selectResults = state => state.search.results || [];
export const selectQuery = state => state.search.query || [];

export default searchSlice.reducer;

