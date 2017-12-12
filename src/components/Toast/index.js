import Toast from 'react-native-root-toast';

export function showShortCenter(message, duration = Toast.durations.SHORT, position = Toast.positions.CENTER) {
  Toast.show(message, {
    duration,
    position,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
}

export function showLongCenter(message, duration = Toast.durations.LONG, position = Toast.positions.CENTER) {
  Toast.show(message, {
    duration,
    position,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
}
