<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>

    <!-- Insert these two lines inside your application index -->
    <link rel="manifest" href="/manifest.json">
    <script src="/register.js"></script>
    <!-- Insert these two lines inside your application index -->

  </head>
  <body>
    PAW demo index
    <form action="/" method="post">
        <input type="text" name="foo" value="bar">
        <input type="submit" value="submit">
    </form>
    <?php var_dump($_POST); ?>
  </body>
</html>
