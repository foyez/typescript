# Typescript at a glance

- `Typescript` is a **superset of Javascript**. That means, all Javascript is valid Typescript

## Primary goals of Typescript

1. Provide Javascript developers with an **optional type system**
2. Provide Javascript developers with the ability to utilize planned features from **future Javascript editions** against current Javascript engines

## Typescript type annotation

> There are 4 primary types in Typescript

1. Implicit
2. Explicit
3. Structural
4. Ambient

### 1. Connivent Implicit Types

- figure out the types of the variables if they are not explicitly defined

```ts
const age = 18 // implicitly, age is number
```

### 2. Explicit Types

- specify the types of the variables

```ts
const age: number = 18

// function
function sayHello(name: string): string {
  return `Hello ${name}`
}

// arrow function
const profile = (name: string, age: number): string => {
  return `${name}'s age is ${age}`
}

// class
class Greeter {
  name: string

  constructor(name: string) {
    this.name = name
  }

  sayHello(): string {
    return `Hello ${this.name}`
  }
}
```

### 3. Structural Types

#### i. Nominal typing:

```ts
class Fruit {}

class Mango extends Fruit {}

class GreenMango extends Mango {}

// Valid, through subtypes
const greenMangoFruit: Fruit = new GreenMango()

// Valid, through subtypes
const mango: GreenMango = new Mango()

// Valid, explicitly defined as a GreenMango
const greenMango: GreenMango = new GreenMango()
```

#### ii. Duck typing

> If it looks like a Duck and it quacks like a Duck. It must be a Duck.

```ts
interface Comment {
  id: number
  content: string
}

interface Reply {
  id: number
  content: string
  commentId: number
}

const comment: Comment = {
  id: 1,
  content: 'this is a comment',
}

const reply: Reply = {
  id: 2,
  content: 'this is a reply',
  commentId: 1,
}

function postComment(comment: Comment) {
  // Do something
}

// Perfect - exact match
postComment(comment)

// Ok - extra information still alright
postComment(reply)

// Error - missing information
// Type '{ id: number; }' is missing the following properties from
// type 'Comment': content
postComment({ id: 1 })
```

### 4. Ambient Types

```ts
// $ is global variable
declare var $: {
  (selector: string): any
}

$('.cls').show() // okay
$(123).show() // Error
```

## Typescript in OOP

```ts
class Point {
  // Instance variables are accessible only through instances of the class.
  // From inside the class, using the this keyword gives us access to the instance variables
  x: number // instance variable
  y: number

  constructor(x: number, y: number) {
    // constructor
    this.x = x
    this.y = y
  }

  add(point: Point) {
    // method
    return new Point(this.x + point.x, this.y + point.x)
  }
}

class Point3D extends Point {
  z: number
  // static properties belong to the class themselves,
  // not to instances of the class — objects.
  static instancesCreated = 0 // class variable

  // Readonly properties are properties that can’t be changed once they’ve been set.
  // A read-only property must be initialized at their declaration or in the constructor.
  readonly pointName: string
  readonly numberOfPoints: number = 5

  constructor(x: number, y: number, z: number) {
    super(x, y)
    this.z = z
    Point3D.instancesCreated++
    this.pointName = 'readonlyPoint'
  }

  add(point: Point3D) {
    const point2D = super.add(point)
    return new Point3D(point2D.x, point2D.y, this.z + point.z)
  }
}

const p = new Point3D(0, 10, 20)
console.log(Point3D.instancesCreated)
```

## Access Modifier

> There are 3 access modifiers: public, protected and private

A method or member/attribute with a `public` modifier can access through:

- an instance of the class (object)
- inside the containing class (this)

A method or member/attribute with a `private` modifier can access through:

- inside the containing class (this)

A method or member/attribute with a `protected` modifier can access through:

- inside the containing class and subclasses (this)

| Access modifier | Access from other classes? | Access from subclasses? |
| --------------- | -------------------------- | ----------------------- |
| **public**      | yes                        | yes                     |
| **protected**   | no                         | yes                     |
| **private**     | no                         | no                      |

> by default, the property is public if no access modifier is included

## Interfaces

> Interfaces allow us to declare the structure of classes and variables.

```ts
interface ICenter {
  x: number
  y: number
}

interface ICircle {
  readonly id: string
  center: ICenter
  radius: number
  color?: string // optional property
}

interface ICircleWithArea extends ICircle {
  getArea: () => number // or, getArea(): number
}

class Circle implements ICircleWithArea {
  // Readonly properties are properties that can’t be changed once they’ve been set.
  // A read-only property must be initialized at their declaration or in the constructor.
  readonly counter: number = 0
  readonly id: string
  center: ICenter
  radius: number

  constructor(center: ICenter, radius: number) {
    this.id = ''
    this.center = center
    this.radius = radius
  }

  getArea() {
    return Math.PI * this.radius * this.radius
  }
}
```

## Generics

> Generics offer a way to create reusable components. Generics provide a way to make components work with any data type and not restrict to one data type.

```ts
interface Queue<T> {
  data: T[]
  push: (t: T) => void
  pop: () => T | undefined
}

interface Monkey {
  name: string
  color: string
}

class MonkeyQueue implements Queue<Monkey> {
  data: Monkey[]

  constructor() {
    this.data = []
  }

  push(t: Monkey): void {
    this.data.push(t)
  }

  pop(): Monkey | undefined {
    return this.data.shift()
  }
}
```

Generic Class

```ts
class KeyValuePair<T, U> {
  private key: T
  private val: U

  setKeyValue(key: T, val: U): void {
    this.key = key
    this.val = val
  }

  display(): void {
    console.log(`Key = ${this.key}, val = ${this.val}`)
  }
}

let kvp1 = new KeyValuePair<number, string>()
kvp1.setKeyValue(1, 'Steve')
kvp1.display() //Output: Key = 1, Val = Steve
```

## Abstract classes

- `abstract` classes cannot be directly instantiated. Instead, the user must create some class that inherits from the abstract class.
- abstract members cannot be directly accessed, and a child class must provide the functionality.

```ts
type ITrack = { title: string } | null

abstract class AudioDevice {
  protected isPlaying: boolean = false
  protected currentTrack: ITrack = null

  constructor() {}

  play(track: ITrack): void {
    this.currentTrack = track
    this.isPlaying = true
    this.handlePlayCurrentAudioTrack()
  }

  abstract handlePlayCurrentAudioTrack(): void
}

class Boombox extends AudioDevice {
  constructor() {
    super()
  }

  handlePlayCurrentAudioTrack() {
    // Play through the boombox speakers
  }
}
```

## Special types

### Type assertions

```ts
interface Person {
  name: string
  age: number
}

const person = {} as Person
person.name = 'Foyez'
```

### The "type" keyword

```ts
type Person = {
  name: string
  age: number
}
```

### Type aliases

```ts
// Primitive
type Name = string

// Tuple
type Data = [number, string]

// Object
type PointX = { x: number }
type PointY = { y: number }

// Union (Or - At least one required)
type IncompletePoint = PointX | PointY

// Extends/Intersection (And - All required)
type Point = PointX & PointY

const pX: PointX = { x: 1 }
const incompletePoint: IncompletePoint = { x: 1 }
const point: Point = { x: 1 } // Error Property 'y' is missing
// in type '{ x: number; }' but
```

### Enum

> An enum is a way to organize a collection of related values.

```ts
enum Instrument {
  Guitar,
  Bass,
  Keyboard,
  Drums,
}

/*
enum Instrument {
  Guitar = 'GUITAR',
  Bass = 'BASS',
  Keyboard = 'KEYBOARD',
  Drums = 'DRUMS'
}
*/

let instrument = Instrument.Guitar // or, Instrument[0]

instrument = 'screwdriver' /* Error! Type '"screwdriver"'
is not assignable to type 'Instrument'.
*/
```

### any

> any is a type that we can used with all types.

```ts
let anything: any = 'anyone'
anything = 3
```

In legacy projects migrating to TypeScript, it’s not uncommon to temporarily type things as any before adding more specific types over time during refactoring.

### void

> void is the absence of having any return type.

```ts
function greet(name: string): void {
  console.log(`Hello, ${name}`)
}
```

### Literal types

```ts
const GenreTypes: { [index: number]: string } = {
  1: 'Metal',
  2: 'Rap',
  3: 'Pop',
}
```
