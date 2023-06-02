import Toolbar from './Toolbar'
import {v4 as uuidv4} from 'uuid'
import { useRef, useState } from 'react'
// import { send_drawing, send_erase, recieve_drawing, recieve_erase } from '@/components/Home/utils/socket'

function useWhiteboard() {
  const [tool, setTool] = useState("PEN")
  const [paths, setPaths] = useState({})
  const [curPath, setCurPath] = useState(false)
  const [size, setSize] = useState(8)
  const isMouseDown = useRef(false)
  const boardRef = useRef()

  const erase = (e) => {
    if (tool == "ERASER" && isMouseDown.current) {
      delete paths[e.target.id]
      setPaths({...paths})
      // send_erase({'pathid': e.target.id})
    }
  }

  const mouseDown = (e, tool) => {
    isMouseDown.current = true

    if (tool == "PEN") {
      const rect = e.target.getBoundingClientRect()
      const x = e.pageX - rect.x
      const y = e.pageY - rect.y
      setCurPath(`M${x} ${y}`)
    }    
  }

  const mouseMove = (e) => {
    if (isMouseDown.current && tool == "PEN") {
      const rect = boardRef.current.getBoundingClientRect()
      const x = e.pageX - rect.x
      const y = e.pageY - rect.y
      setCurPath(curPath + ` L${x} ${y}`)
    }
  }
  
  const mouseUp = () => {
    setPaths({...paths, [uuidv4()]: [curPath, size]})
    // send_drawing({'path': curPath, 'size': size, 'color': 'white'})
    isMouseDown.current = false
    setCurPath(false)
  }

  return {tool, setTool, paths, setPaths, curPath, setCurPath, size, setSize, isMouseDown, boardRef, erase, mouseDown, mouseUp, mouseMove}
}


function Whiteboard() {

  const {tool, size, paths, curPath, setSize, setTool, boardRef, isMouseDown, erase, mouseDown, mouseUp, mouseMove} = useWhiteboard()

  return (
    <div className={`flex-1 relative overflow-scroll`}>
      
      <Toolbar setTool={setTool} tool={tool} setSize={setSize} size={size}/>
      
      <svg width="1920" height="1080" 
        className={`absolute left-0 top-0 min-w-[1920px] min-h-[1080px] w-full h-full ${tool == "ERASER"? "z-10": ""}`}
        onMouseDown={() => isMouseDown.current = true}
        onMouseUp={() => isMouseDown.current = false}
      >
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" strokeWidth="1" className="stroke-neutral-800"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
        
        {Object.keys(paths).map((key) => <path d={paths[key][0]} id={key} key={key} strokeWidth={paths[key][1]} stroke="white" strokeLinecap="round" strokeLinejoin="round" fill="none" onMouseMove={erase}/>)}
      </svg>
      
      <svg 
        width="1920" height="1080" className="absolute left-0 top-0 min-w-[1920px] min-h-[1080px] w-full h-full"
        onMouseMove={mouseMove}
        onMouseDown={(e) => mouseDown(e, tool)}
        onMouseUp={mouseUp}
        ref={boardRef}
      >
        {curPath && <path className="pointer-events-none" d={curPath} strokeLinecap="round" strokeLinejoin="round" strokeWidth={size} stroke="white" fill="none"/>}
      </svg>
    </div>
  )
}

export default Whiteboard
