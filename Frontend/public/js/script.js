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

      const selectedOption = hideFields.options[hideFields.selectedIndex];
      const selectText = selectedOption.textContent;

      localStorage.setItem('selectSaveText',selectText);

    });
  }

  // Display logged in name
  const userInfo = document.querySelector('.welcome-name');
  const displayname_th = localStorage.getItem('displayname_th');

  if (userInfo && displayname_th) {
    userInfo.textContent = `${displayname_th}`;
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
     
     const submitForm = document.getElementById('requestform');

     if(submitForm){
          submitForm.addEventListener('submit', function(event){
              
          event.preventDefault();

          console.log("Form has been submitted successfully.");

          formSubmission();

         })
     }

     //load requests on my request page
     const historyContainer = document.querySelector('.history-container');

     if(historyContainer){
      loadRequests();
     }

     //logout button
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
            Swal.fire("ออกจากระบบสําเร็จ", "", "success");
            localStorage.removeItem('displayname_th');
            setTimeout(function() {
              window.location.href = "login.html";
            }, 600);
          }
        });
      })
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
        Swal.fire({
                    
          icon: "success",
          title: "ล็อคอินสําเสร็จ",
          text: "เข้าสู่ระบบการยื่นคําร้องสําเร็จ",
          showConfirmButton: false
      
      });
      setTimeout(function() {
        window.location.href = "requestform.html";
      }, 1000);


      } else {

        console.log(data.message)
        console.log('Login Response:', data);

        Swal.fire({
          icon: "error",
          title: "ล็อคอินไม่สําเร็จ",
          text: "ไม่สามารถล็อคอินเข้าสู่ระบบได้",
          showConfirmButton: false
        });

      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
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

function formSubmission(){
  
  const savedText = localStorage.getItem('selectSaveText');

  const timeStamp = new Date().toLocaleString();

  const userNameTh = localStorage.getItem('displayname_th');

  let requests = JSON.parse(localStorage.getItem(`requests_${userNameTh}`)) || [];
  requests.push({savedText, timeStamp});
  localStorage.setItem(`requests_${userNameTh}`, JSON.stringify(requests));

  console.log(savedText);
  console.log(timeStamp);
  
  Swal.fire({
                    
    icon: "success",
    title: "ยื่นคําร้องสําเร็จ",
    text: "คําร้องของคุณถูกยื่นสําเร็จเเล้ว",
    showConfirmButton: false

  });
  setTimeout(function() {
  window.location.href = "myrequest.html";
  }, 1000);

}

function loadRequests(){
  const userNameTh = localStorage.getItem('displayname_th');
  const requests = JSON.parse(localStorage.getItem(`requests_${userNameTh}`)) || [];
  const myRequestContainer = document.querySelector('.myrequest-container');

  const title = myRequestContainer.querySelector('.title');

  myRequestContainer.innerHTML = '';

  myRequestContainer.appendChild(title);  

  requests.forEach((item, index) => {

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
    requestName.textContent = `${item.savedText}`;

    const submitDateTime = document.createElement('div');
    submitDateTime.classList.add('submite-date-time');
    requestListLeft.appendChild(submitDateTime);

    const submitDateTimeLeft = document.createElement('div');
    submitDateTimeLeft.classList.add('submit-date-time-left');
    submitDateTime.appendChild(submitDateTimeLeft);
    submitDateTimeLeft.textContent = `วันยื่นเรื่อง:`;

    const submitDateTimeRight = document.createElement('div');
    submitDateTimeRight.classList.add('submit-date-time-right');
    submitDateTime.appendChild(submitDateTimeRight);
    submitDateTimeRight.textContent = `${item.timeStamp}`;

    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('id','cancel-button');
    requestListRight.appendChild(cancelButton);
    cancelButton.textContent = `ยกเลิก`;

    
    cancelButton.addEventListener('click', () => {
      Swal.fire({
          title: "คุณต้องการที่จะยกเลิกคําร้อง?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Yes",
          denyButtonText: `No`
        }).then((result) => {
          
          if (result.isConfirmed) {
            Swal.fire("คําร้องของคุณได้ถูกยกเลิกเเล้ว", "", "success");
            
            requests.splice(index, 1); 
            localStorage.setItem(`requests_${userNameTh}`, JSON.stringify(requests));
            
            loadRequests();
          }
        });

    });


  })

}