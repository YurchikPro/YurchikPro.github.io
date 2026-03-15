function nextStep() {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    document.getElementById('progress').style.width = '100%';
}

function prevStep() {
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('progress').style.width = '50%';
}

// Розрахунок ціни
function updatePrice() {
    let spec = document.getElementById('specialization');
    let basePrice = parseInt(spec.options[spec.selectedIndex]?.dataset.price || 0);
    let club = document.getElementById('club_member').value;
    
    let discount = 0;
    if (club === 'pediatric') discount = 200; // Наприклад, 200 грн
    if (club === 'family') discount = 150;    // Або інша сума
    
    document.getElementById('final-price').innerText = Math.max(0, basePrice - discount);
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

fetch("https://script.google.com/macros/s/AKfycbx2_2yAZCe2kGgRpVTqfZ1yVW-yk3zMNSHrRSHw6_AORbARKbL2bsrc6jNgwwvwFE4dXw/exec", {
    method: "POST",
    mode: "no-cors", // Додаємо цей рядок
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json"
    }
}).then(() => {
    // Тепер перехід відбудеться швидше
    window.location.href = "https://secure.wayforpay.com/button/b1ad7b3132f11?&clientEmail=" + data.email;
}).catch(err => {
    console.log(err);
    alert("Сталася помилка, але ви можете оплатити!");
    window.location.href = "https://secure.wayforpay.com/button/b1ad7b3132f11?&clientEmail=" + data.email;
});
});
