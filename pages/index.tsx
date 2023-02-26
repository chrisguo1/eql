import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import React from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  interface Stmt {
    value: string;
    autocompletes: string[];
  }

  const [stmt, setStmt] = React.useState<Stmt>({
    value: "",
    autocompletes: [],
  });

  const handleChange = (e: any) => {
    // Trim value & convert to lowercase
    const value = e.target.value.trim().toUpperCase();

    const words:string[] = value.split(" ")
    
    // autocomplete stuff
    var autocompletes : string[] = [];
  
    const sql_stmts:string[] = ['WHERE', 'SELECT'];
    if (words.length >0) {

      const last_word: string = words[words.length - 1];
      
      for (const sql_stmt of sql_stmts) {
        //TODO only check for beginning of substring
        if (sql_stmt.startsWith(last_word)) {
          autocompletes.push(sql_stmt);
        }
      }
    }

    if (value == '') {
      autocompletes = [];
    }
      
    //set state of email to value or error. 
    setStmt({value, autocompletes});

  };
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Index" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div 
          role="textbox"
          contentEditable
        >
          <textarea 
            id="textarea1" 
            className="resize p-2 m-2" 
            name="name" 
            placeholder="Your text here "
            onChange={handleChange}
          >
          </textarea>
        </div>
        <div className = 'z-40'>Autocomplete: {stmt.autocompletes[0]}</div>
      </main>
    </>
  )
}
