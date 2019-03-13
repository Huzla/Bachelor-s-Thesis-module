// nx, ny: image dimensions, width x pixels and height y pixels.
// hx, hy: window radius in x and y directions.
// input: input image.
// output: output image.
//
// Pixel (x,y) for 0 <= x < nx and 0 <= y < ny is located at
// in[x + y*nx] and out[x + y*nx].

function partion(arr, left, right, pivot: Int) {

    val pivotV = arr(pivot)

    var min = left
    var max = right
    var i = left

    while (min < max && i <= max) {
      if (arr(i) < pivotV) {
        val temp = arr(min)

        arr(min) = arr(i)

        arr(i) = temp

        i += 1

        min += 1

      }
      else if (arr(i) > pivotV) {
        val temp = arr(max)
        arr(max) = arr(i)
        arr(i) = temp
        max -= 1
      }
      else {
        i+=1
      }
    }
    (min,max)
  }

function quickSelect(arr, left, right, k) {

  if (left == right) return arr(left)
  val pivot = left + rand.nextInt((right - left + 1)); //get the index of random pivot

  var (min,max)  = partion(arr, left, right, pivot)

  if (min <= k && k <= max) return arr(k)
  else if (k < min) return quickSelect(arr, left, min-1, k)
  else return quickSelect(arr,max + 1, right, k)

}

function mf_js(ny, nx, hy, hx, input, output) {
  var x = 0,
  y = 0,
  median_x_start,
  median_x_end,
  median_y_start,
  median_y_end;

  for (let i = 0; i < nx*ny; ++i)
  {
    x = x % nx;

    if (x == 0) y = i / nx;

    median_vector = [(2*hx +1) * (2*hy + 1)];
    var size = 0;

    median_x_start = x - hx;
    median_x_end = x + hx;


    if (median_x_start < 0) median_x_start = 0;
    if (median_x_end > nx - 1) median_x_end = nx - 1;

    median_y_start = y - hy;
    median_y_end = y + hy;

    if (median_y_start < 0) median_y_start = 0;
    if (median_y_end > ny - 1) median_y_end = ny - 1;

    for (int median_y = median_y_start; median_y <= median_y_end; ++median_y)
    {
      var row = nx*median_y;
      for (var median_x = median_x_start + row; median_x <= median_x_end + row;++median_x)
      {
        median_vector[size++] = input[median_x];
      }
    }

    var k = 0.0;

    if (size % 2 == 0)
    {
      var temp = 0;
      median_vector = nth_element(median_vector, 0, size/2-1, size);

      temp += median_vector[size/2-1];
      median_vector = nth_element(median_vector, 0, size/2, size);

      temp += median_vector[size/2];

      k = temp/2;
    }
    else
    {
      median_vector = nth_element(median_vector, 0, size/2, size);
      k = median_vector[size/2];
    }


    out[i] = k;

    ++x;

  }
}

module.exports = mfJs;
