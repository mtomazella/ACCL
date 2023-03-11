import { useEffect, useState } from 'react'

import { Event, listen } from '@tauri-apps/api/event'

export type MetricsField =
  | 'temperature'
  | 'tension'
  | 'actual_current'
  | 'target_current'
  | 'fan_percentage'
  | 'power'

export type MetricsFieldData = {
  key: MetricsField
  label: string
  value: string
  unit: string
}

export type Metrics = Record<MetricsField, MetricsFieldData>

export type RawMetrics = Record<MetricsField, number>

const formatRawMetrics = (rawMetrics: RawMetrics | undefined): Metrics => {
  if (!rawMetrics) rawMetrics = {} as RawMetrics

  return {
    actual_current: {
      key: 'actual_current',
      label: 'Corrente',
      unit: 'A',
      value: (rawMetrics.actual_current ?? '?').toString(),
    },
    fan_percentage: {
      key: 'fan_percentage',
      label: 'Ventilação',
      unit: '%',
      value: (rawMetrics.fan_percentage ?? '?').toString(),
    },
    target_current: {
      key: 'target_current',
      label: 'Alvo',
      unit: 'A',
      value: (rawMetrics.target_current ?? '?').toString(),
    },
    temperature: {
      key: 'temperature',
      label: 'Temperatura',
      unit: 'ºC',
      value: (rawMetrics.temperature ?? '?').toString(),
    },
    tension: {
      key: 'tension',
      label: 'Tensão',
      unit: 'V',
      value: (rawMetrics.tension ?? '?').toString(),
    },
    power: {
      key: 'power',
      label: 'Potência',
      unit: 'W',
      value:
        !rawMetrics.actual_current || !rawMetrics.tension
          ? '?'
          : (rawMetrics.actual_current * rawMetrics.tension).toString(),
    },
  }
}

export const useMetrics = () => {
  const [currentMetrics, setCurrentMetrics] = useState<Metrics>(
    formatRawMetrics(undefined),
  )

  // const requestRefresh = () => {
  //   invoke('get_current_metrics').then((data: RawMetrics) =>
  //     setCurrentMetrics(formatRawMetrics(data)),
  //   )
  // }

  useEffect(() => {
    listen('new_metrics', (event: Event<RawMetrics>) =>
      setCurrentMetrics(formatRawMetrics(event.payload)),
    )
  }, [])

  return {
    currentMetrics,
  }
}
