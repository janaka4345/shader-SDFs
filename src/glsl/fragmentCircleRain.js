const fs = `
#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vPosition;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_image;

float sdCircle( vec2 p,vec2 center, float r )
{
    return length(p-center) - r;
}

float sdRect( in vec2 p,in vec2 center, in vec2 b )
{
    vec2 d = abs(p-center)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float random2d(vec2 coord){
    return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main(){
    vec2 position=gl_FragCoord.xy/u_resolution.xy;
    vec3 color=vec3(0.0);
   

    for (int i=1;i<6;i++){
         vec2 center=vec2(abs(sin(u_time*5.0)),float(i)/6.0);
        //  vec2 center=vec2(random2d(position));
        float circle=sdCircle( position,center,  0.01 );

        // coloring circle 
        vec3 colcircle = (circle>0.0) ? vec3(1.0,0.0,0.0) : vec3(-1.0,1.0,0.0);
        color+=colcircle;
     }

    gl_FragColor=vec4(color,1.0); 
    
}`;
export default fs;
