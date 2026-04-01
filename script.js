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
    const basePrice = 1390;
    
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

// 5. Обробка відправки форми (додано async)
document.getElementById("form").addEventListener("submit", async function(e) {
    e.preventDefault();

    // Валідація фінального кроку
    if (!validateStep('step3')) return;

    const btn = document.getElementById('submit-btn');
    const originalText = btn.innerText; // Зберігаємо текст, щоб повернути при помилці
    
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
        blog: document.getElementById('blog').value || document.getElementById('blog').checked,
        partners: document.getElementById('partners').checked,
        comments: document.getElementById('comments').value,
        price: document.getElementById('final-price').innerText
    };

    try {
        // Тепер await спрацює, бо функція вище позначена як async
        await fetch("https://script.google.com/macros/s/AKfycbz6DVKgSDnRTlcBGoUkfRsRLBodHrnxFRobpkysRZ6Lce1-fpHaYknBa3YSIUYXncdpmg/exec", {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        setTimeout(() => {
            window.location.href = "https://secure.wayforpay.com/payment/s9a5003fe3c8d";
        }, 300);

    } catch (err) {
        console.error(err);
        
        alert("Ой! Не вдалося автоматично зберегти дані, але ви можете продовжити оплату.");
        
        btn.disabled = false;
        btn.innerText = originalText;

        window.location.href = "https://secure.wayforpay.com/payment/sc1422e1135ab";
    }
});