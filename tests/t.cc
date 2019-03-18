#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
#include "../wa/mf_wa.h"

int main()
{
    std::vector<float> in = {65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39};
    std::vector<float> out = {65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39};

    mf_wa(3,5,2,2,in,out);

    for (auto i = out.begin(); i != out.end(); ++i)  std::cout << *i << ' ';

    std::cout << std::endl;
}
