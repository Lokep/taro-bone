export const proxyTable = {
  '/paas-web': {
    develop: "https://www.lanniuh.com/api",
    trial: "https://www.lanniuh.com/api",
    release: "https://www.lanniuh.com/api"
  },
  '/web-bin': {
    develop: "https://www.lanniuh.com",
    trial: "https://www.lanniuh.com",
    release: "https://www.lanniuh.com"
  },
  '/ai-recommend': {
    // develop: "http://192.168.3.68:2002",
    develop: "https://www.lanniuh.com/api",
    trial: "https://www.lanniuh.com/api",
    release: "https://www.lanniuh.com/api"
  },
  '/celina-knowledge': {
    // develop: "http://192.168.3.68:2002",
    develop: "https://www.lanniuh.com/api",
    trial: "https://www.lanniuh.com/api",
    release: "https://www.lanniuh.com/api"
  },
  '*': {
    develop: "https://test.joinhealth.cn/api/v2",
    // develop: "https://www.lanniuh.com/api/v2",
    trial: "https://www.lanniuh.com/api/v2",
    release: "https://www.lanniuh.com/api/v2"
  }
}
