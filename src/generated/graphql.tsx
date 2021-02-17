import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Milliseconds from epoch */
  Timestamp: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Query = {
  __typename?: 'Query';
  heartBeat?: Maybe<Scalars['Timestamp']>;
  getWeatherForLocation?: Maybe<Weather>;
  getMetrics?: Maybe<Array<Maybe<Scalars['String']>>>;
  getLastKnownMeasurement?: Maybe<Measurement>;
  getMeasurements?: Maybe<Array<Maybe<Measurement>>>;
  getMultipleMeasurements?: Maybe<Array<Maybe<MultipleMeasurements>>>;
};


export type QueryGetWeatherForLocationArgs = {
  latLong: WeatherQuery;
};


export type QueryGetLastKnownMeasurementArgs = {
  metricName: Scalars['String'];
};


export type QueryGetMeasurementsArgs = {
  input?: Maybe<MeasurementQuery>;
};


export type QueryGetMultipleMeasurementsArgs = {
  input?: Maybe<Array<Maybe<MeasurementQuery>>>;
};


export type WeatherQuery = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

/** Used in sample, tells the weather at a requested position (lng/lat) */
export type Weather = {
  __typename?: 'Weather';
  description: Scalars['String'];
  locationName: Scalars['String'];
  temperatureinCelsius: Scalars['Float'];
};

/** Basic unit of measurement. The measurement of a metric, at a time, which has a value and a unit */
export type Measurement = {
  __typename?: 'Measurement';
  metric: Scalars['String'];
  at: Scalars['Timestamp'];
  value: Scalars['Float'];
  unit: Scalars['String'];
};

/** How to specify the range you want to receive measurements for */
export type MeasurementQuery = {
  /** Name of metric, like casingPressure */
  metricName: Scalars['String'];
  /** Optional, defaults to system startup time */
  after?: Maybe<Scalars['Timestamp']>;
  /** Optional, defaults to now */
  before?: Maybe<Scalars['Timestamp']>;
};

export type MultipleMeasurements = {
  __typename?: 'MultipleMeasurements';
  metric: Scalars['String'];
  measurements?: Maybe<Array<Maybe<Measurement>>>;
};

/** Invoked whenever a new measurement is received and published. Useful for realtime apps */
export type Subscription = {
  __typename?: 'Subscription';
  newMeasurement?: Maybe<Measurement>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type HeartBeatQueryVariables = Exact<{ [key: string]: never; }>;


export type HeartBeatQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'heartBeat'>
);

export type GetLastKnownMeasurementQueryVariables = Exact<{
  metricName: Scalars['String'];
}>;


export type GetLastKnownMeasurementQuery = (
  { __typename?: 'Query' }
  & { getLastKnownMeasurement?: Maybe<(
    { __typename?: 'Measurement' }
    & Pick<Measurement, 'metric' | 'at' | 'value' | 'unit'>
  )> }
);

export type GetMeasurementsQueryVariables = Exact<{
  input?: Maybe<MeasurementQuery>;
}>;


export type GetMeasurementsQuery = (
  { __typename?: 'Query' }
  & { getMeasurements?: Maybe<Array<Maybe<(
    { __typename?: 'Measurement' }
    & Pick<Measurement, 'metric' | 'at' | 'value' | 'unit'>
  )>>> }
);

export type GetMetricsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMetricsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getMetrics'>
);

export type GetMultipleMeasurementsQueryVariables = Exact<{
  input?: Maybe<Array<Maybe<MeasurementQuery>> | Maybe<MeasurementQuery>>;
}>;


export type GetMultipleMeasurementsQuery = (
  { __typename?: 'Query' }
  & { getMultipleMeasurements?: Maybe<Array<Maybe<(
    { __typename?: 'MultipleMeasurements' }
    & Pick<MultipleMeasurements, 'metric'>
    & { measurements?: Maybe<Array<Maybe<(
      { __typename?: 'Measurement' }
      & Pick<Measurement, 'metric' | 'at' | 'value' | 'unit'>
    )>>> }
  )>>> }
);

export type GetWeatherForLocationQueryVariables = Exact<{
  latLong: WeatherQuery;
}>;


export type GetWeatherForLocationQuery = (
  { __typename?: 'Query' }
  & { getWeatherForLocation?: Maybe<(
    { __typename?: 'Weather' }
    & Pick<Weather, 'description' | 'locationName' | 'temperatureinCelsius'>
  )> }
);

export type NewMeasurementSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMeasurementSubscription = (
  { __typename?: 'Subscription' }
  & { newMeasurement?: Maybe<(
    { __typename?: 'Measurement' }
    & Pick<Measurement, 'metric' | 'at' | 'value' | 'unit'>
  )> }
);


export const HeartBeatDocument = gql`
    query HeartBeat {
  heartBeat
}
    `;

/**
 * __useHeartBeatQuery__
 *
 * To run a query within a React component, call `useHeartBeatQuery` and pass it any options that fit your needs.
 * When your component renders, `useHeartBeatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHeartBeatQuery({
 *   variables: {
 *   },
 * });
 */
export function useHeartBeatQuery(baseOptions?: Apollo.QueryHookOptions<HeartBeatQuery, HeartBeatQueryVariables>) {
        return Apollo.useQuery<HeartBeatQuery, HeartBeatQueryVariables>(HeartBeatDocument, baseOptions);
      }
export function useHeartBeatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HeartBeatQuery, HeartBeatQueryVariables>) {
          return Apollo.useLazyQuery<HeartBeatQuery, HeartBeatQueryVariables>(HeartBeatDocument, baseOptions);
        }
export type HeartBeatQueryHookResult = ReturnType<typeof useHeartBeatQuery>;
export type HeartBeatLazyQueryHookResult = ReturnType<typeof useHeartBeatLazyQuery>;
export type HeartBeatQueryResult = Apollo.QueryResult<HeartBeatQuery, HeartBeatQueryVariables>;
export const GetLastKnownMeasurementDocument = gql`
    query GetLastKnownMeasurement($metricName: String!) {
  getLastKnownMeasurement(metricName: $metricName) {
    metric
    at
    value
    unit
  }
}
    `;

/**
 * __useGetLastKnownMeasurementQuery__
 *
 * To run a query within a React component, call `useGetLastKnownMeasurementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastKnownMeasurementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastKnownMeasurementQuery({
 *   variables: {
 *      metricName: // value for 'metricName'
 *   },
 * });
 */
export function useGetLastKnownMeasurementQuery(baseOptions: Apollo.QueryHookOptions<GetLastKnownMeasurementQuery, GetLastKnownMeasurementQueryVariables>) {
        return Apollo.useQuery<GetLastKnownMeasurementQuery, GetLastKnownMeasurementQueryVariables>(GetLastKnownMeasurementDocument, baseOptions);
      }
export function useGetLastKnownMeasurementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLastKnownMeasurementQuery, GetLastKnownMeasurementQueryVariables>) {
          return Apollo.useLazyQuery<GetLastKnownMeasurementQuery, GetLastKnownMeasurementQueryVariables>(GetLastKnownMeasurementDocument, baseOptions);
        }
export type GetLastKnownMeasurementQueryHookResult = ReturnType<typeof useGetLastKnownMeasurementQuery>;
export type GetLastKnownMeasurementLazyQueryHookResult = ReturnType<typeof useGetLastKnownMeasurementLazyQuery>;
export type GetLastKnownMeasurementQueryResult = Apollo.QueryResult<GetLastKnownMeasurementQuery, GetLastKnownMeasurementQueryVariables>;
export const GetMeasurementsDocument = gql`
    query GetMeasurements($input: MeasurementQuery) {
  getMeasurements(input: $input) {
    metric
    at
    value
    unit
  }
}
    `;

/**
 * __useGetMeasurementsQuery__
 *
 * To run a query within a React component, call `useGetMeasurementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeasurementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeasurementsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMeasurementsQuery(baseOptions?: Apollo.QueryHookOptions<GetMeasurementsQuery, GetMeasurementsQueryVariables>) {
        return Apollo.useQuery<GetMeasurementsQuery, GetMeasurementsQueryVariables>(GetMeasurementsDocument, baseOptions);
      }
export function useGetMeasurementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeasurementsQuery, GetMeasurementsQueryVariables>) {
          return Apollo.useLazyQuery<GetMeasurementsQuery, GetMeasurementsQueryVariables>(GetMeasurementsDocument, baseOptions);
        }
export type GetMeasurementsQueryHookResult = ReturnType<typeof useGetMeasurementsQuery>;
export type GetMeasurementsLazyQueryHookResult = ReturnType<typeof useGetMeasurementsLazyQuery>;
export type GetMeasurementsQueryResult = Apollo.QueryResult<GetMeasurementsQuery, GetMeasurementsQueryVariables>;
export const GetMetricsDocument = gql`
    query GetMetrics {
  getMetrics
}
    `;

/**
 * __useGetMetricsQuery__
 *
 * To run a query within a React component, call `useGetMetricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMetricsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMetricsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMetricsQuery(baseOptions?: Apollo.QueryHookOptions<GetMetricsQuery, GetMetricsQueryVariables>) {
        return Apollo.useQuery<GetMetricsQuery, GetMetricsQueryVariables>(GetMetricsDocument, baseOptions);
      }
export function useGetMetricsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMetricsQuery, GetMetricsQueryVariables>) {
          return Apollo.useLazyQuery<GetMetricsQuery, GetMetricsQueryVariables>(GetMetricsDocument, baseOptions);
        }
export type GetMetricsQueryHookResult = ReturnType<typeof useGetMetricsQuery>;
export type GetMetricsLazyQueryHookResult = ReturnType<typeof useGetMetricsLazyQuery>;
export type GetMetricsQueryResult = Apollo.QueryResult<GetMetricsQuery, GetMetricsQueryVariables>;
export const GetMultipleMeasurementsDocument = gql`
    query GetMultipleMeasurements($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      metric
      at
      value
      unit
    }
  }
}
    `;

/**
 * __useGetMultipleMeasurementsQuery__
 *
 * To run a query within a React component, call `useGetMultipleMeasurementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMultipleMeasurementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMultipleMeasurementsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMultipleMeasurementsQuery(baseOptions?: Apollo.QueryHookOptions<GetMultipleMeasurementsQuery, GetMultipleMeasurementsQueryVariables>) {
        return Apollo.useQuery<GetMultipleMeasurementsQuery, GetMultipleMeasurementsQueryVariables>(GetMultipleMeasurementsDocument, baseOptions);
      }
export function useGetMultipleMeasurementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMultipleMeasurementsQuery, GetMultipleMeasurementsQueryVariables>) {
          return Apollo.useLazyQuery<GetMultipleMeasurementsQuery, GetMultipleMeasurementsQueryVariables>(GetMultipleMeasurementsDocument, baseOptions);
        }
export type GetMultipleMeasurementsQueryHookResult = ReturnType<typeof useGetMultipleMeasurementsQuery>;
export type GetMultipleMeasurementsLazyQueryHookResult = ReturnType<typeof useGetMultipleMeasurementsLazyQuery>;
export type GetMultipleMeasurementsQueryResult = Apollo.QueryResult<GetMultipleMeasurementsQuery, GetMultipleMeasurementsQueryVariables>;
export const GetWeatherForLocationDocument = gql`
    query GetWeatherForLocation($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    description
    locationName
    temperatureinCelsius
  }
}
    `;

/**
 * __useGetWeatherForLocationQuery__
 *
 * To run a query within a React component, call `useGetWeatherForLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWeatherForLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWeatherForLocationQuery({
 *   variables: {
 *      latLong: // value for 'latLong'
 *   },
 * });
 */
export function useGetWeatherForLocationQuery(baseOptions: Apollo.QueryHookOptions<GetWeatherForLocationQuery, GetWeatherForLocationQueryVariables>) {
        return Apollo.useQuery<GetWeatherForLocationQuery, GetWeatherForLocationQueryVariables>(GetWeatherForLocationDocument, baseOptions);
      }
export function useGetWeatherForLocationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWeatherForLocationQuery, GetWeatherForLocationQueryVariables>) {
          return Apollo.useLazyQuery<GetWeatherForLocationQuery, GetWeatherForLocationQueryVariables>(GetWeatherForLocationDocument, baseOptions);
        }
export type GetWeatherForLocationQueryHookResult = ReturnType<typeof useGetWeatherForLocationQuery>;
export type GetWeatherForLocationLazyQueryHookResult = ReturnType<typeof useGetWeatherForLocationLazyQuery>;
export type GetWeatherForLocationQueryResult = Apollo.QueryResult<GetWeatherForLocationQuery, GetWeatherForLocationQueryVariables>;
export const NewMeasurementDocument = gql`
    subscription NewMeasurement {
  newMeasurement {
    metric
    at
    value
    unit
  }
}
    `;

/**
 * __useNewMeasurementSubscription__
 *
 * To run a query within a React component, call `useNewMeasurementSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMeasurementSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMeasurementSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewMeasurementSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMeasurementSubscription, NewMeasurementSubscriptionVariables>) {
        return Apollo.useSubscription<NewMeasurementSubscription, NewMeasurementSubscriptionVariables>(NewMeasurementDocument, baseOptions);
      }
export type NewMeasurementSubscriptionHookResult = ReturnType<typeof useNewMeasurementSubscription>;
export type NewMeasurementSubscriptionResult = Apollo.SubscriptionResult<NewMeasurementSubscription>;