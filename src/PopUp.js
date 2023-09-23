import React from "react";
import "./PopUp.css";
function PopUp({showMsg ,message,msgType}){
    let head;
    let btnText;
    let title;
    if (msgType==="true") {
        head="Success";
        btnText = "continue";
        title = "success";
    }
    else{
        head="Error";
        btnText = "Retry";
        title = "fail";
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