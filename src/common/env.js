const env = process.env;

let baseUrl = "";

if (env.NODE_ENV == "development") {
  baseUrl = 'http://127.0.0.1:5030/'; // 开发环境地址
} else if (env.NODE_ENV == "production") {
  baseUrl = 'http://127.0.0.1:5030/webapp/'; // 生产环境地址
} else if (env.NODE_ENV == "test") {
  baseUrl = ''; // 测试环境地址
}

export {
  baseUrl,
  env,
};
