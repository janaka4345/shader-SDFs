const fsShapes = `
#ifdef GL_ES
precision mediump float;
#endif



uniform float u_time;


// Function to generate a random float between 0 and 1
float random(float seed) {
    return fract(sin(seed) * 43758.5453);
}

void main() {
    float speedX=u_time*2.0;
    float speedY=u_time*3.0;
    // Define the color of the circles
    vec3 circleColor = vec3(1.0, 0.0, 0.0); // Red color

    // Loop through each circle
    for (int i = 0; i < 100; ++i) {
        // Random position for each circle
        vec2 circleCenter = vec2(random(float(i)), random(float(i+1)))-vec2(speedX,speedY);

        // Radius of the circle
        float circleRadius = 0.02;

        // Calculate the distance from the current fragment to the circle center
        float distanceToCenter = length(gl_FragCoord.xy / 400.0 - circleCenter);

        // Check if the distance is within the circle radius
        if (distanceToCenter < circleRadius) {
            // Inside the circle, set the color to the circle color
            gl_FragColor = vec4(circleColor, 1.0);
            return;
        }
    }

    // Outside all circles, set the color to black
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}

`;
export default fsShapes;
