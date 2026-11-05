import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import CardMahasiswa from '../components/CardMahasiswa'
import Counter from '../components/Counter'

function App() {
  return(
    <>
    <CardMahasiswa nama="Zakaria" nim="103122400042" />
    <CardMahasiswa nama="Al" nim="103122400043" />
    <CardMahasiswa nama="Faruq" nim="103122400044" />

    <hr />
    <Counter />
    </>
  );
}

export default App;