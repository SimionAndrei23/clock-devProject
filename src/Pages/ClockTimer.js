import React, { useEffect, useState } from 'react'
import stopWatchIcon1 from '../Files/stopwatch.png'
import stopWatchIcon2 from '../Files/deadline.png'
import animationData from '../Files/clock-animation.json';
import Lottie from 'react-lottie';
import { dataTabs } from '../SampleData/tabsBottomData'
import { useNavigate } from 'react-router-dom';


const ClockTimer = () => {

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('Timer')
    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {

        let interval;

        if(isActive) {
            interval = setInterval(() => {
               const secondCounter = counter % 60;
               const minuteCounter = Math.floor(counter / 60);
               const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
               const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

               setSecond(computedSecond);
               setMinute(computedMinute);

               setCounter(counter => counter + 1 );
           },1000)
        }

        return () => clearInterval(interval)

    },[isActive, counter])


    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const stopTimer = () => {

        setIsActive(false);
        setCounter(0);
        setSecond('00');
        setMinute('00')

    }

    const tabHandler = (name) => {

        setActiveTab(name)
    
        if(name === 'Access') {

            navigate('/')
    
        }
        else if(name === 'AddAlarm') {
    
            navigate('/addAlarm')
        }
        else if (name === 'Timer') {
            navigate('/clockTimer')
        }
    }

    return (
       <div className = 'wrapperClock'>
           <div className = 'wrapperInside'>
                <div className="boxContent box1"></div>
                <div className="boxContent box2"></div>
                <div className="boxContent box3"></div>
                <header>
                    <div>  
                        <Lottie
                            options = {defaultOptions}
                            height = {40}
                            width = {40} 
                        />
                    </div> 
                    <div className = 'alarmSet'>
                        <p>Stopwatch for your moment!</p>
                    </div>
                    <div></div>
                </header>
               <div className="timerWrapper">
                    <div className = 'timerStats'>
                        <span className = 'minute'>{minute}</span>
                        <span>:</span>
                        <span className = 'seconds'>{second}</span>
                    </div>
                    <div className = 'buttonsTimer'>
                        <button onClick={() => setIsActive(!isActive)}>{isActive ? 'Pause': 'Start'}</button>
                        <button onClick={stopTimer}>Reset</button>
                    </div>
                    <div className = 'containerBox container1'>
                        <img src = {stopWatchIcon1} alt = 'StopwatchIcon' />
                    </div>
                    <div className = 'containerBox container2'>
                        <img src = {stopWatchIcon2} alt = 'StopwatchIcon' />
                    </div>
               </div>
                <div className = 'bottomTabs'>
                    <>
                        {dataTabs?.map((dataValue,index) => (
                            <div className = 'tabWrapper'>
                                <ul key = {index} className = {`wrapperIcon ${dataValue.name === activeTab ? 'active' : 'inactive'}`}>
                                    <li onClick = {() => tabHandler(dataValue.name)} className = 'iconWrapper active'>
                                        {
                                            dataValue.name === activeTab ? 
                                            (
                                                <div className = 'nameIcon'>
                                                    <span style = {{ color: '#f39fdc'}}>{dataValue.icon}</span>
                                                </div>
                                            ) : (
                                                <span style = {{ color: 'gray'}}>{dataValue.icon}</span>
                                            )
                                        }
                                    </li>
                                </ul>

                                <p className = {`iconTitle ${dataValue.name === activeTab ? 'active' : ''}`}>{dataValue.name}</p>
                            </div>      
                        ))}
                    </>
                </div>
           </div>
       </div>
    )
}

export default ClockTimer
