const originalImg = document.getElementById('originalImg');
const filteredImg = document.getElementById('filteredImg');


function changeFilter(evt) {
  console.log(evt.target.checked);

}

function filterImg() {
  filteredImg.width = originalImg.width;
  filteredImg.height = originalImg.height;

  var ctx = filteredImg.getContext("2d");
  ctx.drawImage(originalImg, 0, 0, originalImg.width, originalImg.height);
  var imgData = ctx.getImageData(0, 0, originalImg.width, originalImg.height);
  var data = imgData.data;

  //RGB channels
  var hDataIn = Array(imgData.width*imgData.height);
  var sDataIn = Array(imgData.width*imgData.height);
  var vDataIn = Array(imgData.width*imgData.height);

  var hDataOut = Array(imgData.width*imgData.height);
  var sDataOut = Array(imgData.width*imgData.height);
  var vDataOut = Array(imgData.width*imgData.height);

  //Copy HSV values
  for (var i = 0; i < imgData.width*imgData.height; i++) {
    //convert RGB to HSV.
    let color = tinycolor({ r: data[4*i], g: data[4*i+1], b: data[4*i+2] });
    color = color.toHsv();

    hDataIn[i] = color.h;
    sDataIn[i] = color.s;
    vDataIn[i] = color.v;
  }

  console.time("Filtering");
  mf_js(imgData.height, imgData.width, 1, 1, hDataIn, hDataOut);
  mf_js(imgData.height, imgData.width, 1, 1, sDataIn, sDataOut);
  mf_js(imgData.height, imgData.width, 1, 1, vDataIn, vDataOut);
  console.timeEnd("Filtering");

  for (var i = 0; i < imgData.width*imgData.height; i++) {
    let color = tinycolor({ h: hDataOut[i], s: sDataOut[i], v: vDataOut[i] });
    color = color.toRgb();

    data[i*4] = color.r;
    data[i*4 + 1] = color.g;
    data[i*4 + 2] = color.b;
  }

  ctx.putImageData(imgData, 0, 0);
}


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
originalImg.onload = filterImg;
