import {
  Action,
  configureStore,
  ThunkAction,
  combineReducers,
  AnyAction,
  CombinedState,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { counterSlice, CounterState } from '../features/counterSlice';
import { kanyeSlice, KanyeState } from '../features/kanyeSlice';

export const reducer = (
  state: CombinedState<{ counter: CounterState; kanyeQuote: KanyeState }> | undefined,
  action: AnyAction,
) => {
  if (action.type === HYDRATE) {
    console.log('HYDRATE', action);
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    [counterSlice.name]: counterSlice.reducer,
    [kanyeSlice.name]: kanyeSlice.reducer,
  })(state, action);
};

const store = () =>
  configureStore({
    reducer,
  });

export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(store, {
  debug: process.env.NODE_ENV !== 'production',
});
