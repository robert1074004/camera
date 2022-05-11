camera_list = [{name:"相機",image:"/images/相機.jpg",price:1000,category:["canon 90D","canon 80D","canon 60D"]},{name:"腳架",image:"/images/腳架.jpg",price:500,category:["腳架1","腳架2","腳架3"]},{name:"攝影機",image:"/images/攝影機.jpg",price:1500,category:["攝影機1","攝影機2","攝影機3"]},{name:"記憶卡",image:"/images/記憶卡.jpg",price:100,category:["記憶卡1","記憶卡2","記憶卡3"]}]
main_pannel = document.querySelector('#camera_pannel')
let htmlcontent = ``
camera_list.forEach(item => {
    htmlcontent += `    <div class="col mb-3">
    <div class="card border border-dark border-2">
      <img src="${item.image}" width="120" height="120"  alt="..." class="mx-auto">
      <div class="card-body text-center">
        <h5 class="card-title text-center">${item.name}</h5>
        <p class="card-text"> $NT ${item.price} / 1天</p>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${item.name}">
          租借${item.name}
      </button>
      </div>
    </div>
  </div>
  <div class="modal fade" id="${item.name}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title" id="exampleModalLabel">${item.name}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="my-2 mx-auto text-center" style="width:125px;">
            <img src="${item.image}" width="120" height="120" alt="..." class="mx-auto">
            <div class="form-check my-3">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
              <label class="form-check-label" for="flexRadioDefault1">
                ${item.category[0]}
              </label>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
              <label class="form-check-label" for="flexRadioDefault1">
              ${item.category[1]}
              </label>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
              <label class="form-check-label" for="flexRadioDefault1">
              ${item.category[2]}
              </label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`
});
main_pannel.innerHTML = htmlcontent