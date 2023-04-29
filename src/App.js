import './App.css';
import React, { useState } from 'react';
import logoalura from './assets/logo-alura.png';
import info from './assets/info-icon.svg';
import waitfig from './assets/wait-fig.svg';

var CryptoJS = require('crypto-js');

var cypherKey = "godganfall";

function App() {
  const [hideWait, setHideWait] = useState(false);

  async function encriptMsg() {
    var msg = document.querySelector("textarea").value;
    if (msg.length > 0) {
      setHideWait(true);
      var crypted = await CryptoJS.AES.encrypt(msg, cypherKey);

      document.getElementById("outText").value = crypted;
    } else {
      alert("Digite algo para encriptar!");
      return;
    }
  }

  async function decriptMsg() {
    var msg = document.querySelector("textarea").value;
    if (msg.length > 0) {
      setHideWait(true);
      var msgDecript = await CryptoJS.AES.decrypt(msg, cypherKey).toString(CryptoJS.enc.Utf8);

      document.querySelector("#outText").value = msgDecript;
    } else {
      alert("Digite algo para decriptar!");
      return;
    }
  }

  async function copiarTexto() {
    let textoCopiado = document.getElementById("outText");
    textoCopiado.select();
    await navigator.clipboard.writeText(textoCopiado.value);
    alert("Texto copiado com sucesso!");
    setHideWait(false);
  }

  return (
    <main className="container">


      <img src={logoalura} alt="logo-alura" className="logo" />


      <div className="inputArea">
        <textarea name="msg" id="msg" placeholder="Digite seu texto"></textarea>
        <div className="infoDiv">
          <img src={info} alt="info-icon" className="infoIcon" />
          <p> Apenas letras minúsculas e sem acento.</p>
        </div>
        <div className="butDiv">
          <button id="criptoBut" onClick={encriptMsg}>Criptografar</button>
          <button id="decriptBut" onClick={decriptMsg}>Descriptografar</button>
        </div>
      </div>

      <div className="outputArea">
        {hideWait ? (
          <div className="boxText">
            <textarea id="outText" disabled></textarea>
            <button id="copy" onClick={copiarTexto}>Copiar</button>
          </div>
        ) : (
          <div className='cont1'>
            <img src={waitfig} alt="waiting" className="wait" />
            <h2>Nenhuma mensagem encontrada</h2>
            <p>Digite um texto que você deseja criptografar ou descriptografar.</p>
          </div>
        )}
      </div>

    </main>
  )
}

export default App;
