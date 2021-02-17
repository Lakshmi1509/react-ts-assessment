import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetLastKnownMeasurementQuery } from '../../generated/graphql';
import { IState } from '../../store';
import { actions } from './reducer';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  },
});

interface MetricCardProps {
  time: number;
  name: string;
  value: number;
}

const MetricCard = (props: MetricCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography color="textSecondary">
          {DateTime.fromISO(new Date(props.time).toISOString()).toLocaleString(DateTime.TIME_SIMPLE)}
        </Typography>
        <Typography variant="h4" component="h4">
          {props.value}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface Props {
  metricName: string;
}

const getLastKnownMeasurement = (state: IState) => {
  const { lastKnownMeasurements } = state.lastKnownMeasurements;
  return { lastKnownMeasurements };
};

const Measurements = (props: Props) => {
  const { lastKnownMeasurements } = useSelector(getLastKnownMeasurement);

  const dispatch = useDispatch();
  const { data, error } = useGetLastKnownMeasurementQuery({
    variables: {
      metricName: props.metricName,
    },
  });

  useEffect(() => {
    if (error) {
      dispatch(actions.lastKnownMeasurementsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getLastKnownMeasurement } = data;
    if (!getLastKnownMeasurement) return;

    dispatch(actions.lastKnownMeasurementsDataReceived({ lastKnownMeasurement: getLastKnownMeasurement }));
  }, [dispatch, data, error]);

  if (!data?.getLastKnownMeasurement) {
    return null;
  }

  return (
    <>
      {lastKnownMeasurements
        .filter(l => l.metric === props.metricName)
        .map(m => (
          <MetricCard name={m.metric} time={m.at} value={m.value} key={m.metric} />
        ))}
    </>
  );
};

export default Measurements;
