#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
 
int main()
{
    std::vector<int> v{1, 2, 3, 4, 3, 2, 1};

     for (auto i = v.begin(); i != v.end(); ++i)  std::cout << *i << ' ';

    std::cout << std::endl;
	 
    std::nth_element(v.begin(), v.begin() + 3, v.end()); 

    for (auto i = v.begin(); i != v.end(); ++i) std::cout << *i << ' ';

    std::cout << std::endl;
}
