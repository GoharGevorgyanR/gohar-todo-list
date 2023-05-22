import './loader.css'

export default function Loader(){
   return(
    <div className=' absolute  w-1/4 top-50 left-50 text-center z-index-1  '>
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
   )
}