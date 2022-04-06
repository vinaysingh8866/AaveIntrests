import { useEffect, useState } from "react";
import io from 'socket.io-client';
const Messages = ({signerAddress}) => {
    const [messages, setMessages] = useState([]) 
    const newSocket = io(`http://0.0.0.0:8080`)
    const [load,setLoad] = useState(true)
    const [message, setMessage] = useState("")
    
    async function sendMessage(){
        setLoad(true)
        newSocket.emit("add-comment", signerAddress, message)
        setTimeout(()=>{
            if(load){
                newSocket.emit("get-comments");
                setLoad(false)
            }
            
        }, 1000)
    }
    newSocket.on('message', (message)=>{
        let tempAr = []
        for(const k in message){
            tempAr.push(message[k]['message'])
        }
        setMessages(tempAr.reverse())
    })
    
    
    useEffect(() =>{
        if(load){
            newSocket.emit("get-comments");
            setLoad(false)
        }
        
    }, [load, newSocket, setLoad])

    return(
        <div >
        <input onChange={e=> setMessage(e.target.value)} className="my-2 py-2 rounded-md shadow-sm" style={{'width':'60%'}} type={"text"}></input>
        <button onClick={sendMessage} className="mx-2 bg-blue-400 p-2 rounded-md shadow-sm" style={{'width':'30%', 'minWidth':'120px'}}>Comment</button>
      
        <div className="overflow-scroll" style={{'height':'20vh'}}>
            {messages.map((x, i )=>{
                return <div key={i}> {x} </div>
            })}
        </div>
        </div>
    )
}


export default Messages;