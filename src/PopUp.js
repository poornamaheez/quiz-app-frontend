import React from "react";
import "./PopUp.css";
function PopUp({showMsg ,message,msgType}){
    let head= "Error";
    let btnText= "Retry";
    let title = "fail";
    if (msgType==="true") {
        head="Success";
        btnText = "continue";
        title = "success";
    }
    return(
        <div className="total-background">
            <div className="message-box">
                <div className={title}>
                    <h1>
                        {head}
                    </h1>
                </div>
                <div className="body">
                    <p>
                        {message}
                    </p>
                </div>
                <div className="footer">
                    <button onClick={()=>{
                        showMsg(false);
                        }}>
                        {btnText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopUp;