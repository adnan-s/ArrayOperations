const express = require('express');
const path = require('path');
const students = [
    {id: 10, firstName: 'Adnan', lastName:'Siddiqui', class:'node', address: 'Bradford',town: '', postcode: '', email:'', phone: '', dept: ''},
    {id: 20, firstName: 'Anna ', lastName:'Ratusznik', class:'node', address: 'London', town: '', postcode: '', email:'', phone: '', dept: ''},
    {id: 30, firstName: 'A2', lastName:'S2', class:'c#', address: 'Birmingham', town: '', postcode: '', email:'', phone: '', dept: ''},
    {id: 40, firstName: 'A3', lastName:'S3', class:'HTML', address: 'Oxford', town: '', postcode: '', email:'', phone: '', dept: ''},
    {id: 50, firstName: 'A4', lastName:'S4', class:'CSS', address: 'Scotland', town: '', postcode: '', email:'', phone: '', dept: ''},
    {id: 60, firstName: 'A5', lastName:'S5', class:'SQL', address: 'Leeds', town: '', postcode: '', email:'', phone: '', dept: ''},
    {id: 70, firstName: 'A6', lastName:'S6', class:'JavaScript', address: 'Shiplay', town: '', postcode: '', email:'', phone: '', dept: ''},
    {id: 80, firstName: 'A7', lastName:'S7', class:'Angular', address: 'Doncaster', town: '', postcode: '', email:'', phone: '', dept: ''},
    {id: 90, firstName: 'A8', lastName:'S8', class:'OOP', address: 'Manchester', town: '', postcode: '', email:'', phone: '', dept: ''},
    {id: 100, firstName: 'A9', lastName:'S9', class:'DLD', address: 'Bolton', town: '', postcode: '', email:'', phone: '', dept: ''},
    {id: 110, firstName: 'A10', lastName:'S10', class:'linex', address: 'Skanthorp', town: '', postcode: '', email:'', phone: '', dept: ''}  
  ];
  
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});


/**
 1. create an api that would return 1 student record base on Id passed in as a parameter
 http://localhost:3000/20
 method: get 
*/

app.get('/student/:id',(req,res) => {
    const student = students.filter(item => item.id === +req.params.id)[0];
    res.status(200).send(student);
});

/**
 create an api that would return all students record.
 http://localhost:3000/students
 method: get 
*/
app.get('/students', (req, res) => {
    res.status(200).send(students);
});


/**
  2. create an api that would delete a record based on id
 http://localhost:3000/20 
 method: delete
 */

app.delete('/student/:id',(req,res) => {
    students = students.filter(item => item.id !== +req.params.id) [0];
    res.status(200).send(students);
});

/**
  3. create an api that would update a student record.
 http://localhost:3000
 method: put
 */

 app.put('/student', (req, res) => {
    const updatedStudent = JSON.parse(req.body);
    const existing = students.filter(item => item.id !== updatedStudent.id) [0];
    existing.firstName = updatedStudent.firstName;
    existing.lastName = updatedStudent.lastName;
    existing.class = updatedStudent.class;
    existing.address = updatedStudent.address;

    res.status(200).send('record updated successfully');
});

/** 
 4. create an api that would add a student record.
 http://localhost:3000
 method: post
 */

app.post('/student', (req, res) => {
    const student = {
        firstName: res.body.firstName,
        lastName: res.body.lastName,
        class: res.body.class,
        address: res.body.address,
        town: res.body.town,
        postcode: res.body.postcode,
        email: res.body.email,
        phone: res.body.phone,
        dept: res.body.dept
    };

    students.push(students);
    res.status(200).send('record added successfully');

});

app.listen(3000);
