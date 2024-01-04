function toggleForm() {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const toggleFormText = document.getElementById('toggleFormText');
  
    if (signUpForm.style.display === 'none') {
      signUpForm.style.display = 'block';
      signInForm.style.display = 'none';
      toggleFormText.innerHTML = "Already have an account? <a href='#' onclick='toggleForm()'>Sign In</a>";
    } else {
      signUpForm.style.display = 'none';
      signInForm.style.display = 'block';
      toggleFormText.innerHTML = "Don't have an account? <a href='#' onclick='toggleForm()'>Sign Up</a>";
    }
  }
  document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
  
    signInForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Fetch function for teacher sign-in
      fetch('http://localhost:3000/validateTeacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: document.getElementById('user').value,
          password: document.getElementById('pass').value,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.isValid){
            // Redirect to Teacher Dashboard after successful sign-in
            localStorage.setItem('teacher_id', data.id);
            window.location.href = 'Teachdashboard.html';
          } else {
            // Handle invalid credentials
            console.log('Invalid credentials');
          }
        })
        .catch(error => console.error('Error:', error));
    });
  
    signUpForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Fetch function for teacher sign-up
      fetch('http://localhost:3000/addTeacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: document.getElementById('newUsername').value,
          password: document.getElementById('newPassword').value,
          name: document.getElementById('fullName').value,
          email: document.getElementById('email').value,
        }),
      })
        .then(response => response.json())
        .then(data => {
            
          if (true) {
            // Redirect to Teacher Dashboard after successful sign-up
            window.location.href = 'TeachDashboard.html';
          } else {
            // Handle invalid credentials or user already exists
            console.log('Invalid credentials or user already exists');
          }
        })
        .catch(error => console.error('Error:', error));
    });
  });
  