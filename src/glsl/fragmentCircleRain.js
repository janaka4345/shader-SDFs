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
    return step(0.3,length(max(d,0.0)) + min(max(d.x,d.y),0.0));
}

void main(){
    vec2 position=gl_FragCoord.xy/u_resolution.xy;
    vec3 color=vec3(0.0);
    vec2 center=vec2(0.5,0.5);

    float circle=sdCircle( position,center,  0.1 );

    //coloring 
    vec3 col = (circle>0.0) ? vec3(1.0,0.0,0.0) : vec3(0.0,1.0,0.0);
    // col *= 1.0 - exp(-6.0*abs(circle));
	// col *= 0.8 + 0.2*cos(150.0*circle);
	// col = mix( col, vec3(1.0), 1.0-smoothstep(0.0,0.01,abs(circle)) );


    // float rect=sdRect(position,center,vec2(0.1,0.2));

    color=vec3(circle,0.0,0.0);
    // color=vec3(rect,0.0,0.0);
    gl_FragColor=vec4(col,1.0); 
    
}`;
export default fs;
