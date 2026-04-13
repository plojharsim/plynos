document.getElementById("reservationForm").addEventListener("submit", function(e) {
    e.preventDefault();
    if (this.brand.value === "Značka nebyla vybrána") {
        document.getElementById("responseMessage").textContent = "Vyberte značku kotle!";
        document.getElementById("responseMessage").style.color = "red";
        return false;
    }
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const brand = document.getElementById("brand").value;
    const time = document.getElementById("time").value;
    const message = document.getElementById("message").value;
    const formData = {
        fullname: fullname,
        email: email,
        phone: phone,
        brand: brand,
        time: time,
        message: message
    };
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxVopxS5hQpjtoHvubiKmzEwRQ5zOGHRLPQRREghyIYhpg1sN5AW6YDXGoJTA1ekM_O/exec';  // Nahraďte vaší vlastní URL
    fetch(scriptURL, {
        method: 'POST',
        body: new URLSearchParams(formData),
    })
    .then(response => response.text())
    .then(result => {
        document.getElementById("responseMessage").textContent = "Formulář byl úspěšně odeslán!";
        document.getElementById("responseMessage").style.color = "white";
        document.getElementById("reservationForm").reset();
    })
    .catch(error => {
        document.getElementById("responseMessage").textContent = "Chyba při odesílání formuláře. Zkuste to znovu.";
        document.getElementById("responseMessage").style.color = "red";
        console.error("Error:", error);
    });
});
