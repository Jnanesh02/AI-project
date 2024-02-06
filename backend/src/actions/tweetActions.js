async function fetchAndReply(client, username, replyText) {
  try {
    const tweets = await client.get("statuses/user_timeline", {
      screen_name: username,
    });
    console.log(username);

    tweets.forEach(async (tweet) => {
      try {
        await client.post("statuses/update", {
          status: replyText,
          in_reply_to_status_id: tweet.id_str,
        });
        console.log(`Replied to tweet ${tweet.id_str}`);
      } catch (error) {
        console.error(`Error replying to tweet ${tweet.id_str}: ${error}`);
      }
    });
  } catch (error) {
    console.error(`Error fetching tweets: ${error.client}`);
    console.error(error.stack);
  }
}

module.exports = fetchAndReply;
