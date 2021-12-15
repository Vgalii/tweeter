/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]
const renderTweets = function(tweets) {
  // loops through tweets
  for (let users of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(users);
    
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend($tweet);
  }
  
}

//returns a tweet element with corresponding HTML structure
const createTweetElement = function(tweetData){
  const $tweet = $(`<article>
  <header>
    <img src = "${tweetData.user.avatars}">
    <h4>${tweetData.user.name}</h4>
    <div>${tweetData.user.handle}</div>
  </header>
  <p>${tweetData.content.text}</p>
  <footer>
    <h6>${timeago.format(tweetData.created_at)}</h6>
    <div class="icons">
      <div><i class="far fa-flag"></i></div>
      <div><i class="fas fa-retweet"></i></div>
      <div><i class="fas fa-heart"></i></div>
    </div>
  </footer>
</article>`);
return $tweet;
}

$(document).ready(function(){
  $("form.tweet-form").on("submit", function(event) {
    event.preventDefault();
    const $data = $(this).serialize();
    console.log($data);
    $.post("/tweets", $data)
      .then(() => {
        console.log("this is a message")
      })
  })
  
  function loadTweets(){
    $.get("/tweets")
    .then((data) => {
      renderTweets(data);
      
    })
  }
  loadTweets();
})

