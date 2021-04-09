export default function timeSiteIsOpened() {
  const timeNow = performance.now();

  return {
    milliseconds: timeNow.toFixed(0),
    seconds: (timeNow / 1000).toFixed(2),
    minutes: (timeNow / (1000 * 60)).toFixed(2),
    hours: (timeNow / (1000 * 60 * 60)).toFixed(2),
  };
}
