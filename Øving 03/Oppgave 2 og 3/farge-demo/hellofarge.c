#include <stdio.h>
#include "fargeskrift.h"

const int max = 7;

//Demonstrerer ANSI-farger
void fargedemo() {
	farge_printf(7, 4, "Hello farge! :)\n");
    farge_printf(6, 1, ":)\n");
    farge_printf(9, 9, "\n");
}

int main(int argc, char *argv[]) {
	fargedemo();
}

