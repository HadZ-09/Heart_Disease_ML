import './app.css'
import { useState } from 'react'
function Header({facts})
{
    const [currentFact,setCurrentFact]=useState(facts[0])
    const [num, setNum]=useState(10)
        
    function getRandomQuote(){
        let random_num=Math.floor(Math.random()*facts.length);
        setCurrentFact(facts[random_num])
    }
    
    
    return(
        <>
        <div className="header">
            <div className='main_header'>
                {currentFact.quote}
                
            </div>
            <div className='basic_info'>{currentFact.desc}</div>
            <div className='button_header'>
            <button className='button_check'>Check Heart Score</button>
            <button className='button_know' onClick={getRandomQuote}>Know More</button>

            
        </div>
        </div>
        </>
    )
}

export default Header
