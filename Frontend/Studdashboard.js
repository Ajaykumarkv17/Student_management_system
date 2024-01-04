document.addEventListener('DOMContentLoaded', function () {
    const assignmentsContainer = document.getElementById('assignmentsContainer');
    window.logout = function () {
        
        sessionStorage.clear();
        window.location.href = 'Dashboard.html'; // Replace 'login.html' with your actual login page
      };
    // Fetch assignments from the server
    fetch('http://localhost:3000/getTeacherAssignments')
      .then(response => response.json())
      .then(assignments => {
        displayAssignments(assignments);
      })
      .catch(error => console.error('Error fetching assignments:', error));
  
    function displayAssignments(assignments) {
      // Clear previous content
      assignmentsContainer.innerHTML = '';
  
      // Iterate through assignments and create HTML elements
      assignments.forEach(assignment => {
        const assignmentCard = document.createElement('div');
        assignmentCard.className = 'assignment-card';
  

        const id=document.createElement('p');
        id.textContent=assignment.id;

        const title = document.createElement('h2');
        title.textContent = assignment.assignmentName;

        const description = document.createElement('p');
        description.textContent = assignment.descriptions;
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit Assignment';
        submitButton.onclick = function () {
        submitAssignment(assignment.id); // Pass assignment ID to the submission function
      };

        
        
  
        
        assignmentCard.appendChild(id);
        assignmentCard.appendChild(title);
        assignmentCard.appendChild(description);
        assignmentCard.appendChild(submitButton);
        
  
        assignmentsContainer.appendChild(assignmentCard);
      });
    }
  
    // Function to toggle the visibility of assignments
    window.toggleAssignments = function () {
      const assignmentsContainer = document.getElementById('assignmentsContainer');
      assignmentsContainer.style.display = assignmentsContainer.style.display === 'none' ? 'block' : 'none';
    };
  
    function submitAssignment(assignmentId) {
        // Assuming you have a file input with ID 'fileInput' for the file upload
        const fileInput = document.getElementById('fileInput');

    
        // Perform the submission using fetch
        fetch('http://localhost:3000/addSubmission', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              assignmentId:12345,
              studentId:53,
              file:"10thmarks.pdf"
              
            }),
        })
          .then(response => response.json())
          .then(data => {
             alert("Successfully submitted");
            // Handle the response as needed
          })
          .catch(error => console.error('Error submitting assignment:', error));
       
      }
  });
  
  