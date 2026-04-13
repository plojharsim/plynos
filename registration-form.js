const calendar = document.getElementById("calendar");
const calendarTitle = document.getElementById("calendarTitle");
const selectedDateInput = document.getElementById("selectedDate");

let currentDate = new Date();
let selectedDay = null;

function renderCalendar(date) {
    calendar.innerHTML = "";

    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = [
        "leden","únor","březen","duben","květen","červen",
        "červenec","srpen","září","říjen","listopad","prosinec"
    ];

    calendarTitle.textContent = `${monthNames[month]} ${year}`;

    // posun (po = 0)
    let startDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < startDay; i++) {
        const empty = document.createElement("div");
        calendar.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const div = document.createElement("div");
        div.textContent = day;
        div.classList.add("day");

        div.addEventListener("click", () => {
            document.querySelectorAll(".day").forEach(d => d.classList.remove("selected"));
            div.classList.add("selected");

            selectedDay = `${year}-${month + 1}-${day}`;
            selectedDateInput.value = selectedDay;
        });

        calendar.appendChild(div);
    }
}

renderCalendar(currentDate);

// FORM
document.getElementById("reservationForm").addEventListener("submit", function(e) {
    e.preventDefault();

    if (!selectedDay) {
        document.getElementById("responseMessage").textContent = "Vyberte datum!";
        document.getElementById("responseMessage").style.color = "red";
        return;
    }

    const data = {
        date: selectedDay,
        fullname: document.getElementById("fullname").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    const scriptURL = ''; // sem pak dáš backend

    fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams(data)
    })
    .then(() => {
        document.getElementById("responseMessage").textContent = "Objednávka odeslána!";
        document.getElementById("responseMessage").style.color = "white";
        document.getElementById("reservationForm").reset();
    })
    .catch(() => {
        document.getElementById("responseMessage").textContent = "Chyba při odeslání.";
        document.getElementById("responseMessage").style.color = "red";
    });
});
