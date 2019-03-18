// nx, ny: image dimensions, width x pixels and height y pixels.
// hx, hy: window radius in x and y directions.
// input: input image.
// output: output image.
//
// Pixel (x,y) for 0 <= x < nx and 0 <= y < ny is located at
// in[x + y*nx] and out[x + y*nx].

function mf_js(ny, nx, hy, hx, input, output) {
  var x = 0,
  y = 0,
  median_x_start = 0,
  median_x_end = 0,
  median_y_start = 0,
  median_y_end = 0;

  for (var i = 0; i < nx*ny; ++i)
  {
    x = x % nx;

    if (x == 0) y = i / nx;

    var median_vector = Array((2*hx +1) * (2*hy + 1));

    var size = 0;

    median_x_start = x - hx;
    median_x_end = x + hx;


    if (median_x_start < 0) median_x_start = 0;
    if (median_x_end > nx - 1) median_x_end = nx - 1;

    median_y_start = y - hy;
    median_y_end = y + hy;

    if (median_y_start < 0) median_y_start = 0;
    if (median_y_end > ny - 1) median_y_end = ny - 1;

    for (var median_y = median_y_start; median_y <= median_y_end; ++median_y)
    {
      var row = nx*median_y;
      for (var median_x = median_x_start + row; median_x <= median_x_end + row;++median_x)
      {
        median_vector[size++] = input[median_x];
      }
    }

    var k = 0.0;

    median_vector.sort();
    if (size % 2 == 0)
    {
      var temp = 0;

      temp += median_vector[Math.floor(size/2)-1];
      temp += median_vector[Math.floor(size/2)];

      k = temp/2;
    }
    else
    {
      k = median_vector[Math.floor(size/2)];
    }

    output[i] = k;

    x++;

  }
}

module.exports = mf_js;
