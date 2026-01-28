// Fake database
window.db = {
    accounts: [
        {
            firstName: "Juan",
            lastName: "Dela Cruz",
            email: "juan@email.com",
            role: "Student",
            password: "123456"
        }
    ]
};

function saveToStorage() {
    localStorage.setItem("accounts", JSON.stringify(window.db.accounts));
}

function loadFromStorage() {
    const data = localStorage.getItem("accounts");
    if (data) {
        window.db.accounts = JSON.parse(data);
    }
}

function renderProfile() {
    const user = window.db.accounts[0];

    document.getElementById("profileName").textContent =
        user.firstName + " " + user.lastName;
    document.getElementById("profileEmail").textContent = user.email;
    document.getElementById("profileRole").textContent = user.role;
}

// Load data
loadFromStorage();
renderProfile();

const editBtn = document.getElementById("editBtn");
const editForm = document.getElementById("editForm");
const errorMsg = document.getElementById("errorMsg");

editBtn.addEventListener("click", () => {
    const user = window.db.accounts[0];

    document.getElementById("firstName").value = user.firstName;
    document.getElementById("lastName").value = user.lastName;
    document.getElementById("password").value = "";

    editForm.classList.remove("d-none");
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const password = document.getElementById("password").value;

    if (firstName.length < 2 || lastName.length < 2) {
        errorMsg.textContent =
            "First and Last names must be at least 2 characters.";
        return;
    }

    if (password && password.length < 6) {
        errorMsg.textContent =
            "Password must be at least 6 characters.";
        return;
    }

    const user = window.db.accounts[0];
    user.firstName = firstName;
    user.lastName = lastName;

    if (password) {
        user.password = password;
    }

    saveToStorage();
    renderProfile();

    editForm.classList.add("d-none");
    errorMsg.textContent = "";

    alert("Profile updated successfully!");
});
