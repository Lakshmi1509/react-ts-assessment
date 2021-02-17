import LinearProgress from '@material-ui/core/LinearProgress';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { Brush, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useGetMultipleMeasurementsQuery } from '../../generated/graphql';
import { IState } from '../../store';
import { actions } from './reducer';

const getMultipleMeasurements = (state: IState) => {
  const { chartData, xy } = state.multipleMeasurements;
  return {
    chartData,
    xy,
  };
};
const getSelectedValue = (state: IState) => {
  const { input } = state.metrics;
  return {
    input,
  };
};

const Chart = () => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const { chartData, xy } = useSelector(getMultipleMeasurements);
  const { input } = useSelector(getSelectedValue);

  const { data: MData, error, loading } = useGetMultipleMeasurementsQuery({
    variables: {
      input: input,
    },
  });

  useEffect(() => {
    if (error) {
      dispatch(actions.multipleMeasurementsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!MData) return;
    const { getMultipleMeasurements } = MData;
    if (!getMultipleMeasurements) return;

    dispatch(actions.multipleMeasurementsDataReceived({ multipleMeasurements: getMultipleMeasurements as any }));
  }, [dispatch, MData, error]);

  if (loading && input?.length !== 0) return <LinearProgress style={{ margin: '10px 0' }} />;

  const color = ['#F16745', '#7BC8A4', '#FFC65D', '#4CC3D9', '#d85085', '#374c80'];

  return (
    <>
      {input?.length === 0 ? (
        ''
      ) : (
        <LineChart
          width={width && width > 1024 ? 1200 : width - 80}
          height={500}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          {xy?.map((line: any) => (
            <YAxis
              key={line?.metric + new Date()}
              yAxisId={line?.unit}
              stroke="#374c80"
              label={{ value: `${line?.unit}`, angle: -90, position: 'insideLeft', offset: 15 }}
            />
          ))}
          <Tooltip />
          <Brush dataKey="name" height={40} stroke="#374c80" />
          {xy?.map((line: any, i: any) => (
            <Line key={line?.metric} yAxisId={line?.unit} dataKey={line?.metric} dot={false} stroke={color[i]} />
          ))}
        </LineChart>
      )}
    </>
  );
};

export default Chart;
