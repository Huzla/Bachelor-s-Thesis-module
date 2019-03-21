const originalImg = document.getElementById('originalImg');
const jsFilteredImg = document.getElementById('jsFilteredImg');
const wasmFilteredImg = document.getElementById('wasmFilteredImg');
const dimsLabel = document.getElementById('dimlabel');

var dim = 1;

function filterImg() {
  jsFilteredImg.width = originalImg.width;
  jsFilteredImg.height = originalImg.height;
  wasmFilteredImg.width = originalImg.width;
  wasmFilteredImg.height = originalImg.height;

  var jsCtx = jsFilteredImg.getContext("2d");
  jsCtx.drawImage(originalImg, 0, 0, originalImg.width, originalImg.height);
  var jsImgData = jsCtx.getImageData(0, 0, originalImg.width, originalImg.height);
  var jsData = jsImgData.data;

  var waCtx = wasmFilteredImg.getContext("2d");
  waCtx.drawImage(originalImg, 0, 0, originalImg.width, originalImg.height);
  var waImgData = waCtx.getImageData(0, 0, originalImg.width, originalImg.height);
  var waData = waImgData.data;

  var length = jsImgData.width*jsImgData.height;
  //RGB channels
  var hDataIn = new Float32Array(length);
  var sDataIn = new Float32Array(length);
  var vDataIn = new Float32Array(length);

  var hDataOutjs = new Float32Array(length);
  var sDataOutjs = new Float32Array(length);
  var vDataOutjs = new Float32Array(length);

  //Copy HSV values
  for (var i = 0; i < length; i++) {
    //convert RGB to HSV.
    let color = tinycolor({ r: jsData[4*i], g: jsData[4*i+1], b: jsData[4*i+2] });
    color = color.toHsv();

    hDataIn[i] = color.h;
    sDataIn[i] = color.s;
    vDataIn[i] = color.v;
  }

  mf_js(jsImgData.height, jsImgData.width, dim, dim, hDataIn, hDataOutjs);
  mf_js(jsImgData.height, jsImgData.width, dim, dim, sDataIn, sDataOutjs);
  mf_js(jsImgData.height, jsImgData.width, dim, dim, vDataIn, vDataOutjs);

  try {
    //Allocate module memory.
    var hIn_buf = Module._malloc(length * hDataIn.BYTES_PER_ELEMENT);
    var sIn_buf = Module._malloc(length * hDataIn.BYTES_PER_ELEMENT);
    var vIn_buf = Module._malloc(length * hDataIn.BYTES_PER_ELEMENT);

    var hOut_buf = Module._malloc(length * hDataIn.BYTES_PER_ELEMENT);
    var sOut_buf = Module._malloc(length * hDataIn.BYTES_PER_ELEMENT);
    var vOut_buf = Module._malloc(length * hDataIn.BYTES_PER_ELEMENT);

    //Assign input values to memory.
    Module.HEAPF32.set(hDataIn, hIn_buf >> 2 );
    Module.HEAPF32.set(sDataIn, sIn_buf >> 2 );
    Module.HEAPF32.set(vDataIn, vIn_buf >> 2 );

    let filter = Module.cwrap("mf_wa", null, ["number", "number", "number", "number", "number", "number"]);

    //Call the wasm function.
    filter(jsImgData.height, jsImgData.width, dim, dim, hIn_buf, hOut_buf);
    filter(jsImgData.height, jsImgData.width, dim, dim, sIn_buf, sOut_buf);
    filter(jsImgData.height, jsImgData.width, dim, dim, vIn_buf, vOut_buf);

    var h = Module.HEAPF32.subarray(hOut_buf >> 2, hOut_buf+length);
    var s = Module.HEAPF32.subarray(sOut_buf >> 2, sOut_buf+length);
    var v = Module.HEAPF32.subarray(vOut_buf >> 2, vOut_buf+length);

    for (var i = 0; i < length; i++) {
      let color = tinycolor({ h: h[i], s: s[i], v: v[i] });
      color = color.toRgb();

      waData[i*4] = color.r;
      waData[i*4 + 1] = color.g;
      waData[i*4 + 2] = color.b;
    }


  } catch (e) {
    console.log(e);
  } finally {
    //Module memory needs to be freed.
    Module._free(hIn_buf);
    Module._free(sIn_buf);
    Module._free(vIn_buf);

    Module._free(hOut_buf);
    Module._free(sOut_buf);
    Module._free(vOut_buf);
  }

  for (var i = 0; i < length; i++) {
    let color = tinycolor({ h: hDataOutjs[i], s: sDataOutjs[i], v: vDataOutjs[i] });
    color = color.toRgb();

    jsData[i*4] = color.r;
    jsData[i*4 + 1] = color.g;
    jsData[i*4 + 2] = color.b;

  }

  waCtx.putImageData(waImgData, 0, 0);
  jsCtx.putImageData(jsImgData, 0, 0);
}

document.getElementById('dims').onchange = (evt) => {
  dim = parseInt(evt.target.value);
  dimsLabel.innerHTML = dim + 'X' + dim + ' dimension filter' ;
};
