import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//Slices
import authReducer from './features/slices/auth';
import referralReducer from './features/slices/referralModelData';

//RTK query api's
import { coursesApi } from './features/api/courses';
import {courseDetails} from './features/api/courseDetails';
import { reviewsApi } from './features/api/courseReviews';
import { referralApi } from './features/api/referralModelData';
import { transactions } from './features/api/transection';
import { dashboardApi } from './features/api/dashboard';
import { paymentMethodsApi } from './features/api/paymentMethods';
import { payoutApi } from './features/api/payoutApi';



/* ----------  Per‑slice persistence configs  ---------- */
const persistConfigLayout = {
  key : 'auth',
  storage,
}



/* ----------  Wrap the reducers  ---------- */
const persistedAuth = persistReducer(persistConfigLayout, authReducer);


/* ----------  Store  ---------- */
export const store = configureStore({
  reducer: {
    auth:      persistedAuth,
    referral:  referralReducer,

    [coursesApi.reducerPath]: coursesApi.reducer,
    [courseDetails.reducerPath]: courseDetails.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [referralApi.reducerPath]: referralApi.reducer,
    [transactions.reducerPath]: transactions.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [paymentMethodsApi.reducerPath]: paymentMethodsApi.reducer,
    [payoutApi.reducerPath]: payoutApi.reducer,

    },

    /* RTK‑Query reducers (non‑persistent) */
 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
    .concat(
      coursesApi.middleware,
      courseDetails.middleware,
      reviewsApi.middleware,
      referralApi.middleware,
      transactions.middleware,
      dashboardApi.middleware,
      paymentMethodsApi.middleware,
      payoutApi.middleware,
    ),
});

/* ----------  Persistor  ---------- */
export const persistor = persistStore(store);


/* ----------  Types  ---------- */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
