'use strict';

// 1- create constructor and all list.
// 2- create eventlistener to submit and get data from the form and create object instance
// 3- create render function to render the table with if statement to change its display style to none at first
// 4- create getting item function


let total = 0 ;

function Employee(name, email, department, salary){
  this.name = name;
  this.email = email;
  this.department = department;
  this.salary = salary;

  Employee.all.push(this);
  settingItem();
}
Employee.all = [];


function random(){
  let min = 100;
  let max = 500;
  return Math.floor(Math.random() * (max - min) + min);
}

function gettingItem(){
  let stringObj = localStorage.getItem('data');
  let normalObj = JSON.parse(stringObj);
  if(normalObj !== null){
    Employee.all = normalObj;
  }
}

function settingItem(){
  localStorage.setItem('data', JSON.stringify(Employee.all));
}

let formEl = document.getElementById('formId');
formEl.addEventListener('submit', submitFun);
function submitFun(e){
  let emplyee = e.target;
  let eName = emplyee.name.value;
  let eEmail = emplyee.email.value;
  let eDepartment = emplyee.department.value;
  let eSalary = random();

  new Employee(eName,eEmail,eDepartment,eSalary);
}


let tableEl = document.getElementById('tableId');

let tableSec = document.getElementById('tableSec');
let stringObj = localStorage.getItem('data');
let normalObj = JSON.parse(stringObj);
if (normalObj === null){
  tableSec.style.display = 'none';
}

function render(){
  console.log(Employee.all);
  for (let i = 0; i < Employee.all.length; i++) {
    let rowEl = document.createElement('tr');
    tableEl.appendChild(rowEl);

    let tdEl1 = document.createElement('td');
    rowEl.appendChild(tdEl1);
    tdEl1.textContent = Employee.all[i].name;

    let tdEl2 = document.createElement('td');
    rowEl.appendChild(tdEl2);
    tdEl2.textContent = Employee.all[i].email;

    let tdEl3 = document.createElement('td');
    rowEl.appendChild(tdEl3);
    tdEl3.textContent = Employee.all[i].department;

    let tdEl4 = document.createElement('td');
    rowEl.appendChild(tdEl4);
    tdEl4.textContent = Employee.all[i].salary;
    total += Number(Employee.all[i].salary);
  }
  let totalEl = document.createElement('p');
  tableSec.appendChild(totalEl);
  totalEl.textContent = `Total = ${total}`;
}

gettingItem();
render();
