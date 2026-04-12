function toggleMenu() {
    const menu = document.getElementById('nav-list');
    menu.classList.toggle('show');
}
document.getElementById("year").textContent = new Date().getFullYear();
