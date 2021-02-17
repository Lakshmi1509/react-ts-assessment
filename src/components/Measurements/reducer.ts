import { createSlice, PayloadAction } from 'redux-starter-kit';
import { Measurement } from '../../generated/graphql';

export type LastKnownMeasurement = { lastKnownMeasurement: Measurement };
export type NewMeasurement = { newMeasurement: Measurement };

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  lastKnownMeasurements: [] as Measurement[],
};

const slice = createSlice({
  name: 'lastKnownMeasurements',
  initialState,
  reducers: {
    lastKnownMeasurementsDataReceived: (state, action: PayloadAction<LastKnownMeasurement>) => {
      const p = action.payload;
      const existingIndex = state.lastKnownMeasurements.findIndex(lm => lm.metric === p.lastKnownMeasurement.metric);
      if (existingIndex < 0) {
        state.lastKnownMeasurements = [...state.lastKnownMeasurements, p.lastKnownMeasurement];
      }
    },
    lastKnownMeasurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    newMeasurementsDataReceived: (state, action: PayloadAction<NewMeasurement>) => {
      const p = action.payload;
      const existingIndex = state.lastKnownMeasurements.findIndex(lm => lm.metric === p.newMeasurement?.metric);
      if (existingIndex >= 0) {
        state.lastKnownMeasurements[existingIndex] = p.newMeasurement;
      }
    },
    newMeasurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
