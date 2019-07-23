<?php
if($_POST["formsubmit"]) {
  $recipient="phil@giammattei.co";
  $subject="Contact Form: giammattei.co";
  $sender=$_POST["name"];
  $senderEmail=$_POST["email"];
  $message=$_POST["message"];

  $mailBody="Name: $sender\nEmail: $senderEmail\n\n$message";

    mail($recipient,$subject,$mailBody,"From: $sender<$senderEmail>");

    $thankYou="<p>
    Thank you!  Your message has been sent.
    </p>";
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>Contact - Phil Giammattei</title>
  <meta name="description" content="How to get in touch with Phil Giammattei">

  <link rel="stylesheet" href="css/styles.css">

  <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
  <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
  <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
  <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
  <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
  <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
  <link href="https://fonts.googleapis.com/css?family=Muli|Play|Rubik|Signika&display=swap" rel="stylesheet">

</head>

<body>
<header>
  <div class="header-container">
    <div class="profile-img">
      <a href="index.html"><img  src="images/profile.png" alt="Phil Giammattei" />
    </div>
    <h1 class="profile-header">Phil Giammattei</h1></a>
    <a href="javascript: void(0);" class="icon hamburger" onclick="menuToggle()">
      <img src="images/hamburger-cream.svg" class="hamburger"alt="hamburger menu icon">
  </a>
  </div>

  <div class="socialbuttons">

    <a href="https://www.linkedin.com/in/philgiammattei/">
      <img src="images/linkedin-logo.png" alt="linkedin: Phil Giammattei">
    </a>
    <a href="https://github.com/philgiammattei">
      <img src="images/github-logo.png" alt="Github: philgiammattei">
    </a>
    <a href="https://twitter.com/philgiammattei">
      <img src="images/twitter-logo.png" alt="twitter @philgiammattei">
    </a>
  </div>

  </header>
  <nav id="nav">
    <ul class="main-nav">
      <li><a href="index.html">HOME</a></li>
      <li><a href="about.html">ABOUT</a></li>
      <li><a href="projects.html">PROJECTS</a></li>
      <li><a href="blog.html">BLOG</a></li>
      <li><a href="Contact.html">CONTACT</a></li>
    </ul>
  </nav>

<!--content goes here!-->

<h3>If you're interested in hiring me, or collaborating on a project, I would love to hear from you!  Please fill out the form below, or you can contact me directly:</h3>
<h4><a href="mailto:phil@giammattei.co">phil@giammattei.co</a></h4>
<h4>412 459 8483</h4>

<hr>
<?=$thankYou ?>
<form method="post" action="contact.php">
  <label for="name"> Name: </label>
  <input type="text" name="name"/>
  <label for="email">Email: </label>
  <input type="text" name="email"/>
  <label for="phone">Phone Number (Optional)</label>
  <input type="text" name="phone"/>
  <label for="message">Your Message: </label>
  <textarea name="message"></textarea>
  <button type="button" name="formsubmit"><h6>Send</h6></button>

</form>





<!--content ends here!-->


  <footer>
  <a href="https://www.linkedin.com/in/philgiammattei/">
    <img src="images/linkedin-logo.png" alt="linkedin: Phil Giammattei">
  </a>
  <a href="https://github.com/philgiammattei">
    <img src="images/github-logo.png" alt="Github: philgiammattei">
  </a>
  <a href="https://twitter.com/philgiammattei">
    <img src="images/twitter-logo.png" alt="twitter @philgiammattei">
  </a>
  </footer>
<script type="text/javascript">
  function menuToggle() {
    var menu = document.getElementById("nav");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }
</script>
</body>

</html>
