import React, { useState, useEffect, createRef } from "react";
import Talk from "talkjs";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";



const InboxContainer = (props) => {

    const {product, seller} = props;
	// console.log(props, )
	console.log(product, seller);

	const { accounts } = useMsal();
    const [user, setUser] = useState({
        _id : accounts[0].homeAccountId.split('.')[0],
        name: accounts[0].name,
        email: accounts[0].username 
    });

    const talkjsContainer = createRef();


  
    useEffect( async() => {   
  
        Talk.ready.then(() => {

          console.log("Talk is ready");
          console.log("user:", user);
          var me = new Talk.User({
            id: user._id,
            name: user.name,
            email: user.email,
            role: "buyer"
          });
          
          window.talkSession = new Talk.Session({
            appId: "taWaWLjI",
            me: me
          });
          
          var other = new Talk.User({
            id: seller._id,
            name: seller.name,
            email: seller.email,
            welcomeMessage: "Message me if want to know more?",
            role: "seller"
          });
  
          var ConversationID = product._id + user._id + seller._id;
          console.log("newConversationID:", ConversationID);

          var conversation = talkSession.getOrCreateConversation(ConversationID);
          conversation.setParticipant(me);
          conversation.setParticipant(other);
          conversation.setAttributes({
            subject: product.name
          });
          
          var inbox = talkSession.createInbox({selected: conversation});
          inbox.mount(talkjsContainer.current);
        }); 
      
      
    }, []);
  
    const dims = {
        height: "36rem",
    }

    return (
        <div ref={talkjsContainer} style={dims} ></div>
    );
    
}



const Chat = (props) => {
 	const {postContent, userDetails} = props;
	// console.log(props, product, seller);
	const product = postContent;
	const seller = userDetails;

    return (
        <div >
            <AuthenticatedTemplate>
                <InboxContainer product={product} seller={seller} />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h1>Please sign in to chat</h1>
            </UnauthenticatedTemplate>
        </div>
    );
}



export default Chat;