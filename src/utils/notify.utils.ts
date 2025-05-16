import { Notify } from 'quasar';
import type { QNotifyPosition } from "src/models/notify.models";

export function errorQuasarNotify(
  message: string,
  icon = 'error',
  position: QNotifyPosition = 'top'
): void {
  Notify.create({
    message,
    color: 'negative',
    icon,
    position
  });
}

export function successQuasarNotify(
  message: string,
  icon = 'check_circle',
  position: QNotifyPosition = 'top'
): void {
  Notify.create({
    message,
    color: 'positive',
    icon,
    position
  })
}
