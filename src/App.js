import './App.css';
import React,{ useState } from 'react';
import Tesseract from 'tesseract.js';

const App= ()=> {
  const [isLoading,setLoading] = useState(false);
  const [text, setText] = useState("");
  const [image,setImage] = useState("")

  const handleClick=()=>{
    setLoading(true)
    Tesseract.recognize(
      image,
      'eng',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      setText(text);
      setLoading(false)
    })
  }
  const bob=()=>{
    window.location.reload()
  }

  return (
    <div>
      {!isLoading && <h1 className='title'> Doctors note</h1>}
      {
        !isLoading && !text && (
          <div className='container'>
            <input type='file' className='form-control'onChange={(eve)=>setImage(URL.createObjectURL(eve.target.files[0]))}/>
            <input type='button' className='button1' value="Digitalise" onClick={handleClick}/>
          </div>
        )
      }

      {
        !isLoading && text && (
          <>
          <textarea className='text' rows="15" value={text} onChange={(e)=>setText(e.target.value)}>
          </textarea>
          <button onClick={bob}>Choose another file</button>
          <textarea className='summer' value={text}></textarea>

          </>
        )
      }
      {
        isLoading && (
          <>
          <h1>Processing this image</h1>
          <img className='image'src={image} alt='hdnsj' width='900' height='300'/>
          </>
        )
      } 

    </div>
  );
}

export default App;