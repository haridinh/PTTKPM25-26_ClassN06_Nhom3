const loginBgElement = document.getElementById("login-bg");
document.body.style.backgroundImage = `url(${loginBgElement.getAttribute(
    "data-backgroundimage"
)})`;


document.querySelectorAll('.password-toggle-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const targetId = icon.getAttribute('data-target') ?? "password";
        const input = document.getElementById(targetId);

        if (input.type === 'password') {
            input.type = 'text';
            icon.querySelector('i').classList.remove('fa-eye');
            icon.querySelector('i').classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.querySelector('i').classList.remove('fa-eye-slash');
            icon.querySelector('i').classList.add('fa-eye');
        }
    });
});
