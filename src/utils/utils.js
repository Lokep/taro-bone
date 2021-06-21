export const formatTime = (date) => {
  if (!date) return
  date = date.replace("-", "/");
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join("/")} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(":")}`;
}

export const formatDate = (time) => {
  if (!time) return
  time = time.replace("-", "/");
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${[year, month, day].map(formatNumber).join("/")}`;
};

export const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

/**
 * 判断url参数为webview链接还是小程序链接
 * @param {String} url
 */
export const isWebViewUrl = (url) => url.startsWith("http");

export const isCompleteUrl = url => isWebViewUrl(url) || url.startsWith("https")

export const saveCache = (k, v) => wx.setStorageSync(k, v);

export const getCache = (k) => wx.getStorageSync(k);

export const deleteCache = (k) => wx.removeStorageSync(k);

export function validIdcard(idcode) {
  const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const check_code = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
  let code = idcode + "";
  let last = idcode[17]; //最后一位
  var seventeen = code.substring(0, 17);
  let arr = seventeen.split("");
  let len = arr.length;
  let num = 0;
  for (let i = 0; i < len; i++) {
    num = num + arr[i] * weight_factor[i];
  }
  let resisue = num % 11;
  let last_no = check_code[resisue];
  const idcard_patter =
    /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
  let format = idcard_patter.test(idcode);
  return last === last_no && format ? true : false;
}
