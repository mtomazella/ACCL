import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faBattery,
  faBolt,
  faCrosshairs,
  faFan,
  faPlug,
  faTemperature3,
  faWaveSquare,
} from '@fortawesome/free-solid-svg-icons'
import { MetricsField, MetricsFieldData } from 'src/hooks'

export const formatMeasurements = currentMetrics => {
  const infoToAddAndOrder: Record<MetricsField, object> = {
    tension: {
      icon: faBolt,
    },
    actual_current: {
      icon: faBattery,
    },
    target_current: {
      icon: faCrosshairs,
    },
    power: {
      icon: faPlug,
    },
    temperature: {
      icon: faTemperature3,
    },
    fan_percentage: {
      icon: faFan,
    },
    duty_cycle: {
      icon: faWaveSquare,
    },
  }
  const result = {}
  Object.keys(infoToAddAndOrder).forEach(field => {
    if (!currentMetrics[field]) return
    result[field] = { ...currentMetrics[field], ...infoToAddAndOrder[field] }
  })
  return Object.values(result) as (MetricsFieldData & { icon: IconProp })[]
}
