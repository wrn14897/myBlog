---
date: "2018-12-31"
title: "Buffer Overflows"
category: "Security"
---

Buffer overflows is one of most common bugs in C/C++ programs.
<br />
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
![alt text](https://storage.googleapis.com/warrenlee/myBlog/buffer%20overflows/stack1.jpg)

When func is called, a stack frame is created for this function.
<br />
Then the return address is pushed onto the stack.
<br />
Stack frame pointer is like linked list, chaining to the top of stack.
<br />
buf is initialized as size od 128 bytes, and strcpy will copy the input string into this local buffer.
> What happens if the argument is more than 128 bytes ?

The input string would overflow the buffer and overwrite return address.
![alt text](https://storage.googleapis.com/warrenlee/myBlog/buffer%20overflows/stack2.jpg)
<br />
So this function is not gonna return where its supposed to return.
<br />
This kinda attack is also called 'Control Hijacking Attack'.
> How does attacker determine return address ?

#### SolutionL: NOP slide
![alt text](https://storage.googleapis.com/warrenlee/myBlog/buffer%20overflows/NOP-slide.jpg)
<br />
Since attacker doesn't know the address of program P, 
what he would do is jump to random address and create a NOP slide (a sequence of no-op operations)