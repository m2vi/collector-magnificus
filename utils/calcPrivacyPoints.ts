let points = 100;

const removePoints = (number: number) => {
  points = points - number;
  return points - number;
};

const calcPrivacyPoints = (data: any) => {
  if (data.geolocation) {
    removePoints(30);
  }

  if (data.ip.success === true) {
    removePoints(20);
  }

  if (data.system.cookieEnabled === true) {
    removePoints(10);
  }

  if (data.system.doNotTrack === false) {
    removePoints(20);
  }

  if (data.system.adsAllowed === true) {
    removePoints(50);
  }

  if (data.graphics.videocard.success === true) {
    removePoints(10);
  }

  return points;
};

export default calcPrivacyPoints;
