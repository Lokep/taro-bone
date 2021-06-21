import { axios } from "../utils/request";

// 获取AI推荐
export const getAiCourse = data => axios({
  url: '/ai-recommend/recommend',
  data,
  method: 'post',
  checkToken: false,
  showLoading: false,
  delay: 5000
})