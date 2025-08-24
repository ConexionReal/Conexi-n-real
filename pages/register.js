import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) alert(error.message)
    else alert("Registro exitoso, revisa tu correo ✅")
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
