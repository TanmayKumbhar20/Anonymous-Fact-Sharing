import { useEffect, useState } from 'react';
import './App.css';
import supabase from './supabase';
import { data } from 'autoprefixer';
import { animate, motion } from 'framer-motion';
import SpringChatAnimation from './SpringChatAnimation';

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function App() {
  // const [count, setCount] = useState(0);
  const [animateChat,setAnimateChat] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [filter, setFilter] = useState(null);
  useEffect(() => {
    async function getFacts() {
      const { data: facts, error } = await supabase
        .from('facts')
        .select('*')
      setFacts(facts);
    } getFacts();
  }, [])

  return (
    <>
      {/*header*/}
      <div className='w-full h-fit sticky top-0'>
      <header className='flex flex-row items-center justify-between w-full h-20 p-4 bg-zinc-900 text-white '>
        <div className='flex items-center'>
          <img src='logo.png' className='h-10 w-10 mr-4' alt='Logo'></img>
          <h1 className='text-3xl'>stuff</h1>
        </div>
        <button className='bg-blue-500 text-white px-4 py-2 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500'
          onClick={() => setShowForm((show) => !show)}>
          share a fact
        </button>
      </header>
      {/* share a fact */}
      <div className=''>{showForm ? <NewFactForm setFacts={setFacts} /> : null}</div>
</div>


      <div className='flex flex-row w-full h-full chat-frame fixed'>
        {/* filters */}
        <div className='sticky top-20 h-fit mt-2'>
          <CategoryFilter filter={filter} setFilter={setFilter} setAnimateChat={setAnimateChat} />
          {console.log(`${filter} is selected`)}
        </div>

        {/* list of facts */}
        <div className='h-full w-10/12 ml-4 mt-2 overflow-y-scroll'>
          <FactList facts={facts} setFacts={setFacts} filter={filter} animateChat={animateChat} setAnimateChat={setAnimateChat}/>
        </div>

      </div>

    </>
  );
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}
function NewFactForm({ setFacts }) {
  const [text, setText] = useState('');``
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');

  async function handleSubmit(e) {
    e.preventDefault(); //dont relaod the browser

    //check all the constraints
    // 1.check the length of text, valid httpurl,selected a category?
    if (text && isValidHttpUrl(source) && category && text.length <= 200) {
      const { data: newFact, error } = await supabase
        .from('facts')
        .insert([{ text, source, category }]).select();
      setFacts((facts) => [newFact[0], ...facts]);
      console.log(newFact);
    } else {
      alert("please fill all required entries...");
    }

  }
  return (
    <div
      className='w-full bg-black'>
      <motion.form onSubmit={handleSubmit} className='w-2/4'
        initial={{}}
        animate={{ x: 450, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <input type='text' className='rounded-xl bg-slate-800 border-none text-gray-300 mt-2 ml-4 mb-4 w-40' onChange={(e) => setText(e.target.value)} ></input>
        <input type='text' className='rounded-xl bg-slate-800 border-none text-gray-300 mt-2 ml-4 mb-4' onChange={(e) => setSource(e.target.value)}></input>
        <select id="currency" name="currency" class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" onChange={(e) => setCategory(e.target.value)}>
          <option>select category</option>
          {CATEGORIES.map((catgry) => (
            <option>{catgry.name}</option>
          ))}
        </select>
        <button className='blur-bg text-white w-20 h-7'>Post</button>
      </motion.form>
    </div>
  )
}

function CategoryFilter({ filter, setFilter,setAnimateChat }) {

  return (



    <aside className=''>
      <ul className=''>
        {CATEGORIES.map((catgry) => (
          <li className='text-white'>
            <button style={{ background: catgry.color }} className='h-7 w-48 rounded-full m-1 blur-bg' onClick={() => { setFilter(catgry.name);}}>
              {catgry.name}
            </button>

          </li>
        ))}
        <button className='h-7 w-48 rounded-full m-1 text-white' onClick={() => setFilter(null)}>clear filters</button>
      </ul>
    </aside>
    // <motion.aside
    //   className=''
    //   initial={{ opacity: 0, x: -20 }}
    //   animate={{ opacity: 1, x: 0 }}
    //   transition={{ duration: 0.5 }}
    // >
    //   <ul className=''>
    //     {CATEGORIES.map((catgry) => (
    //       <motion.li
    //         key={catgry.name}
    //         className='text-white'
    //         initial={{ opacity: 0, x: -20 }}
    //         animate={{ opacity: 1, x: 0 }}
    //         transition={{ duration: 0.5, delay: 0.1 }}
    //       >
    //         <motion.button
    //           style={{ background: catgry.color }}
    //           className='h-7 w-48 rounded-full m-1 blur-bg'
    //           onClick={() => setFilter(catgry.name)}
    //           whileHover={{ scale: 1.05 }}
    //         >
    //           {catgry.name}
    //         </motion.button>
    //       </motion.li>
    //     ))}
    //     <motion.button
    //       className='h-7 w-48 rounded-full m-1 text-white'
    //       onClick={() => setFilter(null)}
    //       initial={{ opacity: 0, x: -20 }}
    //       animate={{ opacity: 1, x: 0 }}
    //       transition={{ duration: 0.5, delay: 0.1 }}
    //     >
    //       clear filters
    //     </motion.button>
    //   </ul>
    // </motion.aside>

  )
}

function FactList({ facts, setFacts, filter,animateChat,setAnimateChat }) {
  async function handleVote(columnName, id) {
   
    console.log(animateChat);
    const test = facts.filter((fact) => fact.id === id).map((fact) => fact[columnName]);

    const { data, error } = await supabase
      .from('facts')
      .update({ [columnName]: Number(test) + 1 })
      .eq('id', id)
      .select();
    console.log(`Row with ID ${id} updated successfully. New value for ${columnName}:and ${data}`);

    console.log(`your value is --> ${test}`);
    console.log(data);
    if (error) {
      console.error(`this is the error --> ${error}`);
      return;
    }
    console.log(facts);
    // setFacts((facts) => [newFact[0], ...facts]);
    const newData = facts.map((fact) => fact.id == id ? { ...fact, [columnName]: data[0][columnName] } : fact);
    setFacts(newData);
    console.log(newData);
  }
  // 3) update book object in the array
  // const bookAfterUpdate = bookDataAfterDelete.map((el)=>el.id===1?{}:el);
  // const bookAfterUpdate = bookDataAfterDelete.map((el)=>el.id===1?{...el,pages:1210}:el);
  // bookAfterUpdate;
  // array filter method
  // in order to filter out elements from an array -based on a condition
  // const longBooks = books
  // .filter(book=>book.pages>500)
  // .filter(book=>book.hasMovieAdaptation);
  // longBooks;

  // const adventureBooks = books
  // .filter((book)=>book.genres.includes("adventure")
  // ).map((book)=>book.title);
  // adventureBooks;

  function Text({ fact}) {
    return (
      <>
        <motion.div 
        className='rounded-md flex flex-col blur-bg mb-2 w-full h-32 pt-3 pl-2 text-white justify-between scrolltry'

        initial={{scale:0}}
        animate={{scale:1}}
        transition={{type:'spring', stiffness:40, delay:0}}
        >
          <li className='list-none'>
            {fact.text}
          </li>
          <div className='flex flex-row-reverse '>
            <button className='mr-2 mb-1 rounded-md w-fit px-1' onClick={() => handleVote('votesFalse', fact.id)}>⛔{fact.votesFalse}</button>
            <button className='mr-2 mb-1 rounded-md w-fit px-1' onClick={() => handleVote('votesMindblowing', fact.id)}>🤯{fact.votesMindblowing}</button>
            <button className='mr-2 mb-1 rounded-md w-fit px-1>n' onClick={() => handleVote('votesInteresting', fact.id)}>👍{fact.votesInteresting}</button>
          </div>
        </motion.div></>
    )
  }
  return (
    <>
      {filter ?
        <ul className=''>
          {console.log('inside filter true')}
          {facts
            .filter((fact) => fact.category === filter)
            .map((fact) => (<Text fact={fact} />))}
        </ul> : facts.map((fact) => (

          <Text fact={fact} />

        ))}
    </>
  )
}

export default App;
