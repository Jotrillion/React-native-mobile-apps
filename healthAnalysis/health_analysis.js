var conditions = [];
var xhr = new XMLHttpRequest();
var url = './health_analysis.json';
const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];

function createList(items) {
  var list = document.createElement('ul');
  items.forEach(function(item) {
    var li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
  return list;
}

function renderCondition(condition) {
  var card = document.createElement('div');
  card.classList.add('condition-card');

  var title = document.createElement('h3');
  title.textContent = condition.name;

  var image = document.createElement('img');
  image.src = condition.imagesrc;
  image.alt = condition.name + ' image';

  var symptomsHeading = document.createElement('h4');
  symptomsHeading.textContent = 'Symptoms';

  var preventionHeading = document.createElement('h4');
  preventionHeading.textContent = 'Prevention';

  var treatmentHeading = document.createElement('h4');
  treatmentHeading.textContent = 'Treatment';

  var treatment = document.createElement('p');
  treatment.textContent = condition.treatment;

  card.appendChild(title);
  card.appendChild(image);
  card.appendChild(symptomsHeading);
  card.appendChild(createList(condition.symptoms));
  card.appendChild(preventionHeading);
  card.appendChild(createList(condition.prevention));
  card.appendChild(treatmentHeading);
  card.appendChild(treatment);

  return card;
}

function showAllConditions() {
  var resultDiv = document.getElementById('result');
  if (!resultDiv) {
    return;
  }

  resultDiv.innerHTML = '';
  conditions.forEach(function(condition) {
    resultDiv.appendChild(renderCondition(condition));
  });
}

function generateReport() {
  if (!report) {
    return;
  }

  if (patients.length === 0) {
    report.textContent = 'No patients added yet.';
    return;
  }

  var latestPatient = patients[patients.length - 1];
  var conditionData = conditions.find(function(item) {
    return item.name === latestPatient.condition;
  });

  report.innerHTML =
    '<p><strong>Patient Name:</strong> ' + latestPatient.name + '</p>' +
    '<p><strong>Gender:</strong> ' + latestPatient.gender + '</p>' +
    '<p><strong>Age:</strong> ' + latestPatient.age + '</p>' +
    '<p><strong>Condition:</strong> ' + latestPatient.condition + '</p>' +
    '<p><strong>Total Patients Added:</strong> ' + patients.length + '</p>';

  if (conditionData) {
    var details = document.createElement('p');
    details.textContent = 'Suggested care: ' + conditionData.treatment;
    report.appendChild(details);
  }
}

function addPatient() {
  const name = document.getElementById("name").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const age = document.getElementById("age").value;
  const condition = document.getElementById("condition").value;

  if (name && gender && age && condition) {
    patients.push({ name, gender: gender.value, age, condition });
    resetForm();
    generateReport();
  } else if (report) {
    report.textContent = 'Please fill Name, Gender, Age and Condition to generate the report.';
  }
}

function resetForm() {
  document.getElementById("name").value = "";
  document.querySelector('input[name="gender"]:checked').checked = false;
  document.getElementById("age").value = "";
  document.getElementById("condition").value = "";
}

function searchCondition() {
  const input = document.getElementById('conditionInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  fetch('health_analysis.json')
    .then(response => response.json())
    .then(data => {
      const condition = data.conditions.find(item => item.name.toLowerCase() === input);

      if (condition) {
        const symptoms = condition.symptoms.join(', ');
        const prevention = condition.prevention.join(', ');
        const treatment = condition.treatment;

        resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
        resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

        resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
        resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
        resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
      } else {
        resultDiv.innerHTML = 'Condition not found.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

xhr.open('GET', url, true);
xhr.responseType = 'json';

xhr.onload = function() {
  var response = xhr.response;
  if (!response || !response.conditions) {
    var resultDiv = document.getElementById('result');
    if (resultDiv) {
      resultDiv.textContent = 'Unable to load health condition data.';
    }
    return;
  }

  conditions = response.conditions;
  showAllConditions();
};

xhr.onerror = function() {
  var resultDiv = document.getElementById('result');
  if (resultDiv) {
    resultDiv.textContent = 'Error while fetching data from health_analysis.json.';
  }
};

if (btnSearch) {
  btnSearch.addEventListener('click', searchCondition);
}

if (addPatientButton) {
  addPatientButton.addEventListener('click', addPatient);
}

xhr.send();
