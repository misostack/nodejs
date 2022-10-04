const duck = {
  name: "Maurice",
  color: "white",
  greeting() {
    console.log(`Quaaaack! My name is ${this.name}`);
  },
};

console.log(Reflect.ownKeys(duck));
console.log(Reflect.get(duck, "name"));
if (!Reflect.has(duck, "age")) {
  Reflect.set(duck, "age", 1);
}
console.log(Reflect.has(duck, "color"));

function func1(a, b, c) {
  this.sum = a + b + c;
}

const args = [1, 2, 3];
const object1 = new func1(...args);
const object2 = Reflect.construct(func1, args);

console.log(object2.sum);

console.log(object1.sum);

const geometries = [
  {
    type: "circle",
    points: [
      [0, 0],
      [0, 5],
    ],
  },
  {
    type: "triangle",
    points: [
      [0, 0],
      [0, 5],
      [5, 0],
    ],
  },
  {
    type: "square",
    points: [
      [0, 0],
      [0, 5],
      [5, 0],
      [5, 5],
    ],
  },
];

const toCapitalize = (str) => {
  return `${str[0].toUpperCase()}${str.substring(1)}`;
};

const get2PointsDistance = (points) => {
  return Math.sqrt(
    Math.pow(points[0][0] - points[1][0], 2) +
      Math.pow(points[0][1] - points[1][1], 2)
  );
};

const Drawer = {
  processing(geometry) {
    const processFunc = `process${toCapitalize(geometry.type)}`;
    if (Reflect.has(Drawer, processFunc)) {
      return Reflect.apply(Reflect.get(Drawer, processFunc), undefined, [
        geometry,
      ]);
    }
    return null;
  },
  processCircle(geometry) {
    const { points } = geometry;
    const radius = get2PointsDistance(points);
    Reflect.defineProperty(geometry, "radius", {
      value: radius,
    });
    Reflect.defineProperty(geometry, "area", {
      value: 2 * Math.PI * Math.pow(radius, 2),
    });

    console.log("processing ", geometry);
  },
  draw(geometry) {
    const { type, points } = geometry;
    const drawFunc = `draw${toCapitalize(type)}`;
    if (Reflect.has(Drawer, drawFunc)) {
      return Reflect.apply(Reflect.get(Drawer, drawFunc), this, points);
    }
    return null;
  },
  drawCircle(...points) {
    console.log("draw circle", points);
  },
  drawTriangle(...points) {
    console.log("draw triangle", points);
  },
  drawSquare(...points) {
    console.log("draw square", points);
  },
};

geometries.map((geometry) => {
  Drawer.processing(geometry);
  Drawer.draw(geometry);
});
