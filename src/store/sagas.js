import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricsSaga from '../components/MetricsSelect/saga';
import multipleMeasurementsSaga from '../components/Chart/saga';
import lastKnownMeasurementsSaga from '../components/Measurements/saga';

export default function* root() {
  yield spawn(weatherSaga, metricsSaga, multipleMeasurementsSaga, lastKnownMeasurementsSaga);
}
