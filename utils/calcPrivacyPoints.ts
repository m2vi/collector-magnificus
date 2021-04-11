let points = 100;

const removePoints = (number: number) => {
  points = points - number;
  return points - number;
};

const calcPrivacyPoints = (data: any) => {
  if (data.geolocation) {
    removePoints(30);
  }

  if (data.ip.success) {
    removePoints(20);
  }

  if (data.system.cookieEnabled) {
    removePoints(10);
  }

  if (!data.system.doNotTrack) {
    removePoints(20);
  }

  if (data.system.adsAllowed) {
    removePoints(50);
  }

  if (!data.graphics.videocard.success) {
    removePoints(10);
  }

  return points;
};

export default calcPrivacyPoints;
