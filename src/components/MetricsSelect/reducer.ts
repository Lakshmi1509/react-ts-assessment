import { Maybe, MeasurementQuery } from './../../generated/graphql';
import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metrics = { metrics: string[] };
export type SelectedMetrics = { selectedMetrics: string[] };

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metricNames: [] as string[],
  selectedMetrics: [] as string[],
  input: [] as Maybe<MeasurementQuery>[] | null | undefined,
};

const input = (data: any[]) => {
  let date = new Date().getTime();
  let f = [];
  for (let i = 0; i < data.length; i++) {
    f.push({
      metricName: data[i],
      after: date - 1800000,
      before: date,
    });
  }

  return f;
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataReceived: (state, action: PayloadAction<Metrics>) => {
      const p = action.payload;
      state.metricNames = p.metrics;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    selectedMetrics: (state, action: PayloadAction<SelectedMetrics>) => {
      const p = action.payload;
      state.selectedMetrics = p.selectedMetrics;
      state.input = input(p.selectedMetrics);
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
