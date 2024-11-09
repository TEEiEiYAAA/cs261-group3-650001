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

     const submitForm = document.getElementById('requestform');

     if(submitForm){
          submitForm.addEventListener('submit', function(event){
              
          event.preventDefault();

          console.log("Form has been submitted successfully.");

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
          title: "Logged in",
          text: "Successfully Logged in",
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
          title: data.message,
          text: "Logged in Failed!!!!",
          showConfirmButton: false
        });

      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}