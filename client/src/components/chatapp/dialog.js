import { useContext } from "react"
import { DialogContext } from "./context"
import "./css/dialog.css"
function Dialog(props) {
    const dialogContext = useContext(DialogContext)
    const className = props.active ? "dialog dialog-active" : "dialog dialog-hide"
    return (
        <>
            <div className={className}>
                <div className="exist-btn" onClick={() => {
                    dialogContext.hide()
                }}>x</div>
                {props.children}
            </div>
        </>
    )
}
export default Dialog