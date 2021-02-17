import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNewMeasurementSubscription } from '../../generated/graphql';
import { IState } from '../../store';
import Measurements from './Measurements';
import { actions } from './reducer';

interface Props {}

const getSelectedValue = (state: IState) => {
  const { input } = state.metrics;
  return {
    input,
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      padding: '20px 0',
    },
  }),
);

const LastKnownMeasurement = (props: Props) => {
  const { input } = useSelector(getSelectedValue);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { data, error } = useNewMeasurementSubscription();

  useEffect(() => {
    if (error) {
      dispatch(actions.newMeasurementsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { newMeasurement } = data;
    if (!newMeasurement) return;

    dispatch(actions.newMeasurementsDataReceived({ newMeasurement: newMeasurement }));
  }, [dispatch, data, error]);

  return (
    <Grid className={classes.grid} spacing={3} container direction="row" justify="flex-start" alignItems="stretch">
      {input?.map(i => (
        <Grid item xs={12} lg={4} sm={6} key={i?.metricName}>
          <Measurements metricName={i?.metricName!} key={i?.metricName} />
        </Grid>
      ))}
    </Grid>
  );
};

export default LastKnownMeasurement;
