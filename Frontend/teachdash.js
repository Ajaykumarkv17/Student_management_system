document.addEventListener('DOMContentLoaded', function () {
    const addStudentsCard = document.getElementById('addStudentsCard');
    const addAssignmentsCard = document.getElementById('addAssignmentsCard');
    const addStudentsForm = document.getElementById('addStudentsForm');
    const addAssignmentsForm = document.getElementById('addAssignmentsForm');
    const showsubmissionform=document.getElementById('submissionsContainer');
    fetch('http://localhost:3000/getRegisteredStudents')
    .then(response => response.json())
    .then(students => {
      // Populate the dropdown with student options
      const studentIdDropdown = document.getElementById('studentId');
      students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = student.name;
        
        studentIdDropdown.appendChild(option);
        
      });
    })
    .catch(error => console.error('Error fetching registered students:', error));
  
    // Toggle visibility of Add Students card
    window.toggleAddStudents = function () {
      addAssignmentsCard.style.display = 'none';
      showsubmissionform.style.display='none';
      addStudentsCard.style.display = addStudentsCard.style.display === 'none' ? 'block' : 'none';
    };
    window.togglelogout = function () {
        window.location.href = 'Dashboard.html';
      };

  
    // Toggle visibility of Add Assignments card
    window.toggleAddAssignments = function () {
      addStudentsCard.style.display = 'none';
      showsubmissionform.style.display='none';
      addAssignmentsCard.style.display = addAssignmentsCard.style.display === 'none' ? 'block' : 'none';
    };
    
  
    // Add Students Form Submission
   
    addStudentsForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const student_id = document.getElementById('studentId').value;
      const class_name=document.getElementById("className").value;
      // Fetch function for adding students to the class
      fetch('http://localhost:3000/addStudentToClass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: student_id, // Adjust the class ID as needed
          class_name: class_name,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            alert("Added Successfully");
          } else {
            alert('Error adding student to the class. Please try again.');
          }
        })
        .catch(error => console.error('Error:', error));
    });
  
    // Add Assignments Form Submission
    addAssignmentsForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const assignmentid = document.getElementById('assignmentid').value;
     
      const assignmentName = document.getElementById('assignmentName').value;
      const assignmentDescription = document.getElementById('assignmentDescription').value;
  
      // Fetch function for adding assignments
      fetch('http://localhost:3000/addAssignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:assignmentid,
          teacher_id:teacher_id,
          
          assignmentName:assignmentName,
          descriptions: assignmentDescription,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (true) {
            alert("added successfully");
          } else {
            alert('Error adding assignment. Please try again.');
          }
        })
        .catch(error => console.error('Error:', error));
    });
    window.toggleshowSubmissions = function () {
    
        // Fetch submissions from the server
        
        addStudentsCard.style.display='none';
        addAssignmentsCard.style.display ='none';
        submissionsContainer.style.display ='block';
        const teache_id = localStorage.getItem('teacher_id');
        fetch('http://localhost:3000/getSubmissions')
            
        
        
          
          .then(response => response.json())
          .then(submissions => {
            // Handle the fetched submissions
            displaySubmissions(submissions);
          })
          .catch(error => console.error('Error fetching submissions:', error));
      };
    
      function displaySubmissions(submissions) {
        const submissionsContainer = document.getElementById('submissionsContainer');
        submissionsContainer.style.display = 'block';
    
        // Clear previous content
        submissionsContainer.innerHTML = '';
    
        // Iterate through submissions and create HTML elements
        submissions.forEach(submission => {
          const submissionCard = document.createElement('div');
          submissionCard.className = 'submission-card';
    
          const assignmentTitle = document.createElement('h2');
          assignmentTitle.textContent = `Assignment: ${submission.assignment_title}`;
    
          const studentName = document.createElement('p');
          studentName.textContent = `Student: ${submission.student_name}`;
    
          const downloadLink = document.createElement('a');
          downloadLink.href = submission.file_path;
          downloadLink.textContent = 'Download Submission';

          const starrating=document.createElement('p');
          starrating.textContent="Give Stars:"

          
          
          submissionCard.appendChild(assignmentTitle);
          submissionCard.appendChild(studentName);
          submissionCard.appendChild(downloadLink);
          submissionCard.appendChild(starrating);

    
          submissionsContainer.appendChild(submissionCard);
        });
      }
  });
  