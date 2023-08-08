document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");
    const table = document.getElementById("user-table").getElementsByTagName("tbody")[0];
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const dob = document.getElementById("dob").value;
      const terms = document.getElementById("terms").checked;
  
      // Date of Birth validation
      const birthDate = new Date(dob);
      const currentDate = new Date();
      const minDate = new Date(currentDate);
      minDate.setFullYear(minDate.getFullYear() - 55);
      const maxDate = new Date(currentDate);
      maxDate.setFullYear(maxDate.getFullYear() - 18);
  
      if (birthDate < minDate || birthDate > maxDate) {
        alert("Date of Birth must be between 18 and 55 years ago.");
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
  
      // Clear form fields
      form.reset();
  
      // Update table
      const newRow = table.insertRow();
      newRow.insertCell().textContent = name;
      newRow.insertCell().textContent = email;
      newRow.insertCell().textContent = password;
      newRow.insertCell().textContent = dob;
      newRow.insertCell().textContent = terms ? "Accepted" : "Not Accepted";
    });
  
    // Load saved data from web storage
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    savedUsers.forEach(user => {
      const newRow = table.insertRow();
      newRow.insertCell().textContent = user.name;
      newRow.insertCell().textContent = user.email;
      newRow.insertCell().textContent = user.password;
      newRow.insertCell().textContent = user.dob;
      newRow.insertCell().textContent = user.terms ? "Accepted" : "Not Accepted";
    });
  });
  