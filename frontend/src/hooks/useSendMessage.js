import { useState } from "react"
import useConversation from "../zustand/useConversation";
import axios from "axios";
import toast from "react-hot-toast";


const useSendMessage = () => {

    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();
 

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const res = await axios.post(`/api/messages/send/${selectedConversation?._id}`,{
                message
            })

            if(res.error) {
                throw new Error(res.error)
            }

            setMessages([...messages, res.data])

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {loading, sendMessage}

}

export default useSendMessage;