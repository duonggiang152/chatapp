import { useRef , useEffect, useState } from 'react'
let canvasSize = {
    width: 250,
    height: 250
}
let mouse = {
    x : canvasSize.width/2,
    y : canvasSize.height/2
} 
function Particle (x, y, radius, color, context, type, numberMobileCircle = 0){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color  = color;
    this.type = type
    this.radians = Math.random() * Math.PI * 2;
    if(numberMobileCircle === 0 && this.type === "mobile") {

        this.radians = 0;
    }
    else if (numberMobileCircle === 1 && this.type === "mobile") {
       
        this.radians = Math.PI 
    }
    this.velocity = ( this.type === "pc"  ? Math.PI / 2 : Math.PI/3);
   
    this.context = context
    this.distanceFromCenter =  {
        x: Math.random() * 10 + 70,
        y: Math.random() * 10 + 70,
    }
    this.lastmouse = {
        x : mouse.x,
        y : mouse.y
    }
    this.date = new Date();
    this.update = () => {
        let frameDate = new Date();
        
        if(this.type === "pc"){
        this.radians += this.velocity * (frameDate.getTime() - this.date.getTime()) / 1000;
        this.lastmouse.x += (mouse.x - this.lastmouse.x ) * (frameDate.getTime() - this.date.getTime()) / 1000 * 0.5;
        this.lastmouse.y += (mouse.y - this.lastmouse.y ) * (frameDate.getTime() - this.date.getTime()) / 1000 * 0.5;
        // this.lastmouse.x += (mouse.x - this.lastmouse.x) * 0.05
        this.x = this.lastmouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
        this.y = this.lastmouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;
        }
        else {
            this.radians += (this.velocity/2) * (frameDate.getTime() - this.date.getTime()) / 1000;
            // this.lastmouse.x += (mouse.x - this.lastmouse.x ) * (frameDate.getTime() - this.date.getTime()) / 1000 * 0.1;
            // this.lastmouse.y += (mouse.y - this.lastmouse.y ) * (frameDate.getTime() - this.date.getTime()) / 1000 * 0.1;
            // this.lastmouse.x += (mouse.x - this.lastmouse.x) * 0.05
            // this.x = document.documentElement.clientWidth / 2+ Math.cos(this.radians) * (document.documentElement.clientWidth)*0.5*0.7;
            this.x = document.documentElement.clientWidth * 0.7 / 2 + Math.cos(this.radians) * (document.documentElement.clientWidth * 0.7 / 2 - 20)
            this.y = 25
        }
        this.draw()
        this.date = new Date()
    }
    this.draw = () => {
        this.context.beginPath();
        if(this.type == "pc"){
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        }
        else 
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
    }
};
const Banner_Circle_Animation = (props) => {
    const [rerender , setReRender] = useState(1)
    mouse = {
        x : canvasSize.width/2,
        y : canvasSize.height/2
    } 
    useEffect(() => {
        if(props.screenType === "pc") {
            canvasSize = {
                width: 250,
                height: 250
            }
        }
        else {
            canvasSize = {
                width: 250,
                height: 50
            }
        }
        setReRender(previ => previ++)
    }, [props.ScreenType])
  
    const canvasRef = useRef(null)
    // color
    const color = [
        '#e0a80d',
        '#bde00d',
        '#53e00d',
        '#0d26e0',
        '#7e0de0',
        '#e0a80d',
        '#bde00d',
        '#53e00d',
        '#0d26e0',
        '#7e0de0',
        '#e0a80d',
        '#bde00d',
        '#53e00d',
        '#0d26e0',
        '#7e0de0',
        '#e0a80d',
        '#bde00d',
        '#53e00d',
        '#0d26e0',
        '#7e0de0',
    ]
    const colorMobile = "#8a8a8a"
    // partical

    let particals;
    let Init = () => {

        particals = []
        const canvas = canvasRef.current.getContext("2d");
        let numberCircle = 20;
        if(props.screenType === "pc") {
            numberCircle = 20;
            for(let i = 0; i < numberCircle; i++) {
                particals.push(new Particle(canvasSize.width /2, canvasSize.height / 2, (props.screenType === "pc" ? 3 : 15), color[i], canvas, props.screenType));
            }
        }
        else {
            numberCircle = 2;
            for(let i = 0; i < numberCircle; i++) {
                particals.push(new Particle(canvasSize.width /2, canvasSize.height / 2, (props.screenType === "pc" ? 3 : 15), colorMobile, canvas, props.screenType, i));
            }
        }
      
    }
    var handlerAniamtionFrame;
    const Animate = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if(props.screenType === "mobile")
        ctx.fillStyle = 'rgba(32, 32, 32,0.05)'
        else 
        ctx.fillStyle = 'rgba(0, 0, 0,0.05)'
        ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
        particals.forEach(partical => {
            partical.update()
        })
        handlerAniamtionFrame = window.requestAnimationFrame(Animate)
    }
    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            let temp = canvas.getBoundingClientRect()
            if( e.x < temp.left   ||
                e.x > temp.right  ||
                e.y < temp.top    ||
                e.y > temp.bottom) {
                mouse.x = canvasSize.width/2;
                mouse.y = canvasSize.height/2;
            }
        })

        const canvas = canvasRef.current;
        if(props.screenType === "pc") {
        canvas.width = 250;
        canvas.height = 250
        canvasSize.width = 250;
        canvasSize.height = 250
        }
        else {
            canvas.width = document.documentElement.clientWidth * 0.7;
            canvas.height = 50
            canvasSize.width = canvas.width;
            canvasSize.height = canvas.height
        }
        window.addEventListener('resize', () => {
            if(props.screenType === "pc") {
                canvas.width = 250;
                canvas.height = 250
                canvasSize.width = 250;
                canvasSize.height = 250
                }
                else {
                    canvas.width = document.documentElement.clientWidth * 0.7;
                    canvas.height = 50
                    canvasSize.width = canvas.width;
                    canvasSize.height = canvas.height
                }
        } )
        canvas.addEventListener('mousemove', (e) => {
            mouse.x = e.x - canvas.getBoundingClientRect().left;
            mouse.y = e.y - canvas.getBoundingClientRect().top;
        })
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0, canvasSize.width, canvasSize.height)
        Init(ctx)
        handlerAniamtionFrame = requestAnimationFrame(Animate)
        
        return () =>  {
            ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
            console.log("print-out the screen");
            cancelAnimationFrame(handlerAniamtionFrame)
        }
    },[props.screenType])
    return (
        <canvas ref = {canvasRef}></canvas>
    )
}
export default Banner_Circle_Animation