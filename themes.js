function toggleTheme() {
    const body = document.body;
    const themeSwitch = document.getElementById('theme-switch');

    body.classList.toggle('dark-mode');
    themeSwitch.checked = body.classList.contains('dark-mode');

    // Save the current theme to local storage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Check local storage for the user's preferred theme
const storedDarkMode = localStorage.getItem('darkMode');
if (storedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
}