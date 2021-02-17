import { DateTime } from 'luxon';
import { GetMultipleMeasurementsQuery } from './../../generated/graphql';
import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MultipleMeasurements = { multipleMeasurements: GetMultipleMeasurementsQuery | undefined };

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  multipleMeasurements: [] as any,
  chartData: [] as any,
  xy: [] as any,
};

const getXY = (s: any) => {
  if (!s) {
    return;
  }
  const data = s;
  if (!data) {
    return;
  }
  let formattedData = [] as any;

  for (let i = 0; i < s.length; i++) {
    if (!formattedData.includes(s[i].metric)) {
      formattedData.push({ metric: s[i].metric, unit: s[i].measurements[0]?.unit });
    }
  }

  return formattedData;
};

const slice = createSlice({
  name: 'multipleMeasurements',
  initialState,
  reducers: {
    multipleMeasurementsDataReceived: (state, action: PayloadAction<MultipleMeasurements>) => {
      const p = action.payload;
      state.multipleMeasurements = p.multipleMeasurements;
      state.chartData = getFormatDataForChart(p.multipleMeasurements);
      state.xy = getXY(p.multipleMeasurements);
    },
    multipleMeasurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

const getFormatDataForChart = (s: any) => {
  if (!s) {
    return;
  }
  const data = s;
  if (!data) {
    return;
  }
  let formattedData = [];

  for (let i = 0; i < data.length; i++) {
    let metric = data[i]!.metric;

    if (i === 0) {
      for (let j = 0; j < data[i]!.measurements!.length; j++) {
        let time = data[i]!!.measurements[j]!!.at;
        let value = data[i]!!.measurements[j]!!.value;

        formattedData.push({
          name: DateTime.fromISO(new Date(time).toISOString()).toLocaleString(DateTime.TIME_SIMPLE),
          [metric]: value,
        });
      }
    } else {
      for (let j = 0; j < data[i]!.measurements!.length; j++) {
        let value = data[i]!!.measurements[j]!!.value;
        formattedData[j][metric] = value;
      }
    }
  }
  return formattedData;
};

export const reducer = slice.reducer;
export const actions = slice.actions;
