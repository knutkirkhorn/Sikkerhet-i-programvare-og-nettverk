cmake_minimum_required(VERSION 2.8)

project(crypto)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++1y -Wall -Wextra -Wno-unused-parameter")

if(APPLE)
  set(OPENSSL_ROOT_DIR "/usr/local/opt/openssl")
endif()

find_package(OpenSSL REQUIRED)
include_directories(${OPENSSL_INCLUDE_DIR})

add_executable(main main.cpp)
target_link_libraries(main ${OPENSSL_CRYPTO_LIBRARY})

add_executable(asdf asdf.cpp)
target_link_libraries(asdf ${OPENSSL_CRYPTO_LIBRARY})

enable_testing()
add_subdirectory(tests)
