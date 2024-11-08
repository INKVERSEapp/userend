(function () {
  function end_loader() {
    $('.loader').fadeOut(800); // Fades out the loader over 800ms
  }

  // Ensures the function runs when the window finishes loading all resources
  $(window).on('load', function () {
    setTimeout(function () {
      end_loader(); // Delays the end_loader function by 3 seconds
    }, 3000); // 3000ms (3 seconds)
  });
})();
