const feshiLocation = (successFn, failFn) => {
  window.h5sdk.device.geolocation.get({
    useCache: true,
    onSuccess: function (locationData) {
      successFn && successFn(locationData);
    },
    onFail: function (errorMsg) {
      failFn && failFn(errorMsg);
    },
  });
};

const feishuShare = (title, desc, link, imgUrl) => {
  window.h5sdk.biz.util.share({
    url: link || "",
    title: title || "",
    image: imgUrl || "",
    content: desc || "",
    onSuccess: function (result) {
      console.log(result);
    },
    onFail: function (result) {
      console.log(result);
    },
  });
};

export { feshiLocation, feishuShare };
