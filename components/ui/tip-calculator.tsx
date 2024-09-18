"use client";
// Import necessary hooks from React
import { useState, ChangeEvent } from "react";

// Import custom UI components from the UI directory
import {
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

// Label Component
function Label(props: React.HtmlHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className='text-xl font-bold mt-2 mb-2'>
    {props.children}
  </label>
}

// Tip buttons function
function TipButton(props: React.HtmlHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className='bg-[#B3001B] hover:bg-red-400 text-white hover:text-[#B3001B] border-2 border-outset hover:font-bold py-2 w-[75px] h-[50px] rounded ml-[5px]'>
      {props.children}
    </button>
  )
}

const tips = [5, 10, 15, 25, 30, 50];

export default function TipCalculatorComponent() {
  // State hooks for managing the bill amount, tip percentage, tip amount, and total amount
  const [billAmount, setBillAmount] = useState<number | null>(null);
  const [tipPercentage, setTipPercentage] = useState<number | null>(null);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Function to handle bill amount change
  const handleBillAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setBillAmount(parseFloat(e.target.value));
  };

  // Function to handle tip percentage change
  const handleTipPercentageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTipPercentage(parseFloat(e.target.value));
  };

  // Function to calculate tip amount and total amount
  const calculateTip = (): void => {
    if (billAmount !== null && tipPercentage !== null) {
      const tip = billAmount * (tipPercentage / 100); // Calculate the tip amount
      setTipAmount(tip); // Set the tip amount state
      setTotalAmount(billAmount + tip); // Set the total amount state
    }
  };

  // Function to reset all the form values
  const handleReset = (): void => {
    setBillAmount(null);
    setTipPercentage(null);
    setTipAmount(0);
    setTotalAmount(0);
  };

  return (
    <div className='bg-gradient-to-tr from-blue-300 to-teal-100 w-full min-h-screen flex justify-center items-center flex-col'>
      <section className='bg-pink-100 border-4 border-inset border-red-200 p-5 rounded-2xl w-full max-w-[800px] gap-x-2 gap-y-2 flex flex-col'>
        
        {/* Heading for Tip Calculator */}
        <h1 className="text-3xl font-bold text-[#B3001B] uppercase text-center w-full mb-4">
          Tip Calculator By Yusra Saleem
        </h1>
        <p className="text-lg font-semibold text-[#B3001B] text-center w-full mb-4">
        Enter the bill amount and tip percentage to calculate the tip and total.
        </p>

        {/* Left and Right Sections */}
        <div className="flex flex-col lg:flex-row w-full gap-x-4 gap-y-2">
          {/* Left Section */}
          <section className='bg-red-300 rounded-xl p-4 w-full lg:w-1/2 flex flex-col'>
            <Label>Bill</Label>
            <div className='relative flex'>
              <input type='number' placeholder='$ 00.00' id='bill-amount' name='bill-amount' className='text-center bg-red-200 outline outline-[#B3001B] rounded w-full h-[35px] px-2 text-xl text-[#B3001B] font-bold'
                value={billAmount !== null ? billAmount : ""}
                onChange={handleBillAmountChange}
              />
            </div>

            {/* Tip Buttons */}
            <section className='flex mt-4 flex-col items-center'>
              <Label>Select Tip %</Label>
              <div className='grid grid-cols-3 gap-y-4 mt-2 gap-x-3 justify-center'>
                {tips.map((tip, index) => (
                  <TipButton
                    key={index}
                    onClick={() => {
                      setTipPercentage(tip);
                      calculateTip();
                    }}
                  >
                    {tip}%
                  </TipButton>
                ))}
              </div>

              <div className='mt-4 flex'>
                <input
                  id="tip-percentage"
                  type="number"
                  placeholder="Custom Percentage"
                  className='text-center bg-red-200 outline outline-[#B3001B] rounded w-full h-[35px] px-2 text-xl text-[#B3001B] font-bold'
                  value={tipPercentage !== null ? tipPercentage : ""}
                  onChange={handleTipPercentageChange}
                />
              </div>
            </section>

            <div>
              {/* Button to calculate tip */}
              <Button className="mt-4 border-2 bg-[#B3001B] text-red-100 font-bold uppercase hover:bg-[#a7d49b] hover:text-[#B3001B] border-[#B3001B] rounded w-full h-[40px]" onClick={calculateTip}>
                Calculate
              </Button>
            </div>
          </section>

          {/* Right Section */}
          <div className='bg-[#B3001B] rounded-xl p-4 w-full md:h-[400px] lg:w-1/2 relative'>
            <CardFooter className="grid gap-2">
              {/* Tip Amount */}
              <div className="flex items-center justify-between gap-x-4 mt-14 text-xl text-red-100 font-bold">
                <span>Tip Amount:</span>
                <span className="font-extrabold text-2xl break-words">${tipAmount.toFixed(2)}</span>
              </div>

              {/* Total Amount */}
              <div className="flex items-center justify-between gap-x-4 mt-14 text-xl text-red-100 font-bold">
                <span>Total Amount:</span>
                <span className="font-extrabold text-2xl break-words">${totalAmount.toFixed(2)}</span>
              </div>
            </CardFooter>

            {/* Reset Button */}
            <div className="mt-8 text-center md:absolute md:bottom-4 md:left-2 md:right-2">
              <h4 className="text-white">Made with 🤍 by Yusra Saleem</h4>
              <input type="reset" onClick={handleReset} className="border-2 bg-red-200 text-[#B3001B] rounded font-bold uppercase hover:bg-[rgb(167,212,155)] hover:text-[#B3001B] w-full h-[40px] mt-4 mr-4" value="Reset" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
