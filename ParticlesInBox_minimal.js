// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

    // create the physics engine
let engine = Engine.create();

// create renderer and set up some options
let render = Render.create({

    element: document.body,
    engine: engine,
    options: {
        //canvas properties
        width: 1200,
        height: 800,
        background: 'LightCyan',
        wireframes: false // <-this is important for render properties taking place
    }
});

const WIDTH = render.options.width;
const HEIGHT = render.options.height;

// Setting up the walls around 
function setup() {
    const wallOptions = {
    isStatic: true,
    render: {
        fillStyle: 'SlateGray',
        strokeStyle: 'Black',
        lineWidth: 10
    },
};
// creating the walls
const thickness = 60;
Composite.add(engine.world, [
    Bodies.rectangle(WIDTH/2,  HEIGHT, WIDTH-5, thickness, wallOptions),
    Bodies.rectangle(WIDTH/2,  0, WIDTH-5, thickness, wallOptions),
    Bodies.rectangle(0, HEIGHT/2, thickness, HEIGHT-5, wallOptions),
    Bodies.rectangle(WIDTH, HEIGHT/2, thickness, HEIGHT-5, wallOptions),

]);


};
//turn of gravity
engine.gravity.y = 0;
// setting up options for particles
const particleOptions = {
    restitution:1,
    friction: 0,
    frictionAir: 0
};

let particleSize = 5;
let particleSpeed = 10;


// Particle-loop
N = 105; //number of particles
for (let i = 0; i < N; i++) {
    particle = Bodies.circle(
    Math.random() * WIDTH,
    Math.random() * HEIGHT,  
    particleSize,
    particleOptions
    );      
    // Find a random direction, in radians
    const direction = Math.random() * Math.PI * 2;
    // and set velocity for the particle added
    Matter.Body.setVelocity(particle, {
        x: Math.cos(direction) * particleSpeed,
        y: Math.sin(direction) * particleSpeed
});
    // Set inertia to infinity
    Matter.Body.setInertia(particle, Infinity);
    // Add particle to the world
    Composite.add(engine.world, particle);

};
// create runner and run engine with it
let runner = Runner.create();
Runner.run(runner, engine);

// run the renderer to see what comes out!
Render.run(render);