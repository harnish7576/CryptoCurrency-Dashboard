import ExchangeRate from "./ExchangeRate";
import {useState} from "react";
import axios from 'axios'

// const axios = require('axios'); 

const CurrencyConverter = () =>  {
    const currencies = ['AED', 'AUD', 'CAD', 'CNY', 'EUR', 'GBP', 'INR', 'JPY', 'NZD', 'RUB', 'THB', 'USD', 'BNB', 'BTC', 'DOGE', 'ETH', 'MATIC', 'USDT', 'XRP', 'LTC', 'ADA', 'SOL' ]
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('AED')
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('AED')
    const [amount, setAmount] = useState(1)
    
    const [result, setResult] = useState(0)

    

    const [exchangedData, setExchangedData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'BTC',
        exchangeRate: 0
    })

    const convert = async () =>{
        

        const options = {
            method: 'GET',
            url: 'http://localhost:8000/convert',
            params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency}
        }

        axios.request(options).then((response) => {
            console.log(response.data)
            setResult(response.data * amount)

            setExchangedData({
                primaryCurrency: chosenPrimaryCurrency,
                secondaryCurrency: chosenSecondaryCurrency,
                exchangeRate: response.data
            })
        }).catch((error) => {
            console.error(error)
        })
    }

    // console.log(exchangeRate)

    return (
      <div className="currency-converter">
        <h2>Currency Converter</h2>

        <div className="input-box">

            <table>
                <tbody>
                    <tr>
                        <td>Primary Currency:</td>
                        <td>
                            <input
                                type="number"
                                name="currency-amount-1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </td> 
                        <td>
                            <select
                                value={chosenPrimaryCurrency}
                                name="currency-option-1"
                                className="currency-options"
                                onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                                >
                                { currencies.map( currency => (<option>{currency}</option>) ) }
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Secondary Currency:</td>
                        <td>
                            <input
                                type="number"
                                name="currency-amount-2"
                                value={result}
                                disabled={true}
                            />
                        </td> 
                        <td>
                            <select
                                value={chosenSecondaryCurrency}
                                name="currency-option-2"
                                className="currency-options"
                                onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                                >
                                { currencies.map( currency => (<option>{currency}</option>) ) }
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button id="convert-button" onClick={convert}>Convert</button>
        </div>

        


        <ExchangeRate 
            exchangedData = {exchangedData}
            // chosenPrimaryCurrency = {primaryCurrencyExchanged}
            // chosenSecondaryCurrency = {secondaryCurrencyExchanged}
            
        />
      </div>
    )
  }
  
  export default CurrencyConverter;