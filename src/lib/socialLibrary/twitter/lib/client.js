import Twitter from 'twitter'

export default ({
  auth,
}) => {
  const {
    consumerKey,
    consumerSecret,
    accessTokenKey,
    accessTokenSecret
  } = auth
  return new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret
  })
}
