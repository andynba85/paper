
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDMHSqUW_e7B8-iCsXqDWfXUWr2sqagYH8",
  authDomain: "triprec-30e5f.firebaseapp.com",
  databaseURL: "https://triprec-30e5f.firebaseio.com",
  projectId: "triprec-30e5f",
  storageBucket: "triprec-30e5f.appspot.com",
  messagingSenderId: "953678545738",
  appId: "1:953678545738:web:4253c956a3bff4aa3e37b3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//make auth and firestore reference
const auth = firebase.auth();
const db = firebase.firestore();
const dbtest = firebase.database();

// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in');
  } else {
    console.log('user logged out');
  }
});

//sign-up
const signupForm = document.querySelector('#signup-form');
signup.addEventListener('click', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user['uid']);
    
    dbtest.ref('users/'+ cred.user['uid']).set({
      useremail:email,
      userpassword:password
    }).then(()=>{
      M.toast({html: 'Sign up successfully!', classes: 'rounded'});
      console.log("success");
    });
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    
    // close the signup modal & reset form
    window.location.href='second.html';
    loginForm.reset();
  });

});


//快速搜尋功能鍵，拿資料庫中的資料
function QS_attraction(){

  const qscity = document.getElementById('1').value;
  const QS_attraction_section= document.querySelector('.section-about .row');
  
  //console.log(qscity)
  const attraction = dbtest.ref('attraction/'+qscity);
  attraction.on('value', function(snapshot) {
    console.log(snapshot.val());
    const data = snapshot.val();

    let data_key = [] ;
    for(var key in data){
      console.log(key);
      data_key.push(key);
      //data_attraction.push(data_attraction[key]);
    }
    console.log(data_key);

    let allcontent='';

    for(var i=0 ; i<data_key.length; i++){

       let attraction_name = data_key[i];
       //console.log(attraction_name);
       let attraction_img = data[attraction_name]['照片網址'];
       //console.log(attraction_img);
       let attraction_intro = data[attraction_name]['景點介紹'];
       //console.log(attraction_intro);
       let attraction_address = data[attraction_name]['詳細地點資訊']["地址"];
       //console.log(attraction_intro);
       let attraction_web = data[attraction_name]['詳細地點資訊']["網站"];
       //console.log(attraction_web);
       let attraction_tel = data[attraction_name]['詳細地點資訊']["電話"];
       //console.log(attraction_tel);
       let attraction_lontitude = data[attraction_name]['詳細地點資訊']["經度"];
       //console.log(attraction_lontitude);
       let attraction_latitude = data[attraction_name]['詳細地點資訊']["緯度"];
       //console.log(attraction_latitude);
       
       let content = ` 

              <div class="col s4 m6">
                <div class="card animated">
                  <a class="modal-trigger" href="#${i}" target="_blank">
                    <div class="card-image" style="background-image: url('${attraction_img}');">
                      <div class="overlay"></div>
                      <span class="card-title">
                        ${attraction_name}
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              <!-- Modal Structure -->
              <div id="${i}" class="modal">
                <div class="modal-content">
                  <h4>${attraction_name}</h4>
                  <div class="row">
                    <div class="col s12 m7">
                      <div class="card">
                        <div class="card-image">
                          <img src="${attraction_img}">
                          <span class="card-title">Card Title</span>
                        </div>
                        <div class="card-content">
                          <p>${attraction_intro}</p>
                        </div>
                        <div class="card-action">
                          <a href="${attraction_web}">相關網站</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <a href="fourth.html" class="modal-close waves-effect waves-green btn-flat">back</a>
                </div>
              </div>

      
      `
      allcontent+=content;
            
    };

    QS_attraction_section.innerHTML = allcontent;
    $('.modal').modal();


  });

};


