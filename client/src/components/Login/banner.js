import "./css/banner.css"
import Banner_Circle_Animation from "./banner_circle_animation"
function Banner(props) {
    return (
        <div id = "banner">
            <p>
                CHAT APP
            </p>
            <Banner_Circle_Animation  {...props} />
        </div>
    )
}
export {Banner}