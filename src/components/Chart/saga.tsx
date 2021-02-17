import { toast } from 'react-toastify';
import { call, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from 'redux-starter-kit';
import { actions as MetricsActions, ApiErrorAction } from './reducer';

function* apiErrorReceived(action: PayloadAction<ApiErrorAction>) {
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}

export default function* watchApiError() {
  yield takeEvery(MetricsActions.multipleMeasurementsApiErrorReceived.type, apiErrorReceived);
}
