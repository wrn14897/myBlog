---
date: "2020-06-02"
title: "Decorator vs. Proxy"
category: "Design Pattern"
---

Recently I have been playing around with couple essential design patterns and 
want to write down my thoughts and compare them.

The two patterns (`Decorator` and `Proxy`) are similar but not identical.
<br />
Let's talk about what they are exactly one by one.

### Decorator
Cite Wiki
> The decorator pattern is a design pattern that 
allows behavior to be added to an individual object, 
dynamically, without affecting the behavior of other objects from the same class.

Simply put, we use decorator to enhance the interface.

Image we have a class called `Car`, which has a method `Drive`

```go
type Car interface {
  Drive()
}

type Sedan struct {}

func (x *Sedan) Drive() {
  // ...
}

type SportsCar struct {}

func (s *SportsCar) Drive() {
  // ...
}
```

But, what if we want to enhance Car with one more method called `SwitchToSportsMode` ?

By following Open-closed principle, we create a interface enhancer (decorator).

```go
// Decorator
type CarWithSportsMode struct {
  car Car
  hasSportsMode bool
}

func (c *CarWithSportsMode) Drive() {
  // ...
}

func (c *CarWithSportsMode) SwitchToSportsMode() {
  if c.hasSportsMode {
    // ...
  }
}
```

Then we can easily decorate the original classes, the following is how we gonna use it

```go
func main() {
  sedan := Sedan{}
  sportsCar := SportsCar{}

  // Drive it
  sedan.Drive()
  sportsCar.Drive()

  // Enhanced cars
  sedanWithSportsMode := CarWithSportsMode{&sedan, false}
  sportsCarWithSportsMode := CarWithSportsMode{&sportsCar, true}

  // Switch to sports-mode
  sedanWithSportsMode.SwitchToSportsMode()
  sportsCarWithSportsMode.SwitchToSportsMode()
}
```

This simple example shows us we can leverage decorator to add more responsibilities to existing interface
without modifying it. It's pretty neat !

### Proxy
Alright, let's get to `Proxy` design pattern. As usual, cite Wiki first
> A proxy is a wrapper or agent object that is being called by the client 
to access the real serving object behind the scenes. 
Use of the proxy can simply be forwarding to the real object, 
or can provide additional logic

Wiki already has clear explanation. Let's just go straight to example.

Following the case above: image we have `Car` and `Driver` classes, 
but now we don't want anyone with any ages to drive it.
```go
type Car interface {
  Drive()
}

type Driver struct {
  Age int
}
```
By applying proxy design pattern, we can hide original Drive implementation and add our custom logics on top of it.
```go
type CarProxy struct {
  car Car
  driver *Driver
}

func (c *CarProxy) Drive() {
  if c.driver.Age <= 20 {
    panic("Driver is too young to drive")
  }
  c.car.Drive()
}

// Using factory to generate new proxy instance
func NewCarProxy(driver *Driver) {
  return &CarProxy{Car{}, driver}
}
```
So main function looks something like
```go
func main() {
  youngDriver := Driver{18}  
  car := NewCarProxy(&youngDriver)
  car.Drive()
}
```
### Summary
`decorator` dynamically adds more functionalities to the interface. 
On the other hand, `proxy` is about access control to the interface. 
(idea from what we know about proxy in networking space).

