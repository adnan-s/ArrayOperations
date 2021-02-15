logger = str => console.log(str);
var dataObj = [];

var bindData = () => {
  var request = new XMLHttpRequest();

  request.addEventListener("load", () => {
    dataObj = JSON.parse(request.response);
    var lines = convertToHtml(dataObj);
    var dg = document.getElementById('dgStudent');
    dg.innerHTML = '';
    dg.innerHTML = lines;  
  });

  request.open("GET", "http://localhost:3000/students");
  request.send();    
};


var getSingleStudent = (id) =>{
  const url = 'http://localhost:3000/student/' + id;
  var req = new XMLHttpRequest();
  
  req.addEventListener("load", () => {
    dataObj =JSON.parse(req.responseText);
    document.getElementById("txtId").value = dataObj.id;
    document.getElementById("txtFirstName").value = dataObj.firstName;
    document.getElementById("txtLastName").value = dataObj.lastName;
    document.getElementById("txtAddress").value = dataObj.address;  
  });

  req.open('GET', url, true);
  req.send();
}

const convertToHtml = (dataArray) => {
  var lines ='';
  for(var i=0; i<dataArray.length; i++)
  { 
    var student = dataArray[i];
    var strBtnDelete = '<input type="button" onclick="delRecord('+ student.id +')" value="Delete" class="btn btn-primary btn-sm">';
    var strBtnEdit = '<input type="button" onclick="getSingleStudent('+ student.id +')" value="Edit" class="btn btn-primary btn-sm">';
    var str = '<tr><td>'+ student.firstName + ' ' + student.lastName +
              '</td><td>'+student.class +
              '</td><td>'+student.address +
              '</td><td>'+ strBtnDelete +
              '</td><td>'+ strBtnEdit +'</td></tr>';
    lines = lines + str ;
  }
  return lines;
}

var UpdateRecord = () => {

  var student  = {
    id: document.getElementById("txtId").value,
    firstName: document.getElementById("txtFirstName").value,
    lastName: document.getElementById("txtLastName").value,
    address: document.getElementById("txtAddress").value
  };

  const url = 'http://localhost:3000/student'
  var request = new XMLHttpRequest();

  request.addEventListener("load", () => {
    // show success message to user.
    bindData();
  });

  request.open("PUT", "http://localhost:3000/student");
  request.send(JSON.stringify(student));

};

var delRecord = (id) => {  
  if(confirm("Do you want Delete this record") == true) { 
    dataObj = dataObj.filter( e => e.id !== id);
    bindData();
  }
};
