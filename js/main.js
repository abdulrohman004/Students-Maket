const elUsers = document.querySelector(".students");
const elEditModal = document.querySelector(".edit-student");
const elAddStudent = document.querySelector(".add-student");
const elTemplate = document.querySelector("#student-temp").content;
const elAddStudentInput = document.querySelector(".add-student__input");
const elStudentName = document.querySelector("#name_add");
const elStudentSurname = document.querySelector("#surname_add");
const elStudentAge = document.querySelector("#age_add");
const elStudentEdit = document.querySelector(".students__item-edit");
const elEdit = document.querySelector(".edit-student-form");
const elEditName = document.querySelector("#name");
const elEditSurname = document.querySelector("#surname");
const elEditAge = document.querySelector("#age");
const URL = "https://student-express.herokuapp.com/site/student";

elUsers.addEventListener("click", (e) => {
  if (e.target.matches(".students__item-edit")) {
    elEditModal.classList.add("edit-student--open");
    const currentStudentId = e.target.closest(".students__item").dataset.id;
    console.log(currentStudentId);
    function editFunction(e) {
      e.preventDefault();
      editStudent(
        currentStudentId,
        elEditName.value,
        elEditSurname.value,
        elEditAge.value
      );
    }
    elEdit.addEventListener("submit", editFunction);
  }
});

async function makeRequest(url) {
  const response = await fetch(url);
  const data = await response.json();
  elUsers.addEventListener("submit", (e) => {
    e.preventDefault();
    renderStudents(data.message);
  });
  renderStudents(data.message);
}

function renderStudents(studentsArr) {
  elUsers.innerHTML = null;
  studentsArr.forEach((student) => {
    const newTemp = elTemplate.cloneNode(true);
    newTemp
      .querySelector(".students__item")
      .setAttribute("data-id", student.student_id);
    newTemp.querySelector(".students__item-heading").textContent =
      student.first_name + " " + student.last_name;
    newTemp.querySelector(".students__item-age").textContent = student.age;
    elUsers.append(newTemp);
  });
}
async function newStudentAdd(url, method) {
  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      firstName: elStudentName.value,
      lastName: elStudentSurname.value,
      age: elStudentAge.value,
    }),
  });
  window.location.reload(true);
}
elAddStudent.addEventListener("submit", (e) => {
  e.preventDefault();
  newStudentAdd(URL, "POST");
});

async function editStudent(studentId, firstName, lastName, age) {
  const user = {
    studentId: studentId,
    firstName: firstName,
    lastName: lastName,
    age: age,
  };
  const res = await fetch(URL, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  console.log(data.message);
  makeRequest(URL);
}

makeRequest(URL);
