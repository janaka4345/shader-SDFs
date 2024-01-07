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

void main(){
    vec2 position=gl_FragCoord.xy/u_resolution.xy;
    vec3 color=vec3(0.0);
    vec2 center=vec2(sin(u_time*2.0));

    float circle=sdCircle( position,center,  0.1 );

    // coloring circle 
    vec3 colcircle = (circle>0.0) ? vec3(1.0,0.0,0.0) : vec3(-1.0,1.0,0.0);
    

    center=vec2(cos(u_time*2.0));
    float rect=sdRect(position,center,vec2(0.1,0.2));
    //coloring rectangle 
    vec3 colrect = (rect>0.0) ? vec3(1.0,0.0,0.0) : vec3(-1.0,0.0,1.0);

    
    color=colcircle+colrect;
    
    gl_FragColor=vec4(color,1.0); 
    
}`;
export default fs;
