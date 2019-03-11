const originalImg = document.getElementById('originalImg');
const filteredImg = document.getElementById('filteredImg');


function changeFilter(evt) {
  console.log(evt.target.checked);
}

function filterImg() {
  filteredImg.width = originalImg.width;
  filteredImg.height = originalImg.height;

  //TODO: Filter here

  filteredImg.getContext("2d").drawImage(originalImg, 0, 0, originalImg.width, originalImg.height);
}

originalImg.onload = filterImg;

document.getElementById('imgButton').onchange = (evt) => {
    let target = evt.target || window.event.srcElement;

    //Only one file is expected.
    let file = target.files[0];

    if (FileReader && file) {
        let reader = new FileReader();
        reader.onload = () => {
            originalImg.src = reader.result;
        }
        reader.readAsDataURL(file);
    }

    // No FileReader support
    else {
      //TODO: Handle cases where FileReader is not supported.
    }
};

document.getElementById('filterSwitch').onchange = changeFilter;
