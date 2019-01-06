---
date: "2018-12-31"
title: "Buffer Overflows"
category: "Security"
---

Buffer overflows is one of most common bugs in C/C++ programs.
<br />
Let's talk about some common buffer overflows.

### Stack Smashing

> What are buffer overflows ?

Consider the web server contains a function
```c
void func(char *str) {
  char buff[128];
  strcpy(buf, str);
  do-something(buf);
}
```
Let's look at the stack
<div>
  <img 
    src='https://storage.googleapis.com/warrenlee/myBlog/buffer%20overflows/stack1.jpg' 
    style="height: 80%; width:80%"
  >
</div>
When func is called, a stack frame is created for this function.
<br />
Then the return address is pushed onto the stack.
<br />
Stack frame pointer is like linked list, chaining to the top of stack.
<br />
buf is initialized as size of 128 bytes, and strcpy will copy the input string into this local buffer.
<br />
<br />

> What happens if the argument is more than 128 bytes ?

The input string would overflow the buffer and overwrite return address.
<div>
  <img 
    src='https://storage.googleapis.com/warrenlee/myBlog/buffer%20overflows/stack2.jpg' 
    style="height: 80%; width:80%"
  >
</div>
<br />
So this function is not gonna return where its supposed to return.
<br />
This kind of attack is also called 'Control Hijacking Attack'.
<br />
<br />

> But, how does attacker determine return address ?

#### SolutionL: NOP slide
<div>
  <img 
    src='https://storage.googleapis.com/warrenlee/myBlog/buffer%20overflows/NOP-slide.jpg' 
    style="height: 60%; width:60%"
  >
</div>
<br />
Since attacker doesn't know the address of program P, 
what he would do is jump to random address and create a NOP slide (a sequence of no-op operations).

And use NOP slides to tell if the overflow hits the target return address.

### Simple Exercise
In this example, 
we are going to see how attacker can take over the system 
by using stack smashing attack.

#### utils.h
```c
#ifndef UTILS_H
#define UTILS_H

// Takes a string literal and replaces hex characters
// '\xAA' with their true hex value.
char *hexify_str(char *str);

#endif
```

#### target.c
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include "target.h"
#include "utils.h"

#define BUF_SIZE 16

int bar(char *arg, char *out) {
  strcpy(out, arg);
  return 0;
}

void start_sh() {
  system("/bin/sh");
}

void echo(char *word) {
  char buf[BUF_SIZE];
  for (int i = 0; i < BUF_SIZE; i++) {
    buf[i] = 0;
  }
  hexify_str(word); 
  bar(word, buf);
  printf("You said: %s\n", buf);
}

void print_func_digest() {
  printf("Function digest: \n");
  printf("  bar      is at address: %p\n", bar);
  printf("  start_sh is at address: %p\n", start_sh);
  printf("  echo     is at address: %p\n", echo);
}
```

#### main.c
```c
#include <stdio.h>
#include <string.h>
#include "target.h"

#define INPUT_SIZE 64

int main(void)
{
	
  char input[INPUT_SIZE];
  printf("Welcome! I echo what you say. Enter Ctrl-C to stop the program.\n\n");
  print_func_digest();
  printf("\n");
  while (1) {
    printf("------------------------------\n");
    printf("Your input: ");
    fgets(input, INPUT_SIZE, stdin);
    /* Remove newline */
    input[strcspn(input, "\n")] = 0;
  	echo(input);
  }
}
```

Execute the program and the print out is
```
Welcome! I echo what you say. Enter Ctrl-C to stop the program.

Function digest:
  bar       is at address: 0x80485cf
  start_sh  is at address: 0x80485e7
  echo      is at address: 0x80485fa

------------------------------
Your input:
```

The process flow is 
1. get input stream and store it to a input buffer.
2. preprocessing
3. execute echo function, which copies input buffer to the other buffer with size of 16 bytes
4. postprocessing

> What if the input is '1...2...3...4...5...6...\xe7\x85\x04\x08'

<b>
  The first 16 bytes fulfill the buffer,
  <br />
  next 4 bytes are local variable (int i), 
  <br />
  and next 4 bytes take care of stack frame pointer.
  <br />
  And finally the rest overwrites return address.  
</b>

<div>
  <img 
    src='https://storage.googleapis.com/warrenlee/myBlog/buffer%20overflows/stack.jpg' 
    style="height: 60%; width:60%"
  >
</div>

### Heap Spraying
