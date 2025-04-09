// Getting HTML Elements
const studentList = document.getElementById("student-list");
const title = document.getElementById("title");
const container = document.querySelector(".container");
const searchStudentInput = document.getElementById("Search-students-input");

// Creating an empty array
const students = [];

let currentID = 1000;

// Creating Function of Adding Student
function addStudent() {
  const studentName = document.getElementById("add-student-input").value.trim();
  if (studentName) {
    // Function to show the other Elements
    showOtherElements();
    //Function to generate a random ID
    generateRandomId();

    // Add The Student With The name and the ID to the array
    students.push({ id: currentID, name: studentName });

    // Function To render the students
    renderStudents();

    document.getElementById("add-student-input").value = "";
  } else {
    container.classList.add("shake");
    container.addEventListener(
      "animationend",
      () => {
        container.classList.remove("shake");
      },
      { once: true }
    );
  }
}

// Function to render the students
function renderStudents() {
  studentList.innerHTML = "";

  // Render all students from the array
  students.forEach( student => {

    // Creating The New Student List Item
    const newStudent = document.createElement("li");
    newStudent.textContent = `${student.id} - ${student.name}`;
    newStudent.classList.add("student-element");

    // Creating The Remove Button
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "REMOVE STUDENT";
    removeBtn.addEventListener("click", function () {
      // Find index and remove the student from the array
      const index = students.findIndex((s) => s.id === student.id);
      if (index > -1) students.splice(index, 1);

      // Re-render the students
      renderStudents();
    });

    // Creating The Graduate Button
    const graduateBtn = document.createElement("button");
    graduateBtn.classList.add("graduate-btn");
    graduateBtn.textContent = "GRADUATE STUDENT";
    graduateBtn.addEventListener("click", function () {
      newStudent.classList.toggle("graduated");
    });

    // Creating Div Of List Item
    const divOfListItem = document.createElement("div");
    divOfListItem.classList.add("div-of-list-item");

    // Creating Div of Buttons
    const divOfButtons = document.createElement("div");
    divOfButtons.classList.add("div-of-btns");

    // Appending The Elements
    studentList.appendChild(divOfListItem);
    divOfListItem.appendChild(newStudent);
    divOfListItem.appendChild(divOfButtons);
    divOfButtons.appendChild(removeBtn);
    divOfButtons.appendChild(graduateBtn);
  });
}

// Function to generate a random ID
function generateRandomId() {
  currentID++;
}

// Function to show the other elements
function showOtherElements() {
  document.getElementById("sort-students-btn").style.display = "block";
  document.getElementById("reverse-order-btn").style.display = "block";
  document.getElementById("search-Students-label").style.display = "block";
  document.getElementById("Search-students-input").style.display = "block";
  document.getElementById("filter-student").style.display = "block";
}


// Function to reverse the order of students
function reverseOrder() {
  students.reverse();
  renderStudents();
}

// Function to sort the students array by name
function sortByName() {
  students.sort( (a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  renderStudents();
}


// Add an event listener to the search input field
searchStudentInput.addEventListener("input", searchStudents);

// Function to handle search functionality
function searchStudents() {
  const firstLetter = searchStudentInput.value.trim().toLowerCase();
  const filteredStudents = students.filter( student =>
    student.name.toLowerCase().startsWith(firstLetter)
  );

  // Render only the filtered students
  renderFilteredStudents(filteredStudents);
}

// Function to render only the filtered students
function renderFilteredStudents(filteredStudents) {
  studentList.innerHTML = "";

  filteredStudents.forEach( student => {

    const newStudent = document.createElement("li");
    newStudent.textContent = `${student.id} - ${student.name}`;
    newStudent.classList.add("student-element");

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "REMOVE STUDENT";
    removeBtn.addEventListener("click", function () {
      const index = students.findIndex((s) => s.id === student.id);
      if (index > -1) students.splice(index, 1);
      renderStudents();
    });

    const graduateBtn = document.createElement("button");
    graduateBtn.classList.add("graduate-btn");
    graduateBtn.textContent = "GRADUATE STUDENT";
    graduateBtn.addEventListener("click", function () {
      newStudent.classList.toggle("graduated");
    });

    const divOfListItem = document.createElement("div");
    divOfListItem.classList.add("div-of-list-item");

    const divOfButtons = document.createElement("div");
    divOfButtons.classList.add("div-of-btns");

    studentList.appendChild(divOfListItem);
    divOfListItem.appendChild(newStudent);
    divOfListItem.appendChild(divOfButtons);
    divOfButtons.appendChild(removeBtn);
    divOfButtons.appendChild(graduateBtn);
  });
}

// Show Graduated Students
function showGraduted() {
  const allStudents = document.querySelectorAll(".div-of-list-item");
  allStudents.forEach( studentDiv => {
    const studentName = studentDiv.querySelector(".student-element");
    if (studentName && studentName.classList.contains("graduated")) {
      studentDiv.style.display = "flex";
    } else {
      studentDiv.style.display = "none";
    }
  });
}

// Show Non-Graduated Students
function ShowNonGraduted() {
  const allStudents = document.querySelectorAll(".div-of-list-item");
  allStudents.forEach(studentDiv => {
    const studentName = studentDiv.querySelector(".student-element");
    if (studentName && !studentName.classList.contains("graduated")) {
      studentDiv.style.display = "flex"; 
    } else {
      studentDiv.style.display = "none";
    }
  });
}
