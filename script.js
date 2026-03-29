function firstStep() {
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';
    document.getElementById('progress').style.width = '33%';
}

function secondStep() {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    document.getElementById('step3').style.display = 'none';
    document.getElementById('progress').style.width = '66%';
}

function thirdStep() {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
    document.getElementById('progress').style.width = '100%';
}


    



document.getElementById('specialization').addEventListener('change', updatePrice);
document.getElementById('club_member').addEventListener('change', updatePrice);

document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.innerText = "Зберігаємо...";

    const data = {
        fullname: document.getElementById('fullname').value,
        phone: document.getElementById('phone').value,
        telegram: document.getElementById('telegram').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value,
        spec: document.getElementById('specialization').value,
        city: document.getElementById('city').value,
        source: document.getElementById('source').value,
        club: document.getElementById('club_member').value,
        blog: document.getElementById('blog').checked,
        partners: document.getElementById('partners').checked,
        comments: document.getElementById('comments').value,
        price: document.getElementById('final-price').innerText
    };

    // Відправка в Google Sheets

fetch("https://script.google.com/macros/s/AKfycbz6DVKgSDnRTlcBGoUkfRsRLBodHrnxFRobpkysRZ6Lce1-fpHaYknBa3YSIUYXncdpmg/exec", {
    method: "POST",
    mode: "no-cors", // Додаємо цей рядок
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json"
    }
}).then(() => {
    // Тепер перехід відбудеться швидше
    window.location.href = "https://secure.wayforpay.com/payment/sc1422e1135ab";
}).catch(err => {
    console.log(err);
    alert("Сталася помилка, але ви можете оплатити!");
    window.location.href = "https://secure.wayforpay.com/button/b1ad7b3132f11";
});
});
