# YurchikPro.github.io
<!DOCTYPE html>
<html lang="uk">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Реєстрація на конференцію</title>

<link rel="stylesheet" href="style.css">

</head>

<body>

<div class="container">

<h2>Реєстрація</h2>

<form id="form">

<input type="text" placeholder="Ім'я" required>
<input type="email" id="email" name="email" placeholder="Email" required>
<input type="tel" id="phone" name="phone" placeholder="Телефон" required>

<select id="category">

<option value="800">Студент — 800 грн</option>
<option value="1000">Інтерн — 1000 грн</option>
<option value="1500">Лікар — 1500 грн</option>

</select>

<button type="submit">Зареєструватись і оплатити</button>

</form>

</div>

<script src="script.js"></script>

</body>
</html>
