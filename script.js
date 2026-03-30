// 1. Функція валідації
function validateStep(stepId) {
    const step = document.getElementById(stepId);
    // Шукаємо всі обов'язкові інпути та селекти
    const inputs = step.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value || input.value.trim() === "") {
            isValid = false;
            input.classList.add('error-field');
        } else {
            input.classList.remove('error-field');
        }
    });

    if (!isValid) {
        alert("Будь ласка, заповніть усі обов'язкові поля.");
    }
    return isValid;
}

// 2. Навігація між кроками
function firstStep() {
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';
    document.getElementById('progress').style.width = '33%';
}

function secondStep() {
    if (validateStep('step1')) {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
        document.getElementById('step3').style.display = 'none';
        document.getElementById('progress').style.width = '66%';
        window.scrollTo(0, 0);
    }
}

function thirdStep() {
    if (validateStep('step2')) {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'block';
        document.getElementById('progress').style.width = '100%';
        window.scrollTo(0, 0);
    }
}

// 3. Розрахунок ціни
function updatePrice() {
    const spec = document.getElementById('specialization');
    if (!spec) return;
    
    const selectedOption = spec.options[spec.selectedIndex];
    const basePrice = 1000;
    
    const club = document.getElementById('club_member').value;
    let discount = 0;
    if (club === 'pediatric') discount = 0; 
    if (club === 'family') discount = 0;    
    
    const finalPrice = Math.max(0, basePrice - discount);
    document.getElementById('final-price').innerText = finalPrice;
}

// 4. Реєстрація подій (після завантаження сторінки)
document.getElementById('specialization').addEventListener('change', updatePrice);
document.getElementById('club_member').addEventListener('change', updatePrice);

// 5. Обробка відправки форми
document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Валідація фінального кроку
    if (!validateStep('step3')) return;

    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.innerText = "Зберігаємо...";

    // Збираємо дані
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
        // Отримуємо значення блогу (select або checkbox)
        blog: document.getElementById('blog').value || document.getElementById('blog').checked,
        partners: document.getElementById('partners').checked,
        comments: document.getElementById('comments').value,
        price: document.getElementById('final-price').innerText
    };

    fetch("https://script.google.com/macros/s/AKfycbz6DVKgSDnRTlcBGoUkfRsRLBodHrnxFRobpkysRZ6Lce1-fpHaYknBa3YSIUYXncdpmg/exec", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(() => {
        // Перехід на оплату
        window.location.href = "https://secure.wayforpay.com/payment/sc1422e1135ab";
    }).catch(err => {
        console.error(err);
        alert("Сталася помилка відправки даних.");
        btn.disabled = false;
        btn.innerText = "Зареєструватись і оплатити";
    });
});