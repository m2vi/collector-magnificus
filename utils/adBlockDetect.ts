const adBlockDetect = async () => {
  let success = true;
  await fetch(
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
    {
      method: "HEAD",
      mode: "no-cors",
    }
  ).catch((err) => {
    success = false;
  });

  return success;
};

export default adBlockDetect;
