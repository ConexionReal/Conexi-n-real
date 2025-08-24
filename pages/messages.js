import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [newMsg, setNewMsg] = useState("")

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    const { data, error } = await supabase.from("messages").select("*")
    if (error) console.error(error)
    else setMessages(data)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.from("messages").insert([{ content: newMsg }])
    if (error) alert(error.message)
    else {
      setMessages([...messages, data[0]])
      setNewMsg("")
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Mensajes 💬</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.content}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input 
          type="text" 
          placeholder="Escribe un mensaje" 
          value={newMsg} 
          onChange={(e)=>setNewMsg(e.target.value)} 
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
