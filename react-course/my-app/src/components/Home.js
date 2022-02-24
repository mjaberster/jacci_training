import React ,{useState} from "react";
import "./Home.css"
import { useEffect, useRef } from "react/cjs/react.development";

const Home = () => {

    const fromRef = useRef(null)
    const toRef = useRef(null)
    const amountRef = useRef(null)

    const [value, setValue] = useState("")
    const [getValueFlag, setGetValueFlag] = useState(false)
    
    const getValue = (e) => {
        e.preventDefault();
        setGetValueFlag(true);
    }

    useEffect(()=>{
        if(getValueFlag) {
            fetch(`https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${fromRef.current.value}&to=${toRef.current.value}&amount=${amountRef.current.value}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
                    "x-rapidapi-key": "7e96c81625msh4476496a5805e96p16a530jsn5e2f29723e04"
                }
            })
            .then((response) =>


                response.json().then((data) => {
                    

                    console.log(data.rates[toRef.current.value].rate_for_amount)
                    setValue(data.rates[toRef.current.value].rate_for_amount);
                })
            )
            .catch((err) => {
                console.error(err);
            });
            setGetValueFlag(false)
        }
    }, [getValueFlag]);


    return <React.Fragment>
            <div>
                <span><label>From</label></span>
                <span><input type="text" ref={fromRef}/></span>
            </div>
            <div>
                <span><label>To</label></span>
                <span><input type="text" ref={toRef}/></span>
            </div>
            <div>
                <span><label>Amount</label></span>
                <span><input type="text" id="amount" ref={amountRef}/></span>
            </div>
            <div>
                <span>
                    <input type="submit" onClick={getValue} value="Convert"/>
                </span>
            </div>
            <div><label>Value: {value}</label></div>
    </React.Fragment>
}

export default Home;