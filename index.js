import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [mensajes, setMensajes] = useState(0)
  const [esPremium, setEsPremium] = useState(false)

  const registrar = async () => {
    const { data } = await supabase
      .from('usuarios')
      .select('premium_activo, premium_hasta')
      .eq('email', email)
      .single()

    if (!data) {
      await supabase.from('usuarios').insert({ email, nombre })
    } else {
      const ahora = new Date()
      if (data.premium_activo && new Date(data.premium_hasta) > ahora) {
        setEsPremium(true)
      }
    }
  }

  const enviarMensaje = () => {
    if (!esPremium && mensajes >= 3) {
      alert('Solo puedes enviar 3 mensajes. Activa Premium.')
      return
    }
    setMensajes(mensajes + 1)
    setMensaje('')
    alert('Mensaje enviado.')
  }

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Conexión Real</h1>
      <input placeholder="Tu nombre" onChange={e => setNombre(e.target.value)} /><br />
      <input placeholder="Tu email" onChange={e => setEmail(e.target.value)} /><br />
      <button onClick={registrar}>Iniciar sesión</button>

      <hr />

      <textarea placeholder="Tu mensaje..." value={mensaje} onChange={e => setMensaje(e.target.value)} />
      <button onClick={enviarMensaje}>Enviar</button>

      <p>Mensajes enviados: {mensajes}</p>

      <hr />

      <a href="/pago">Activar Premium</a>
    </main>
  )
}
