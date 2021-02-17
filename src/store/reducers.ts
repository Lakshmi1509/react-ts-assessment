import { reducer as metricsReducer } from '../components/MetricsSelect/reducer';
import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as multipleMeasurementsReducer } from '../components/Chart/reducer';
import { reducer as lastKnownMeasurementsReducer } from '../components/Measurements/reducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  multipleMeasurements: multipleMeasurementsReducer,
  lastKnownMeasurements: lastKnownMeasurementsReducer,
};
