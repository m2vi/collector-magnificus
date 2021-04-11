let points = 100;

const removePoints = (number: number) => {
  points = points - number;
  return points - number;
};

const calcPrivacyPoints = (data: any) => {
  if (data.geolocation) {
    removePoints(30);
    console.log(points)
  }

  if (data.ip.success) {
    removePoints(20);
    console.log(points)
  }

  if (data.system.cookieEnabled) {
    removePoints(10);
    console.log(points)
  }

  if (!data.system.doNotTrack) {
    removePoints(20);
    console.log(points)
  }

  if (data.system.adsAllowed) {
    removePoints(50);
    console.log(points)
  }

  return points;
};

export default calcPrivacyPoints;
