let totalFilesSelected = 0;

document.addEventListener('DOMContentLoaded', function() {

  // Eye visibility toggle for password field
  const eyeicon = document.getElementById("eyeicon");
  const password = document.getElementById("password");
  
  if (eyeicon && password) {
    eyeicon.onclick = function() {
      if (password.type === "password") {
          password.type = "text";
          eyeicon.src = "./img/eyeon.png";
      } else {
          password.type = "password";
          eyeicon.src = "./img/eyeclose.png";
      }
    };
  }

  // Hide fields based on topic selection
  const hideFields = document.getElementById("request-topic");

  if (hideFields) {
    hideFields.addEventListener('change', function() {

      const selectedTopic = this.value;

      // Hide all fields initially
      document.getElementById("common-fields").classList.remove("hidden");
      document.getElementById("resignation-fields").classList.add("hidden");
      document.getElementById("other-fields").classList.add("hidden");

      const commonFields = document.getElementById('common-fields');
      const resignationFields = document.getElementById('resignation-fields');
      const otherFields = document.getElementById('other-fields');

      // Handle field visibility based on selection
      if (selectedTopic === "resignation") {
        console.log("resignation");
        document.getElementById("common-fields").classList.add("hidden");
        document.getElementById("resignation-fields").classList.remove("hidden");
        if(commonFields.classList.contains('hidden')){
          const semester = document.getElementById('semester-input');
          const subjectId = document.getElementById('subject-id-input');
          const subjectName = document.getElementById('subject-name-input');
          const section = document.getElementById('section-input');
          if(semester.required && subjectId.required && subjectName.required && section.required){
            semester.removeAttribute('required');
            subjectId.removeAttribute('required');
            subjectName.removeAttribute('required');
            section.removeAttribute('required');
          }
        }
        if(otherFields.classList.contains('hidden')){
          const other = document.getElementById('other-input');
          if(other.required){
            other.removeAttribute('required');
          }
        }
        const subjectIdResign = document.getElementById('subject-id-input-resignation');
        const subjectNameResign = document.getElementById('subject-name-input-resignation');
        subjectIdResign.setAttribute('required','required');
        subjectNameResign.setAttribute('required','required');
      }

      if (selectedTopic === "other") {
        console.log("other");
        document.getElementById("common-fields").classList.add("hidden");
        document.getElementById("other-fields").classList.remove("hidden");
        if(commonFields.classList.contains('hidden')){
          const semester = document.getElementById('semester-input');
          const subjectId = document.getElementById('subject-id-input');
          const subjectName = document.getElementById('subject-name-input');
          const section = document.getElementById('section-input');
          if(semester.required && subjectId.required && subjectName.required && section.required){
            semester.removeAttribute('required');
            subjectId.removeAttribute('required');
            subjectName.removeAttribute('required');
            section.removeAttribute('required');
          }
        }
        if(resignationFields.classList.contains('hidden')){
          const subjectIdResign = document.getElementById('subject-id-input-resignation');
          const subjectNameResign = document.getElementById('subject-name-input-resignation');
          if(subjectIdResign.required && subjectNameResign.required){
            subjectIdResign.removeAttribute('required');
            subjectNameResign.removeAttribute('required');
          }
        }
        const other = document.getElementById('other-input');
        other.setAttribute('required','required');

      }

      if (selectedTopic === "late-registration" || selectedTopic === "drop-w" || selectedTopic === "cross-program") {
        console.log("common");
        if(resignationFields.classList.contains('hidden')){
          const subjectIdResign = document.getElementById('subject-id-input-resignation');
          const subjectNameResign = document.getElementById('subject-name-input-resignation');
          if(subjectIdResign.required && subjectNameResign.required){
            subjectIdResign.removeAttribute('required');
            subjectNameResign.removeAttribute('required');
          }
        }
        if(otherFields.classList.contains('hidden')){
          const other = document.getElementById('other-input');
          if(other.required){
            other.removeAttribute('required');
          }
        }
        const semester = document.getElementById('semester-input');
        const subjectId = document.getElementById('subject-id-input');
        const subjectName = document.getElementById('subject-name-input');
        const section = document.getElementById('section-input');
        semester.setAttribute('required','required');
        subjectId.setAttribute('required','required');
        subjectName.setAttribute('required','required');
        section.setAttribute('required','required');

      }
      
      localStorage.setItem('selectedTopic', selectedTopic);
      const selectedOption = hideFields.options[hideFields.selectedIndex];
      const selectText = selectedOption.textContent;
      localStorage.setItem('selectSaveText',selectText);

    });
  }

  // Display logged in name for student
  const userInfo = document.querySelector('.welcome-name');
  const displayname_th = localStorage.getItem('displayname_th');

  if (userInfo && displayname_th) {
    userInfo.textContent = `${displayname_th}`;
  }

  // Display logged in name for lecturer
  const lecturerInfo = document.querySelector('.lecturer-name');
  const lecturer = localStorage.getItem('username');

  if(lecturerInfo && lecturer){
    lecturerInfo.textContent = `${lecturer}`;
  }

  // Checkbox validation for debt options
  const option1 = document.getElementById('no-outstanding-debt-checkbox');
  const option2 = document.getElementById('outstanding-debt-checkbox');
  const money = document.getElementById('amount-input');

  if (option1 && option2 && money) {
    option1.addEventListener('change', function () {
      if (option1.checked) {
        option2.disabled = true;
        option2.checked = false;
        money.disabled = true;
        money.removeAttribute('required');
      } else {
        option2.disabled = false;
        if (option2.checked) {
          money.disabled = false;
          money.setAttribute('required', 'required');
        } else {
          money.disabled = true;
          money.removeAttribute('required');
        }
      }
    });

    option2.addEventListener('change', function () {
      if (option2.checked) {
        money.disabled = false;
        money.setAttribute('required', 'required');
      } else {
        money.disabled = true;
        money.removeAttribute('required');
        money.value = '';
      }
    });
  }  
    //file validation
    const uploadInput = document.getElementById('upload');

    if(uploadInput){
      uploadInput.addEventListener('change', function(){
        const files = uploadInput.files;
        const fileConstraints = document.getElementById('file-constraints');
        
        if (validateFiles(files)) {
            
            const fileNames = Array.from(files).map(file => file.name).join(', ');

            
            displayFileList(files);
        } else {
            
            fileConstraints.textContent = 'ไม่เกิน 100KB/ไฟล์';
        }
      });
    }
     
     //form submit on requestform page
     const submitForm = document.getElementById('requestform');

     if(submitForm){
          submitForm.addEventListener('submit', function(event){
              
          event.preventDefault();

          //console.log("Form has been submitted successfully.");

          formSubmissionTest();

          //formSubmission();

         })
     }

     //form save on requestform page
     const saveForm = document.getElementById('save-button-requestform');

     if(saveForm){
      saveForm.addEventListener('click', function(event){
        event.preventDefault();

        saveFormSubmission();
      })
     }
     
     //load requests on myrequest page
     const historyContainer = document.querySelector('.history-container');

     if(historyContainer){
      //loadRequests();
      loadRequestsTest();
     }

     //load requests on professordashboard page
     const historyContainerLecturer = document.querySelector('.history-container-lecturer');

     if(historyContainerLecturer){
      loadRequestsLecturer();
     }
     
     //logout button for all page
     const logoutButton = document.getElementById('logout-button');

     if(logoutButton){
      logoutButton.addEventListener('click', function(){
        Swal.fire({
          title: "คุณต้องการที่จะออกจากระบบ?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Logout",
          denyButtonText: `Cancel`
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("คุณได้ออกจากระบบสําเร็จเเล้ว", "", "success");
            localStorage.removeItem('displayname_th');
            setTimeout(function() {
              window.location.href = "login.html";
            }, 600);
          }
        });
      })
     }

     //back button for requestdetails page
     const backButton = document.getElementById('back-button-requestdetails');
     
     if(backButton){
      backButton.addEventListener('click', function(){
        window.location.href = 'myrequest.html';
      })
     }

     //check if we are on the requestdetails page
     if(window.location.pathname.includes('requestdetails.html')){
      getRequestDetails();
     }

     //check if we are on the professordetails page
     if(window.location.pathname.includes('professordetails.html')){
      getRequestDetailsProfessor();
     }
     
});

function checkForm() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  document.getElementById('loginButton').disabled = !(username && password && role !== '0');
}

function submitLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  if(role === "Student"){
    
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Application-Key': 'TU28dd5f3f9ecc9c1d39bacd00ae06738a6372e75453e2073599e81b22a06e3b45765ac86ef04c20fae96bc82e950f3bc4',
      },
      body: JSON.stringify({
        UserName: username,
        PassWord: password,
      })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
          console.log(data.message)
          console.log('Login Response:', data);
          localStorage.setItem('displayname_th', data.displayname_th);
          localStorage.setItem('studentUserName', data.username);
          localStorage.setItem('lecturerUserName', "John123");

          const student = {
            userName: data.username,
            type: data.type,
            displayname_en: data.displayname_en,
            email: data.email,
            faculty: data.faculty
          }

          fetch('http://localhost:8080/students',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(student)
          })
          .then(response => response.json())
          .then(data => {
            console.log('Successfully save student to the database');
            console.log(data);
          })
          .catch(error => {
            console.log('Error: ', error);
          })

          Swal.fire({
                      
            icon: "success",
            title: "ล็อกอินสําเร็จ",
            text: "ล็อกอินเข้าสู่ระบบสําเร็จ",
            showConfirmButton: false
        
          });
          setTimeout(function() {
          window.location.href = "requestform.html";
          }, 1000);
        } 
        else {
  
          console.log(data.message)
          console.log('Login Response:', data);
  
          Swal.fire({
            icon: "error",
            title: "username หรือ password ไม่ถูกต้อง",
            text: "เข้าสู่ระบบไม่สําเร็จ",
            showConfirmButton: false
          });
  
        }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  else{
    
    const userName = document.getElementById('username').value;
    const role = document.getElementById('role').value;

    localStorage.setItem('username', userName);

    const lecturer = {
      userName: userName,
      type: role
    }
    
    fetch('http://localhost:8080/lecturers',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(lecturer)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Successfully save lecturer to the database');
      console.log(data)
    })
    .catch(error => {
      console.log('Error:', error)
    })
    
    
    Swal.fire({
                      
      icon: "success",
      title: "ล็อกอินสําเร็จ",
      text: "ล็อกอินเข้าสู่ระบบสําเร็จ",
      showConfirmButton: false
  
    });
    setTimeout(function() {
    window.location.href = "professordashboard.html";
    }, 1000);
  }
}

function validateFiles(files) {
  const maxFiles = 5;
  const validFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']; // MIME types for PDF, PNG, JPG, JPEG

  
  totalFilesSelected += files.length;

  
  if (totalFilesSelected > maxFiles) {
      Swal.fire({
          icon: 'error',
          title: 'จำนวนไฟล์เกินกำหนด',
          text: `คุณสามารถอัปโหลดไฟล์ได้ไม่เกิน ${maxFiles} ไฟล์เท่านั้น`
      });
      totalFilesSelected -= files.length; 
      return false;
  }

  
  for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileSizeInKB = file.size / 1024;  

      
      if (!validFileTypes.includes(file.type)) {
          Swal.fire({
              icon: 'error',
              title: 'ประเภทไฟล์ไม่รองรับ',
              text: `ไฟล์ที่เลือกต้องเป็น PDF, PNG, JPG หรือ JPEG เท่านั้น (ไฟล์ที่เลือก: ${file.name})`
          });
          totalFilesSelected -= files.length; 
          return false;
      }

      const maxFileSizeKB = 100; 

      
      if (fileSizeInKB > maxFileSizeKB) {
          Swal.fire({
              icon: 'error',
              title: 'ขนาดไฟล์เกินกำหนด',
              text: `ขนาดไฟล์ "${file.name}" เกิน 100KB`
          });
          totalFilesSelected -= files.length;
          return false;
      }
  }

  return true;
}

function resetFileCount() {
  totalFilesSelected = 0;
}

function displayFileList(files) {

  const fileListContainer = document.getElementById('file-list-container'); 

  console.log("Files selected:", files); 

  Array.from(files).forEach(file => {
      const listItem = document.createElement('li'); 
      listItem.textContent = file.name;
      fileListContainer.appendChild(listItem); 
  });
}

//submit button on requestform page
function formSubmissionTest(){
  const studentUserName = localStorage.getItem('studentUserName');
  const lecturerUserName = localStorage.getItem('lecturerUserName');
  const dateTime = new Date().toLocaleString();
  const subjectInput = document.getElementById('subject-input').value;
  const dearInput = document.getElementById('dear-input').value;
  const nameInput = document.getElementById('name-input').value;
  const studentIdInput = document.getElementById('student-id-input').value;
  const academicYearInput = document.getElementById('academicyear-input').value;
  const departmentInput = document.getElementById('department-input').value;
  const addressInput = document.getElementById('address-input').value;
  const districtInput = document.getElementById('district-input').value;
  const regionInput = document.getElementById('region-input').value;
  const provinceInput = document.getElementById('province-input').value;
  const selectedTopic = localStorage.getItem('selectedTopic');
  const requestTopic = localStorage.getItem('selectSaveText');
  const semesterInput = document.getElementById('semester-input').value;
  const subjectIdInput = document.getElementById('subject-id-input').value;
  const subjectNameInput = document.getElementById('subject-name-input').value;
  const sectionInput = document.getElementById('section-input').value;
  const subjectIdInputResignation = document.getElementById('subject-id-input-resignation').value;
  const subjectNameInputResignation = document.getElementById('subject-name-input-resignation').value;
  const noOutstandingDebtCheckbox = document.getElementById('no-outstanding-debt-checkbox').checked;
  const outstandingDebtCheckbox = document.getElementById('outstanding-debt-checkbox').checked;
  const amountInput = document.getElementById('amount-input').value;
  const otherInput = document.getElementById('other-input').value;
  const reasonInput = document.getElementById('reason-input').value;
  const lecturerInput = document.getElementById('lecturer-input').value;

   const request = {
    studentUserName: studentUserName,
    lecturerUserName: lecturerUserName,
    status: "WAITING FOR APPROVAL",
    dateTime: dateTime,
    subject: subjectInput,
    recipient: dearInput,
    name: nameInput,
    studentId: studentIdInput,
    academicYear: academicYearInput,
    department: departmentInput,
    address: addressInput,
    district: districtInput,
    region: regionInput,
    province: provinceInput,
    requestValue: selectedTopic,
    requestTopic: requestTopic,
    semester: semesterInput,
    subjectId: subjectIdInput,
    subjectName: subjectNameInput,
    section: sectionInput,
    resignSemester: subjectIdInputResignation,
    resignYear: subjectNameInputResignation,
    noDebt: noOutstandingDebtCheckbox,
    debt: outstandingDebtCheckbox,
    debtAmount: amountInput,
    other: otherInput,
    reason: reasonInput,
    lecturerReason: lecturerInput
   }

   fetch('http://localhost:8080/requests',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
   })
   .then(response => response.json())
   .then(data => {
    console.log('Successfully save request to the database')
    console.log(data)
   })
   .catch(error => {
    console.log('Error: ', error)
   })

   Swal.fire({
                    
    icon: "success",
    title: "ยื่นคําร้องสําเร็จ",
    text: "คําร้องของคุณอยู่ในขั้นตอนการดําเนินการ",
    showConfirmButton: false

   });
   setTimeout(function() {
   window.location.href = "myrequest.html";
   }, 1000);

}

//save button on requestform page
function saveFormSubmission(){
  const studentUserName = localStorage.getItem('studentUserName');
  const lecturerUserName = localStorage.getItem('lecturerUserName');
  const dateTime = new Date().toLocaleString();
  const subjectInput = document.getElementById('subject-input').value;
  const dearInput = document.getElementById('dear-input').value;
  const nameInput = document.getElementById('name-input').value;
  const studentIdInput = document.getElementById('student-id-input').value;
  const academicYearInput = document.getElementById('academicyear-input').value;
  const departmentInput = document.getElementById('department-input').value;
  const addressInput = document.getElementById('address-input').value;
  const districtInput = document.getElementById('district-input').value;
  const regionInput = document.getElementById('region-input').value;
  const provinceInput = document.getElementById('province-input').value;
  const selectedTopic = localStorage.getItem('selectedTopic');
  const requestTopic = localStorage.getItem('selectSaveText');
  const semesterInput = document.getElementById('semester-input').value;
  const subjectIdInput = document.getElementById('subject-id-input').value;
  const subjectNameInput = document.getElementById('subject-name-input').value;
  const sectionInput = document.getElementById('section-input').value;
  const subjectIdInputResignation = document.getElementById('subject-id-input-resignation').value;
  const subjectNameInputResignation = document.getElementById('subject-name-input-resignation').value;
  const noOutstandingDebtCheckbox = document.getElementById('no-outstanding-debt-checkbox').checked;
  const outstandingDebtCheckbox = document.getElementById('outstanding-debt-checkbox').checked;
  const amountInput = document.getElementById('amount-input').value;
  const otherInput = document.getElementById('other-input').value;
  const reasonInput = document.getElementById('reason-input').value;
  const lecturerInput = document.getElementById('lecturer-input').value;

   const request = {
    studentUserName: studentUserName,
    lecturerUserName: "PENDING",
    status: "PENDING",
    dateTime: dateTime,
    subject: subjectInput,
    recipient: dearInput,
    name: nameInput,
    studentId: studentIdInput,
    academicYear: academicYearInput,
    department: departmentInput,
    address: addressInput,
    district: districtInput,
    region: regionInput,
    province: provinceInput,
    requestValue: selectedTopic,
    requestTopic: requestTopic,
    semester: semesterInput,
    subjectId: subjectIdInput,
    subjectName: subjectNameInput,
    section: sectionInput,
    resignSemester: subjectIdInputResignation,
    resignYear: subjectNameInputResignation,
    noDebt: noOutstandingDebtCheckbox,
    debt: outstandingDebtCheckbox,
    debtAmount: amountInput,
    other: otherInput,
    reason: reasonInput,
    lecturerReason: lecturerInput
   }

   fetch('http://localhost:8080/requests',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
   })
   .then(response => response.json())
   .then(data => {
    console.log('Successfully save request to the database')
    console.log(data)
   })
   .catch(error => {
    console.log('Error: ', error)
   })

   Swal.fire({
                    
    icon: "success",
    title: "บันทึกคําร้องสําเร็จ",
    text: "คําร้องของคุณได้ถูกบันทึกเเล้ว",
    showConfirmButton: false

   });
   setTimeout(function() {
   window.location.href = "myrequest.html";
   }, 1000);

}

//load request on myrequest page(view, cancel)
function loadRequestsTest(){
  const studentUserName = localStorage.getItem('studentUserName');
  const myRequestContainer = document.querySelector('.myrequest-container');
  fetch(`http://localhost:8080/requests/studentUserName/${studentUserName}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {

    const title = myRequestContainer.querySelector('.title');

    myRequestContainer.innerHTML = '';

    myRequestContainer.appendChild(title);

    data.forEach((item, index) => {
    const myrequest = document.createElement('div');
    myrequest.classList.add('request-list');
    myRequestContainer.appendChild(myrequest);

    const requestListLeft = document.createElement('div');
    requestListLeft.classList.add('request-list-left');
    myrequest.appendChild(requestListLeft);

    const requestListRight = document.createElement('div');
    requestListRight.classList.add('request-list-right');
    myrequest.appendChild(requestListRight);

    const requestName = document.createElement('div');
    requestName.classList.add('request-name');
    requestListLeft.appendChild(requestName);
    requestName.textContent = `${item.requestTopic}`;

    const requestStatus = document.createElement('div');
    
    //save button on requestform and requestdetails page
    if(item.status === "PENDING"){
      requestStatus.classList.add('request-status-grey');
    }
    
    //submit button on requestform and requestdetails page
    if(item.status === "WAITING FOR APPROVAL"){
      requestStatus.classList.add("request-status-yellow");
    }
    
    //reject button on professordetails page
    if(item.status === "REJECTED"){
      requestStatus.classList.add('request-status-red');
    }
    
    //approve button on profressor details page
    if(item.status === "APPROVED BY LECTURER"){
      requestStatus.classList.add('request-status-green');
    }

    requestListLeft.appendChild(requestStatus);
    requestStatus.textContent = `${item.status}`;

    const submitDateTime = document.createElement('div');
    submitDateTime.classList.add('submite-date-time');
    requestListLeft.appendChild(submitDateTime);
    submitDateTime.textContent = `${item.dateTime}`;

    const viewButton = document.createElement('button');
    viewButton.setAttribute('id','view-button-myrequest');
    viewButton.dataset.requestId = item.id; //data-request-id
    requestListRight.appendChild(viewButton);
    viewButton.textContent = `view`;

    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('id','cancel-button-myrequest');
    cancelButton.dataset.requestId = item.id;
    requestListRight.appendChild(cancelButton);
    cancelButton.textContent = `ยกเลิก`;

    viewButton.addEventListener('click', () => {
      const requestId = viewButton.dataset.requestId;
      window.location.href = `requestdetails.html?id=${requestId}`;
    })

    cancelButton.addEventListener('click', () => {
      Swal.fire({
        title: "Are you sure you want to cancel this request?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: `No`
      }).then((result) => {
        
        if (result.isConfirmed) {
          Swal.fire("The request has been successfully canceled.", "", "success");
          const requestId = cancelButton.dataset.requestId;
          fetch(`http://localhost:8080/requests/${requestId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          })
          .catch(error => {
            console.log('Error: ', error)
          })
          
          setTimeout(function() {
            location.reload();
          }, 1000);
          //loadRequestsTest();
        } //if
      }) //Swal.then
    }); //cancel eventListener

    }) //data.forEach
  })
  .catch(error => {
    console.log('Error: ', error)
  })
}

//load request on professordashboard page(view)
function loadRequestsLecturer(){
  const lecturerUserName = localStorage.getItem('username');
  const myRequestContainerLecturer = document.querySelector('.myrequest-container-lecturer');
  fetch(`http://localhost:8080/requests/lecturerUserName/${lecturerUserName}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
  }) //fetch
  .then(response => response.json())
  .then(data => {
    const titleLecturer = myRequestContainerLecturer.querySelector('.title-lecturer');

    myRequestContainerLecturer.innerHTML = '';

    myRequestContainerLecturer.appendChild(titleLecturer);

    data.forEach((item, index) => {
    const myrequest = document.createElement('div');
    myrequest.classList.add('request-list');
    myRequestContainerLecturer.appendChild(myrequest);

    const requestListLeft = document.createElement('div');
    requestListLeft.classList.add('request-list-left');
    myrequest.appendChild(requestListLeft);

    const requestListRight = document.createElement('div');
    requestListRight.classList.add('request-list-right');
    myrequest.appendChild(requestListRight);

    const requestName = document.createElement('div');
    requestName.classList.add('request-name');
    requestListLeft.appendChild(requestName);
    requestName.textContent = `${item.requestTopic}`;

    const requestStatus = document.createElement('div');
    requestStatus.classList.add('request-status');
    requestListLeft.appendChild(requestStatus);
    requestStatus.textContent = `${item.studentUserName}`;

    const submitDateTime = document.createElement('div');
    submitDateTime.classList.add('submite-date-time');
    requestListLeft.appendChild(submitDateTime);
    submitDateTime.textContent = `${item.dateTime}`;

    const viewButton = document.createElement('button');
    viewButton.setAttribute('id','view-button-myrequest');
    viewButton.dataset.requestId = item.id; //data-request-id
    requestListRight.appendChild(viewButton);
    viewButton.textContent = `view`;

    viewButton.addEventListener('click', () => {
      const requestId = viewButton.dataset.requestId;
      window.location.href = `professordetails.html?id=${requestId}`;
    })

    }) //for each
  }) //then
  .catch(error => {
    console.log('Error: ', error)
  }) //catch

}

//view request details on requestdetails page
function getRequestDetails(){
  const urlParams = new URLSearchParams(window.location.search);
  const requestId = urlParams.get('id');
  const fileSubmit = document.querySelector('.file-submit');
  
  const saveButton = document.createElement('button');
  saveButton.textContent = "SAVE";
  saveButton.dataset.requestId = requestId;
  saveButton.setAttribute('id', 'save-button-requestdetails');
  saveButton.setAttribute('type', 'button');
  fileSubmit.appendChild(saveButton);

  const submitButton = document.createElement('button');
  submitButton.textContent = `ยื่นคําร้อง`;
  submitButton.dataset.requestId = requestId;
  submitButton.setAttribute('id', 'submit-button-requestdetails');
  submitButton.setAttribute('type', 'button');
  fileSubmit.appendChild(submitButton);

  saveButton.addEventListener('click', () => {
    updateRequestBySave(requestId);
  })

  submitButton.addEventListener('click', () => {
    updateRequestBySubmit(requestId);
  })
  
  fetch(`http://localhost:8080/requests/id/${requestId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    document.getElementById('subject-input').value = data.subject;
    document.getElementById('dear-input').value = data.recipient;
    document.getElementById('name-input').value = data.name;
    document.getElementById('student-id-input').value = data.studentId;
    document.getElementById('academicyear-input').value = data.academicYear;
    document.getElementById('department-input').value = data.department;
    document.getElementById('address-input').value = data.address;
    document.getElementById('district-input').value = data.district;
    document.getElementById('region-input').value = data.region;
    document.getElementById('province-input').value = data.province;
    document.getElementById('request-topic-input').value = data.requestTopic;
    if(data.requestValue === "late-registration" || data.requestValue === "drop-w" || data.requestValue === "cross-program"){
      console.log("Hello");
      document.getElementById("resignation-fields").classList.add("hidden");
      document.getElementById("other-fields").classList.add("hidden");
    }

    if(data.requestValue === "resignation"){
      console.log("Hello2");
      document.getElementById("resignation-fields").classList.remove("hidden");
      document.getElementById("common-fields").classList.add("hidden");
      document.getElementById("other-fields").classList.add("hidden");
    }  

    if(data.requestValue === "other"){
     console.log("Hello3");
     document.getElementById("other-fields").classList.remove("hidden");
     document.getElementById("common-fields").classList.add("hidden");
     document.getElementById("resignation-fields").classList.add("hidden");
    }
    document.getElementById('semester-input').value = data.semester;
    document.getElementById('subject-id-input').value = data.subjectId;
    document.getElementById('subject-name-input').value = data.subjectName;
    document.getElementById('section-input').value = data.section;
    document.getElementById('subject-id-input-resignation').value = data.resignSemester;
    document.getElementById('subject-name-input-resignation').value = data.resignYear;
    if(data.noDebt === "true"){
      document.getElementById('no-outstanding-debt-checkbox').checked = true;
      document.getElementById('outstanding-debt-checkbox').checked = false;
    }
    if(data.debt === "true"){
      document.getElementById('no-outstanding-debt-checkbox').checked = false;
      document.getElementById('outstanding-debt-checkbox').checked = true;
      document.getElementById('amount-input').value = data.debtAmount;
    }
    document.getElementById('amount-input').value = data.debtAmount;
    document.getElementById('other-input').value = data.other;
    document.getElementById('reason-input').value = data.reason;
    document.getElementById('lecturer-input').value = data.lecturerReason;

    /*added part*/
    if(data.status === "WAITING FOR APPROVAL"){
      saveButton.disabled = true;
      submitButton.disabled = true;
    }


  })
  .catch(error => {
    console.log('Error: ', error)
  })
}

//view request details on professordetails page
function getRequestDetailsProfessor(){
  const urlParams = new URLSearchParams(window.location.search);
  const requestId = urlParams.get('id');
  const fileSubmit = document.querySelector('.file-submit');
  
  const rejectButton = document.createElement('button');
  rejectButton.textContent = `ไม่อนุมัติ`;
  rejectButton.dataset.requestId = requestId;
  rejectButton.setAttribute('id', 'reject-button-professordetails');
  rejectButton.setAttribute('type', 'button');
  fileSubmit.appendChild(rejectButton);

  const approveButton = document.createElement('button');
  approveButton.textContent = `อนุมัติ`;
  approveButton.dataset.requestId = requestId;
  approveButton.setAttribute('id', 'approve-button-professordetails');
  approveButton.setAttribute('type', 'button');
  fileSubmit.appendChild(approveButton);

  rejectButton.addEventListener('click', () => {
    rejectRequest(requestId);
  })

  approveButton.addEventListener('click', () => {
    approveRequest(requestId);
  })
  
  fetch(`http://localhost:8080/requests/id/${requestId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    document.getElementById('subject-input').value = data.subject;
    document.getElementById('dear-input').value = data.recipient;
    document.getElementById('name-input').value = data.name;
    document.getElementById('student-id-input').value = data.studentId;
    document.getElementById('academicyear-input').value = data.academicYear;
    document.getElementById('department-input').value = data.department;
    document.getElementById('address-input').value = data.address;
    document.getElementById('district-input').value = data.district;
    document.getElementById('region-input').value = data.region;
    document.getElementById('province-input').value = data.province;
    document.getElementById('request-topic-input').value = data.requestTopic;
    if(data.requestValue === "late-registration" || data.requestValue === "drop-w" || data.requestValue === "cross-program"){
      console.log("Hello");
      document.getElementById("resignation-fields").classList.add("hidden");
      document.getElementById("other-fields").classList.add("hidden");
    }

    if(data.requestValue === "resignation"){
      console.log("Hello2");
      document.getElementById("resignation-fields").classList.remove("hidden");
      document.getElementById("common-fields").classList.add("hidden");
      document.getElementById("other-fields").classList.add("hidden");
    }  

    if(data.requestValue === "other"){
     console.log("Hello3");
     document.getElementById("other-fields").classList.remove("hidden");
     document.getElementById("common-fields").classList.add("hidden");
     document.getElementById("resignation-fields").classList.add("hidden");
    }
    document.getElementById('semester-input').value = data.semester;
    document.getElementById('subject-id-input').value = data.subjectId;
    document.getElementById('subject-name-input').value = data.subjectName;
    document.getElementById('section-input').value = data.section;
    document.getElementById('subject-id-input-resignation').value = data.resignSemester;
    document.getElementById('subject-name-input-resignation').value = data.resignYear;
    if(data.noDebt === "true"){
      document.getElementById('no-outstanding-debt-checkbox').checked = true;
      document.getElementById('outstanding-debt-checkbox').checked = false;
    }
    if(data.debt === "true"){
      document.getElementById('no-outstanding-debt-checkbox').checked = false;
      document.getElementById('outstanding-debt-checkbox').checked = true;
      document.getElementById('amount-input').value = data.debtAmount;
    }
    document.getElementById('amount-input').value = data.debtAmount;
    document.getElementById('other-input').value = data.other;
    document.getElementById('reason-input').value = data.reason;
    document.getElementById('lecturer-input').value = data.lecturerReason;


  })
  .catch(error => {
    console.log('Error: ', error)
  })
}

//save button on requestdetails page
function updateRequestBySave(requestId){
  const studentUserName = localStorage.getItem('studentUserName');
  const dateTime = new Date().toLocaleString();
  const subjectInput = document.getElementById('subject-input').value;
  const dearInput = document.getElementById('dear-input').value;
  const nameInput = document.getElementById('name-input').value;
  const studentIdInput = document.getElementById('student-id-input').value;
  const academicYearInput = document.getElementById('academicyear-input').value;
  const departmentInput = document.getElementById('department-input').value;
  const addressInput = document.getElementById('address-input').value;
  const districtInput = document.getElementById('district-input').value;
  const regionInput = document.getElementById('region-input').value;
  const provinceInput = document.getElementById('province-input').value;
  const selectedTopic = localStorage.getItem('selectedTopic');
  const requestTopic = localStorage.getItem('selectSaveText');
  const semesterInput = document.getElementById('semester-input').value;
  const subjectIdInput = document.getElementById('subject-id-input').value;
  const subjectNameInput = document.getElementById('subject-name-input').value;
  const sectionInput = document.getElementById('section-input').value;
  const subjectIdInputResignation = document.getElementById('subject-id-input-resignation').value;
  const subjectNameInputResignation = document.getElementById('subject-name-input-resignation').value;
  const noOutstandingDebtCheckbox = document.getElementById('no-outstanding-debt-checkbox').checked;
  const outstandingDebtCheckbox = document.getElementById('outstanding-debt-checkbox').checked;
  const amountInput = document.getElementById('amount-input').value;
  const otherInput = document.getElementById('other-input').value;
  const reasonInput = document.getElementById('reason-input').value;
  const lecturerInput = document.getElementById('lecturer-input').value;

   const request = {
    studentUserName: studentUserName,
    lecturerUserName: "PENDING",
    status: "PENDING",
    dateTime: dateTime,
    subject: subjectInput,
    recipient: dearInput,
    name: nameInput,
    studentId: studentIdInput,
    academicYear: academicYearInput,
    department: departmentInput,
    address: addressInput,
    district: districtInput,
    region: regionInput,
    province: provinceInput,
    requestValue: selectedTopic,
    requestTopic: requestTopic,
    semester: semesterInput,
    subjectId: subjectIdInput,
    subjectName: subjectNameInput,
    section: sectionInput,
    resignSemester: subjectIdInputResignation,
    resignYear: subjectNameInputResignation,
    noDebt: noOutstandingDebtCheckbox,
    debt: outstandingDebtCheckbox,
    debtAmount: amountInput,
    other: otherInput,
    reason: reasonInput,
    lecturerReason: lecturerInput
   }

   fetch(`http://localhost:8080/requests/${requestId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
   })
   .then(response => response.json())
   .then(data => {
    console.log(data)
   })
   .catch(error => {
    console.log('Error: ', error)
   })

   Swal.fire({
                    
    icon: "success",
    title: "บันทึกคําร้องสําเร็จ",
    text: "คําร้องของคุณได้ถูกบันทึกเเล้ว",
    showConfirmButton: false

   });

   setTimeout(function() {
    location.reload();
   }, 1000);
  
}

//submit button on requestdetails page
function updateRequestBySubmit(requestId){
  const studentUserName = localStorage.getItem('studentUserName');
  const lecturerUserName = localStorage.getItem('lecturerUserName');
  const dateTime = new Date().toLocaleString();
  const subjectInput = document.getElementById('subject-input').value;
  const dearInput = document.getElementById('dear-input').value;
  const nameInput = document.getElementById('name-input').value;
  const studentIdInput = document.getElementById('student-id-input').value;
  const academicYearInput = document.getElementById('academicyear-input').value;
  const departmentInput = document.getElementById('department-input').value;
  const addressInput = document.getElementById('address-input').value;
  const districtInput = document.getElementById('district-input').value;
  const regionInput = document.getElementById('region-input').value;
  const provinceInput = document.getElementById('province-input').value;
  const selectedTopic = localStorage.getItem('selectedTopic');
  const requestTopic = localStorage.getItem('selectSaveText');
  const semesterInput = document.getElementById('semester-input').value;
  const subjectIdInput = document.getElementById('subject-id-input').value;
  const subjectNameInput = document.getElementById('subject-name-input').value;
  const sectionInput = document.getElementById('section-input').value;
  const subjectIdInputResignation = document.getElementById('subject-id-input-resignation').value;
  const subjectNameInputResignation = document.getElementById('subject-name-input-resignation').value;
  const noOutstandingDebtCheckbox = document.getElementById('no-outstanding-debt-checkbox').checked;
  const outstandingDebtCheckbox = document.getElementById('outstanding-debt-checkbox').checked;
  const amountInput = document.getElementById('amount-input').value;
  const otherInput = document.getElementById('other-input').value;
  const reasonInput = document.getElementById('reason-input').value;
  const lecturerInput = document.getElementById('lecturer-input').value;

   const request = {
    studentUserName: studentUserName,
    lecturerUserName: lecturerUserName,
    status: "WAITING FOR APPROVAL",
    dateTime: dateTime,
    subject: subjectInput,
    recipient: dearInput,
    name: nameInput,
    studentId: studentIdInput,
    academicYear: academicYearInput,
    department: departmentInput,
    address: addressInput,
    district: districtInput,
    region: regionInput,
    province: provinceInput,
    requestValue: selectedTopic,
    requestTopic: requestTopic,
    semester: semesterInput,
    subjectId: subjectIdInput,
    subjectName: subjectNameInput,
    section: sectionInput,
    resignSemester: subjectIdInputResignation,
    resignYear: subjectNameInputResignation,
    noDebt: noOutstandingDebtCheckbox,
    debt: outstandingDebtCheckbox,
    debtAmount: amountInput,
    other: otherInput,
    reason: reasonInput,
    lecturerReason: lecturerInput
   }

   fetch(`http://localhost:8080/requests/${requestId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
   })
   .then(response => response.json())
   .then(data => {
    console.log(data)
   })
   .catch(error => {
    console.log('Error: ', error)
   })

   Swal.fire({
                    
    icon: "success",
    title: "ยื่นคําร้องสําเร็จ",
    text: "คําร้องของคุณอยู่ในขั้นตอนการดําเนินการ",
    showConfirmButton: false

   });
   setTimeout(function() {
   window.location.href = "myrequest.html";
   }, 1000);
  
}

//reject request
function rejectRequest(requestId){
  const studentUserName = localStorage.getItem('studentUserName');
  const lecturerUserName = localStorage.getItem('lecturerUserName');
  const dateTime = new Date().toLocaleString();
  const subjectInput = document.getElementById('subject-input').value;
  const dearInput = document.getElementById('dear-input').value;
  const nameInput = document.getElementById('name-input').value;
  const studentIdInput = document.getElementById('student-id-input').value;
  const academicYearInput = document.getElementById('academicyear-input').value;
  const departmentInput = document.getElementById('department-input').value;
  const addressInput = document.getElementById('address-input').value;
  const districtInput = document.getElementById('district-input').value;
  const regionInput = document.getElementById('region-input').value;
  const provinceInput = document.getElementById('province-input').value;
  const selectedTopic = localStorage.getItem('selectedTopic');
  const requestTopic = localStorage.getItem('selectSaveText');
  const semesterInput = document.getElementById('semester-input').value;
  const subjectIdInput = document.getElementById('subject-id-input').value;
  const subjectNameInput = document.getElementById('subject-name-input').value;
  const sectionInput = document.getElementById('section-input').value;
  const subjectIdInputResignation = document.getElementById('subject-id-input-resignation').value;
  const subjectNameInputResignation = document.getElementById('subject-name-input-resignation').value;
  const noOutstandingDebtCheckbox = document.getElementById('no-outstanding-debt-checkbox').checked;
  const outstandingDebtCheckbox = document.getElementById('outstanding-debt-checkbox').checked;
  const amountInput = document.getElementById('amount-input').value;
  const otherInput = document.getElementById('other-input').value;
  const reasonInput = document.getElementById('reason-input').value;
  const lecturerInput = document.getElementById('lecturer-input').value;

   const request = {
    studentUserName: studentUserName,
    lecturerUserName: "REJECT",
    status: "REJECTED",
    dateTime: dateTime,
    subject: subjectInput,
    recipient: dearInput,
    name: nameInput,
    studentId: studentIdInput,
    academicYear: academicYearInput,
    department: departmentInput,
    address: addressInput,
    district: districtInput,
    region: regionInput,
    province: provinceInput,
    requestValue: selectedTopic,
    requestTopic: requestTopic,
    semester: semesterInput,
    subjectId: subjectIdInput,
    subjectName: subjectNameInput,
    section: sectionInput,
    resignSemester: subjectIdInputResignation,
    resignYear: subjectNameInputResignation,
    noDebt: noOutstandingDebtCheckbox,
    debt: outstandingDebtCheckbox,
    debtAmount: amountInput,
    other: otherInput,
    reason: reasonInput,
    lecturerReason: lecturerInput
   }

   fetch(`http://localhost:8080/requests/${requestId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
   })
   .then(response => response.json())
   .then(data => {
    console.log(data)
   })
   .catch(error => {
    console.log('Error: ', error)
   })

   Swal.fire({
                    
    icon: "success",
    title: "ไม่อนุมัติคําร้องของนักศึกษาสําเร็จ",
    text: "คําร้องของนักศึกษาจะถูกตีกลับ",
    showConfirmButton: false

   });
   setTimeout(function() {
   window.location.href = "professordashboard.html";
   }, 1000);
}

//approve request
function approveRequest(requestId){
  const studentUserName = localStorage.getItem('studentUserName');
  const dateTime = new Date().toLocaleString();
  const subjectInput = document.getElementById('subject-input').value;
  const dearInput = document.getElementById('dear-input').value;
  const nameInput = document.getElementById('name-input').value;
  const studentIdInput = document.getElementById('student-id-input').value;
  const academicYearInput = document.getElementById('academicyear-input').value;
  const departmentInput = document.getElementById('department-input').value;
  const addressInput = document.getElementById('address-input').value;
  const districtInput = document.getElementById('district-input').value;
  const regionInput = document.getElementById('region-input').value;
  const provinceInput = document.getElementById('province-input').value;
  const selectedTopic = localStorage.getItem('selectedTopic');
  const requestTopic = localStorage.getItem('selectSaveText');
  const semesterInput = document.getElementById('semester-input').value;
  const subjectIdInput = document.getElementById('subject-id-input').value;
  const subjectNameInput = document.getElementById('subject-name-input').value;
  const sectionInput = document.getElementById('section-input').value;
  const subjectIdInputResignation = document.getElementById('subject-id-input-resignation').value;
  const subjectNameInputResignation = document.getElementById('subject-name-input-resignation').value;
  const noOutstandingDebtCheckbox = document.getElementById('no-outstanding-debt-checkbox').checked;
  const outstandingDebtCheckbox = document.getElementById('outstanding-debt-checkbox').checked;
  const amountInput = document.getElementById('amount-input').value;
  const otherInput = document.getElementById('other-input').value;
  const reasonInput = document.getElementById('reason-input').value;
  const lecturerInput = document.getElementById('lecturer-input').value;

   const request = {
    studentUserName: studentUserName,
    lecturerUserName: "APPROVE",
    status: "APPROVED BY LECTURER",
    dateTime: dateTime,
    subject: subjectInput,
    recipient: dearInput,
    name: nameInput,
    studentId: studentIdInput,
    academicYear: academicYearInput,
    department: departmentInput,
    address: addressInput,
    district: districtInput,
    region: regionInput,
    province: provinceInput,
    requestValue: selectedTopic,
    requestTopic: requestTopic,
    semester: semesterInput,
    subjectId: subjectIdInput,
    subjectName: subjectNameInput,
    section: sectionInput,
    resignSemester: subjectIdInputResignation,
    resignYear: subjectNameInputResignation,
    noDebt: noOutstandingDebtCheckbox,
    debt: outstandingDebtCheckbox,
    debtAmount: amountInput,
    other: otherInput,
    reason: reasonInput,
    lecturerReason: lecturerInput
   }

   fetch(`http://localhost:8080/requests/${requestId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
   })
   .then(response => response.json())
   .then(data => {
    console.log(data)
   })
   .catch(error => {
    console.log('Error: ', error)
   })

   Swal.fire({
                    
    icon: "success",
    title: "อนุมัติคําร้องของนักศึกษาสําเร็จ",
    text: "คําร้องของนักศึกษาได้ถูกส่งไปยังขั้นตอนต่อไป",
    showConfirmButton: false

   });
   setTimeout(function() {
   window.location.href = "professordashboard.html";
   }, 1000);
}