import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) alert(error.message)
    else window.location.href = "/messages"
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Correo" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
        /><br/>
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)} 
        /><br/>
        <button type="submit">Entrar</button>
      </form>
    </div>
