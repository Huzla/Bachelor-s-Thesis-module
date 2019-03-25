#ifndef MFWA_H
#define MFWA_H
#include <vector>

// nx, ny: image dimensions, width x pixels and height y pixels.
// hx, hy: window radius in x and y directions.
// in: input image.
// out: output image.
//
// Pixel (x,y) for 0 <= x < nx and 0 <= y < ny is located at
// in[x + y*nx] and out[x + y*nx].
#ifdef __cplusplus
extern "C" {
#endif

void mf_wa(int ny, int nx, int hy, int hx, float* in, float* out);

#ifdef __cplusplus
}
#endif

#endif
