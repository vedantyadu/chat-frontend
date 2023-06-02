import {CgPen} from 'react-icons/cg'
import {BsEraserFill} from 'react-icons/bs'

function Toolbar({tool, setTool, size, setSize}) {
  return (
    <div className='py-2 px-4 w-max sticky left-4 top-4 bg-neutral-900 rounded-full z-20'>
      <button className={`p-2 text-lg rounded-full mr-2 ${tool == "PEN"? "text-neutral-300": "text-neutral-600"}`} onClick={() => setTool("PEN")}>
        <CgPen/>
      </button>
      <button className={`p-2 text-lg rounded-full mr-4 ${tool == "ERASER"? "text-neutral-300": "text-neutral-600"}`} onClick={() => setTool("ERASER")}>
        <BsEraserFill/>
      </button>
      <input className="w-32" type="range" min="1" max="30" value={size} onChange={(e) => setSize(e.target.value)}></input>
    </div>
  )
}

export default Toolbar
