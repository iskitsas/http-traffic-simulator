export default {
  port: 4040,
  host: "localhost",
  dbUri: "mongodb://localhost:27017/rest-api",
  saltWorkFactor: 10,
  accessTokenTtl:"15m",
  refreshTokenTtl:"1y",
  privateKey:`YOUR_PRIVATE_KEY_HERE`
}