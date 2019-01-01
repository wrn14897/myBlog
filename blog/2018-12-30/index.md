---
date: "2018-12-30"
title: "Ciphers"
category: "Security"
---
To list some basic ciphers 
## One Time Pad
> Key has the same length, or longer than, the message being sent.
<br />
Its secure against one-time ciphertext-only attack. (Shannon, 1949)

![alt text](https://storage.googleapis.com/warrenlee/myBlog/ciphers/OTP-diagram.jpg)
![alt text](https://storage.googleapis.com/warrenlee/myBlog/ciphers/OTP-math.jpg)


## Stream Cipher
> OTP key is as long the message. 
<br />
Why not using a shorter pseudo‐random key to generate stream ciphertext ?

![alt text](https://storage.googleapis.com/warrenlee/myBlog/ciphers/stream-cipher-diagram.jpg)
<br />
However,
Stream Cipher is not perfect. There are two things to keep in mind.
1. Key can only be used for single message.
Below is the diagram shows why
![alt text](https://storage.googleapis.com/warrenlee/myBlog/ciphers/stream-cipher-attack-1.jpg)

2. No integrity: ciphertext can be modified in meaningful ways.
![alt text](https://storage.googleapis.com/warrenlee/myBlog/ciphers/stream-cipher-attack-2.jpg)

## Block Cipher
> A block cipher takes a block of plaintext bits and generates a block of ciphertext bits, generally of same size. The size of block is fixed in the given scheme. The choice of block size does not directly affect to the strength of encryption scheme. The strength of cipher depends up on the key length.

![alt text](https://storage.googleapis.com/warrenlee/myBlog/ciphers/block-cipher-idea.jpg)

It might sound straightforward to implement by simply dividing input text into blocks and applying hash functions.
But its not correct.
<br />
For example,
<br />
![alt text](https://storage.googleapis.com/warrenlee/myBlog/ciphers/example-ecb.jpg)
<br />
Also,
what if we encrypt the same message twice ? Can attacker learn the fact these two messages are actually the same ?
<br />
To solve issues above, <b>nonce-based encryption</b> and <b>cipher block chaining (CBC)</b> come to play 

### nonce-based Encryption
> nonce n: a value that changes from msg to msg. (k,n) pair never used more than once

![alt text](https://storage.googleapis.com/warrenlee/myBlog/ciphers/nonce-based-encryption.jpg)
1. Method 1: encryptor chooses a random nonce (e.g. 128 bits)
2. Method 2: nonce is a counter (e.g. packet counter)

### Cipher Block Chaining
> Cipher block chaining (CBC) is a mode of operation for a block cipher (one in which a sequence of bits are encrypted as a single unit or block with a cipher key applied to the entire block). Cipher block chaining uses what is known as an initialization vector (IV) of a certain length. One of its key characteristics is that it uses a chaining mechanism that causes the decryption of a block of ciphertext to depend on all the preceding ciphertext blocks. As a result, the entire validity of all preceding blocks is contained in the immediately previous ciphertext block.

![alt text](https://storage.googleapis.com/warrenlee/myBlog/ciphers/CBC-diagram.jpg)

FYI, the counter mode, which speeds up the encryption process by 
leveraging threads.
![alt text](https://storage.googleapis.com/warrenlee/myBlog/ciphers/CTR-diagram.jpg)
