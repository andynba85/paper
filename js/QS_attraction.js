
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


var select_id = [];
function showclick(id){

	if(select_id.length<=3)
	{	
		if(select_id.length == 3){
			if(document.getElementById(id).style.display == 'none'){
				window.alert("至多選三個");
			}
			else{
				document.getElementById(id).style.display = 'none';
				for (var i=0 ; i<select_id.length;i++){
					if(select_id[i] == id){
						select_id.splice(i,1);
						console.log(select_id);
						break;
					}
				}
			}
		}	
		else{
	
			if(document.getElementById(id).style.display == 'none'){
				select_id.push(id);
				console.log(select_id);
				document.getElementById(id).style.display = 'table-cell';
			}
			else{
				document.getElementById(id).style.display = 'none';
				for (var i=0 ; i<select_id.length;i++){
					if(select_id[i] == id){
						select_id.splice(i,1);
						console.log(select_id);
						break;
					}
				}
			}
		}		
    }
 }

let num = 0; 
//快速搜尋功能鍵，拿資料庫中的資料
function QS_attraction(){
	//document.getElementById("body").setAttribute("style","overflow:auto");
	console.log(select_id);
	//let slide_title = '<ul id="tabs-swipe-demo" class="tabs">';
	/*
    for(var j=1 ; j<select_id.length+1; j++){
		let id = "slide" + j.toString();
		let id2 = "swipe"+ j.toString();
		document.getElementById(id).style.display = 'table-cell';
		document.getElementById(id2).style.display = 'inline';
   */
   console.log(num);
   //console.log(document.getElementById(slide3));
   
  /*
   if(document.getElementById("slide1") == null){
  		console.log(87)
    	document.getElementById("slide").parentNode.insertAdjacentHTML('beforeend',`<li id="slide1" class="tab col s12"><a id="s1" href="#swipe1">Comfortable</a></li>`);
		document.getElementById("bslide").insertAdjacentHTML('beforeend',` <div id="swipe1" class="col s12 carousel-item" style="overflow: auto"><img src="">3</div>`);
   }
   if (document.getElementById("slide2") == null){
    	console.log(987987)
    	document.getElementById("slide").parentNode.insertAdjacentHTML('beforeend',`<li id="slide2" class="tab col s12"><a id="s2" href="#swipe2">Comfortable</a></li>`);
		document.getElementById("bslide").insertAdjacentHTML('beforeend',` <div id="swipe2" class="col s12 carousel-item" style="overflow: auto"><img src="">3</div>`);
   }
   if( document.getElementById("slide3") == null){
    	console.log(654654654)
		document.getElementById("slide").parentNode.insertAdjacentHTML('beforeend',`<li id="slide3" class="tab col s12"><a id="s3" href="#swipe3">Comfortable</a></li>`);
		document.getElementById("bslide").insertAdjacentHTML('beforeend',` <div id="swipe3" class="col s12 carousel-item" style="overflow: auto"><img src="">3</div>`);
    }
   */
    document.getElementById("bslide").innerHTML = ` <div class="col s12">
          <ul id="slide" class="tabs row center">
            <li id="slide1" class="tab col s12"><a id="s1" href="#swipe1">Popular</a></li>
            <li id="slide2" class="tab col s12"><a id="s2" href="#swipe2">Cool</a></li>
            <li id="slide3" class="tab col s12"><a id="s3" href="#swipe3">Comfortable</a></li>
          </ul>
        </div>
      
        <div id="swipe1" class="col s12 " style="overflow: auto"><img src="">1</div>
        <div id="swipe2" class="col s12 " style="overflow: auto"><img src=""/>2</div>
        <div id="swipe3" class="col s12 " style="overflow: auto"><img src="">3</div>
        `
  
    /*
	for(var j=3 ; j>select_id.length; j--){
		let id = "slide" + j.toString();
		let id2 = "swipe"+ j.toString();
		document.getElementById(id).style.display = 'none';
		document.getElementById(id2).style.display = 'none';
    }
    */
   
   
    for(var j=3 ; j>select_id.length; j--){
		let id = "slide" + j.toString();
		let id2 = "swipe"+ j.toString();
		document.getElementById(id).parentNode.removeChild(document.getElementById(id));
		document.getElementById(id2).parentNode.removeChild(document.getElementById(id2));
    }
    
    num = num+1;

		/*let content_pre =`
	          <li class="tab col s3"><a href="#${select_id[j]}">${select_id[j]}</a></li>
    	`
    	slide_title+=content_pre;
    	*/
 	

	//slide_title+=`</ul>`

    //const QS_attraction_section= document.querySelector('.section-about .row');
	//const QS_attraction_section= document.getElementById('test');
	
	for(var page=0;page<select_id.length;page++){
        let id="swipe" + (page+1).toString();
        let id_a="s" + (page+1).toString();
        document.getElementById(id_a).innerHTML = select_id[page];
  		const qscity = select_id[page];
	    //const QS_attraction_section= document.querySelector('.section-about .row');
	    //const QS_attraction_section= document.querySelector('#qs_result');
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
    
            let allcontent=``;
		    //allcontent +=`<div id="${qscity}" class="tabs-content">`;
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

  
		       allcontent += ` 
		            
		              <div class="col s4 m6">
		                <div class="card animated">
		                  <a class="modal-trigger" href="#${attraction_name}" target="_blank">
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
		              <div id="${attraction_name}" class="modal">
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

		      
		      `;
		      //allcontent+=content;
		            
		    }

		    allcontent+='</div>';
		    document.getElementById(id).innerHTML = allcontent;
		    //console.log(allcontent);

		    //QS_attraction_section.innerHTML = slide_title+allcontent;
		    //$('.modal').modal();
		    //$('.scrollspy').scrollSpy()
		    //$('.tabs').tabs();
		    //QS_attraction_section.innerHTML = slide_title + allcontent;
		    //QS_attraction_section.insertAdjacentHTML('beforeend', allcontent);
		    $('.modal').modal();
		    
    	});
    }

    $('.carousel.carousel-slider').carousel({
	    fullWidth: true,
	    
	  });
    $('.tabs').tabs({
	      swipeable:true,
	  });


    //點擊search完 將勾勾復原
    for(var page=0;page<select_id.length;page++){

    	document.getElementById(select_id[page]).style.display = 'none';
		
    }
     //把 select_id 都pop出來
    for(var page=0;page<3;page++){

    	select_id.pop();
		
    }
    
   
    //QS_attraction_section.insertAdjacentHTML('beforeend',slide_title);
}

