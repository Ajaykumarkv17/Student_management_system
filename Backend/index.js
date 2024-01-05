const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors= require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'stud-teach-database.cjzejrsuaply.eu-west-2.rds.amazonaws.com',
  user: 'admin',
  password: 'ajay2003',
  database: 'Student-teacher-schema',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Insert Student
app.post('/addStudent', (req, res) => {
  const { username, password, name, email, dob } = req.body;

  const sql = 'INSERT INTO students (username, password, name, email, dob) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [username, password, name, email, dob], (err, result) => {
    if (err) {
      console.error('Error inserting student:', err);
      res.status(500).json({ error: 'Error inserting student' });
    } else {
      res.status(200).json({ message: 'Student added successfully' });
    }
  });
});

// Validate Student
app.post('/validateStudent', (req, res) => {
    const { username, password } = req.body;
  
    const sql = 'SELECT * FROM students WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
      if (err) {
        console.error('Error validating student:', err);
        res.status(500).json({ error: 'Error validating student' });
      } else {
        if (result.length > 0) {
          res.status(200).json({ isValid: true, message: 'Username and password are valid' });
        } else {
          res.status(200).json({ isValid: false, message: 'Invalid username or password' });
        }
      }
    });
  });

// Insert Teacher
app.post('/addTeacher', (req, res) => {
  const { username, password, name, email } = req.body;

  const sql = 'INSERT INTO teachers (username, password, name, email) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, password, name, email], (err, result) => {
    if (err) {
      console.error('Error inserting teacher:', err);
      res.status(500).json({ error: 'Error inserting teacher' });
    } else {
      res.status(200).json({ message: 'Teacher added successfully' });
    }
  });
});

// Validate Teacher
app.post('/validateTeacher', (req, res) => {
  const { username, email } = req.body;

  const sql = 'SELECT * FROM teachers WHERE username = ? OR email = ?';
  db.query(sql, [username, email], (err, result) => {
    if (err) {
      console.error('Error validating teacher:', err);
      res.status(500).json({ error: 'Error validating teacher' });
    } 
    else {
        if (result.length > 0) {
          res.status(200).json({ isValid: true, message: 'Username and password are valid' });
        } else {
          res.status(200).json({ isValid: false, message: 'Invalid username or password' });
        }
      }
    
  });
});
app.post('/addAssignment', (req, res) => {
    const { id,assignmentName,descriptions,teacher_id} = req.body;
    
    const sql = 'INSERT INTO assignments (id,assignmentName,descriptions,teacher_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [id,assignmentName,descriptions,teacher_id], (err, result) => {
      if (err) {
        console.error('Error inserting assignment:', err);
        res.status(500).json({ error: 'Error inserting assignment' });
      } else {
        res.status(200).json({ message: 'Assignmemt added successfully' });
      }
    });
  });
  app.get('/getTeacherAssignments', (req, res) => {
    const sql = 'SELECT * FROM assignments WHERE teacher_id = ?';
    
    const teacherId=10;
    db.query(sql, [teacherId], (err, result) => {
      if (err) {
        console.error('Error fetching teacher assignments:', err);
        res.status(500).json({ error: 'Error fetching teacher assignments' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  app.post('/addSubmission', (req, res) => {
    const { assignmentId, studentId, file } = req.body;
  
    const sql = 'INSERT INTO submissions (assignment_id, student_id, file_path) VALUES (?, ?, ?)';
    db.query(sql, [assignmentId, studentId, file], (err) => {
      if (err) {
        console.error('Error adding submission:', err);
        res.status(500).json({ error: 'Error adding submission' });
      } else {
        res.status(200).json({ message: 'Assignment submitted successfully' });
      }
    });
  });

// Endpoint to get submissions
app.get('/getSubmissions', (req, res) => {
    const sql = ` SELECT submissions.*, assignments.assignmentName AS assignment_title, students.username AS student_name
      FROM submissions
      JOIN assignments ON submissions.assignment_id = assignments.id
      JOIN students ON submissions.student_id = students.id `;
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching submissions:', err);
        res.status(500).json({ error: 'Error fetching submissions' });
      } else {
        res.status(200).json(result);
      }
    });
  });
// Endpoint to get registered students
app.get('/getRegisteredStudents', (req, res) => {
    const sql = 'SELECT id, name FROM students';
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching registered students:', err);
        res.status(500).json({ error: 'Error fetching registered students' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  
// Endpoint to add a student to a class
app.post('/addStudentToClass', (req, res) => {
    const { studentId, class_name } = req.body;
  
   
    const sql = 'INSERT INTO class_student (class_name, student_id) VALUES (?, ?)';
    db.query(sql, [class_name, studentId], (err) => {
      if (err) {
        console.error('Error adding student to class:', err);
        res.status(500).json({ error: 'Error adding student to class' });
      } else {
        res.status(200).json({ message: 'Student added to class successfully' });
      }
    });
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
