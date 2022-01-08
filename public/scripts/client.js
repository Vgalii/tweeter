/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  // clear existing tweets
  $("#tweets-container").empty();

  for (let users of tweets) {
    const $tweet = createTweetElement(users);
    
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend($tweet);
  }
  
};
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//returns a tweet element with corresponding HTML structure
const createTweetElement = function(tweetData) {
  const $tweet = $(`<article>
  <header>
    <img src = "${tweetData.user.avatars}">
    <h4>${tweetData.user.name}</h4>
    <div>${tweetData.user.handle}</div>
  </header>
  <p>${escape(tweetData.content.text)}</p>
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

$(document).ready(function() {
  $("form.tweet-form").on("submit", function(event) {
    event.preventDefault();
    $(".error-message").text("");
    const $data = $(this).serialize();
    
    const $message = $("#tweet-text").val();
    console.log($message);
    if ($message === null || $message === "") {
      $(".error-message").text("🛑Your message is too short!🛑").slideDown(400).slideUp(5000);
      return;
    } else if ($message.length > 140) {
      $(".error-message").text("🛑Your message is too long!🛑").slideDown(400).slideUp(5000);
      return;
    }
    
    $.post("/tweets", $data)
      .then(() => {
        $("#tweet-text").val("");
        $(".counter").text("140");
        loadTweets();
      });
  });
  
  function loadTweets() {
    $.get("/tweets")
      .then((data) => {
        renderTweets(data);
      
      });
  }
  loadTweets();
});

