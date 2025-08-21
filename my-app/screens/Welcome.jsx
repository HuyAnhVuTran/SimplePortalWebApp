import React,{ useState, useEffect } from "react";
import SyncLoader from 'react-spinners/SyncLoader'


function Welcome(){
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
            setLoading(true);
            setTimeout(()=>{
                setLoading(false);
            },8000);
    },[]);

    const override ={
        display: "block",
        margin: "0 auto",
        borderColor: "#123abc",
    };
    
    return (
      
        <div className="Welcome">
            {loading ? (
                <SyncLoader
                    css={override}
                    size = {50}
                    color={"#123abc"}
                    loading={loading}
                />
                
            ):(
                <p className="text-3xl bg-white">
                    Welcome to GamerGate!
                </p>
                
            )}
                
        </div>
    )
}

export default Welcome