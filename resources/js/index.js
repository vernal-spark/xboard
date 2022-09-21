function addAcc(i,data){
  console.log(i);
  document.getElementById("accordionID").innerHTML += `
  <div class="accordion-item">
    <h2 class="accordion-header" id="heading${i}">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
        ${data.feed.title}
      </button>
    </h2>
    <div id="collapse${i}" class="accordion-collapse collapse " aria-labelledby="heading${i}" data-bs-parent="#accordionID">
      <div class="accordion-body">
      <div id="carouselExampleControls${i}" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id="carousel-parent-${i}">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${i}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${i}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      </div>
    </div>
  </div>
  `;
  if(i==0){
    document.getElementById(`collapse${i}`).setAttribute("class","show");
  }
}
async function addAccordion() {
  for(let i=0;i<magazines.length;i++){
  let url = magazines[i];
  let res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`);
  let data = await res.json();
  addAcc(i,data);
  data.items.forEach((element,index) => {
    
    if(index==0){
      document.getElementById(`carousel-parent-${i}`).innerHTML+=`
    <div class="carousel-item active" id="card-parent-${i}-${index}">
      
    </div>`;
    }
    else{
      document.getElementById(`carousel-parent-${i}`).innerHTML+=`
    <div class="carousel-item " id="card-parent-${i}-${index}">
      
    </div>`;
    }
    document.getElementById(`card-parent-${i}-${index}`).innerHTML=`
    <div class="card" style="width: 100%;height:90%;">
    <a href="${element.link}" style="text-decoration:none;color:black;">
  <img src="${element.enclosure.link}" class="card-img-top" >
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${element.pubdate}  ${element.author}</h6>
    <p class="card-text">${element.description}</p>
  </div>
  </a>
</div>`;
  });
}
}
addAccordion();