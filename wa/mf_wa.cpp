#include "mf_wa.h"
#include <algorithm>
#include <emscripten/emscripten.h>
//#include <vector>
//#include <chrono>
//#include <iostream>

#ifdef __cplusplus
extern "C" {
#endif

void  mf_wa(int ny, int nx, int hy, int hx, float* in, float* out) {

	//std::chrono::high_resolution_clock::time_point t1 = std::chrono::high_resolution_clock::now();

	int iterations = 0;

	int x = 0;
	int y = 0;
	int median_x_start;
	int median_x_end;
	int median_y_start;
	int median_y_end;


	for (int i = 0; i < nx*ny; ++i)
	{
		x = x % nx;

		if (x == 0) y = i / nx;

		std::vector<float> median_vector((2*hx +1) * (2*hy + 1));
		int size = 0;

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
			int row = nx*median_y;
			for (int median_x = median_x_start + row; median_x <= median_x_end + row;++median_x)
			{
				median_vector[size++] = in[median_x];
			}
		}

		double k = 0;
		auto b = median_vector.begin();
		auto e = median_vector.begin() + size;

		if (size % 2 == 0)
		{
			double temp = 0;
			std::nth_element(median_vector.begin(), median_vector.begin() + size/2-1, median_vector.begin() + size);
			temp += median_vector[size/2-1];
			std::nth_element(median_vector.begin(), median_vector.begin() + size/2, median_vector.begin() + size);
			temp += median_vector[size/2];

			k = temp/2;
		}
		else
		{
			std::nth_element(median_vector.begin(), median_vector.begin() + size/2, median_vector.begin() + size);
			k = median_vector[size/2];
		}


		out[i] = k;

		++x;

	}

//	std::chrono::high_resolution_clock::time_point t2 = std::chrono::high_resolution_clock::now();
//	auto duration = std::chrono::duration_cast<std::chrono::milliseconds>( t2 - t1 ).count();
//	std::cout << duration << "ms" << std::endl;
}

#ifdef __cplusplus
}
#endif
