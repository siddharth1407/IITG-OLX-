import React, { useState, useEffect, createRef } from "react";
import Talk from "talkjs";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";



const InboxContainer = () => {

    const talkjsContainer = createRef();

    const { accounts } = useMsal();
    const [user, setUser] = useState({
        id : accounts[0].homeAccountId.split('.')[0],
        name: accounts[0].name,
        email: accounts[0].username 
    });
  
    useEffect( async() => {   
  
        Talk.ready.then(() => {

          console.log("Talk is ready");
          console.log("user:", user);
          var me = new Talk.User({
            id: user.id,
            name: user.name,
            email: user.email,
            welcomeMessage: "Hey there! How are you? :-)",
            role: "booker"
          });
          
          window.talkSession = new Talk.Session({
            appId: "taWaWLjI",
            me: me
          });
          
          var other = new Talk.User({
            id: parseInt(Math.random()*500000).toString(),
            name: "Monu",
            email: "demo@talkjs.com",
            welcomeMessage: "Hey, how can I help?",
            role: "booker"
          });
    
          var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));
          conversation.setParticipant(me);
          conversation.setParticipant(other);
          conversation.setAttributes({
            subject: "This is a testing conversation"
          });
          
          var inbox = talkSession.createInbox({selected: conversation});
          inbox.mount(talkjsContainer.current);
        }); 
      
      
    }, []);
  
    const dims = {
        height: "45rem",
    }

    return (
        <div ref={talkjsContainer} style={dims} ></div>
    );
    
}



const Chat = () => {
    return (
        <div >
            <AuthenticatedTemplate>
                <InboxContainer/>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h1>Please sign in to chat</h1>
            </UnauthenticatedTemplate>
        </div>
    );
}



export default Chat;