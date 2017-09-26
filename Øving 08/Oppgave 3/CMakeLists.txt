cmake_minimum_required(VERSION 2.8)

project(multiprecision_example)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++1y -Wall -Wextra -Wno-unused-parameter -fpermissive")

find_package(Boost 1.53.0 REQUIRED)
include_directories(SYSTEM ${Boost_INCLUDE_DIR})

add_executable(multiprecision_example main.cpp)
