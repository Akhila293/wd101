document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registration-form");
  const tableBody = document.getElementById("user-table-body");

  // Load saved data from web storage
  const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
  savedUsers.forEach(user => {
    addUserToTable(user);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const terms = document.getElementById("terms").checked;

    // Calculate age based on the entered date of birth
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();

    // Display alert if age is below 18 or above 55
    if (age < 18 || age > 55) {
      alert("Age must be between 18 and 55.");
      return;
    }

    // Save data to web storage
    const userData = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      terms: terms,
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    // Add user data to the table
    addUserToTable(userData);

    // Clear form fields
    form.reset();
  });

  // Function to add user data to the table
  function addUserToTable(user) {
    const newRow = tableBody.insertRow();
    newRow.insertCell().textContent = user.name;
    newRow.insertCell().textContent = user.email;
    newRow.insertCell().textContent = user.password;
    newRow.insertCell().textContent = user.dob;
    newRow.insertCell().textContent = user.terms ? "Accepted" : "Not Accepted";
  }
});
