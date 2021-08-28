import { useRef , useEffect } from 'react'

export {useRef} from 'react'
const Banner_Circle_Animation = (props) => {
    const canvasRef = useRef(null)
    const canvasSize = {
        width: 250,
        height: 250
    }
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
    let mouse = {
        x : canvasSize.width/2,
        y : canvasSize.height/2
    } 
    // partical
    function Particle (x, y, radius, color, context){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color  = color;
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.01;
        this.distanceFromCenter =  {
            x: Math.random() * 10 + 70,
            y: Math.random() * 10 + 70,
        }
        this.lastmouse = {
            x : mouse.x,
            y : mouse.y
        }
        this.update = () => {
            this.radians += this.velocity;
            this.lastmouse.x += (mouse.x - this.lastmouse.x ) * 0.01
            this.lastmouse.y += (mouse.y - this.lastmouse.y ) *0.01
            // this.lastmouse.x += (mouse.x - this.lastmouse.x) * 0.05
            this.x = this.lastmouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
            this.y = this.lastmouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;
            this.draw()
        }
        this.draw = () => {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            context.fillStyle = this.color;
            context.fill();
            context.closePath();
        }
    };
    let particals;
    const Init = (canvas) => {
        particals = []
        for(let i = 0; i < 20; i++) {
            particals.push(new Particle(250 / 2, 250/2, 3, color[i], canvas));
        }
    }
    const Animate = (ctx) => {
       
        ctx.fillStyle = 'rgba(0, 0 , 0, 0.05)'
        ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
        particals.forEach(partical => {
            partical.update()
        })
        requestAnimationFrame(() => {
           
            Animate(ctx)
            })
       
    }
    useEffect(() => {
        
        const canvas = canvasRef.current;
        window.addEventListener('mousemove', (e) => {
            let temp = canvas.getBoundingClientRect()
            if( e.x < temp.left   ||
                e.x > temp.right  ||
                e.y < temp.top    ||
                e.y > temp.bottom) {
                console.log("ok")
                mouse.x = canvasSize.width/2;
                mouse.y = canvasSize.height/2;
            }
        }
            
        )
        canvas.addEventListener('mousemove', (e) => {
            console.log(canvas.left)
            console.log(mouse)
            mouse.x = e.x - canvas.getBoundingClientRect().left;
            mouse.y = e.y - canvas.getBoundingClientRect().top;
            console.log(mouse)
        })
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height
        const ctx = canvas.getContext('2d');
        Init(ctx)
        Animate(ctx)
    },[])
    return (
        <canvas ref = {canvasRef}></canvas>
    )
}
export default Banner_Circle_Animation