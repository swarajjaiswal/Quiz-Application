import React, { useRef, useState } from 'react';
import { data } from '../assets/data';

const Quiz1 = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [trueClick, setTrueClick] = useState(false);
    const [count, setCount] = useState(0);

    const refs = [useRef(), useRef(), useRef(), useRef()];

    const handleClick = (e) => {
        const answer = question.ans;
        if (e === answer) {
            refs[e - 1].current.style.backgroundColor = "green";
            setCount(count + 1);
        } else {
            refs[e - 1].current.style.backgroundColor = "red";

        }
        setTrueClick(true);
    };

    const handleNext = () => {
        refs.forEach(ref => {
            ref.current.style.backgroundColor = "";
            ref.current.classList.remove("correct-border");
        });
        setIndex(index + 1);
        setQuestion(data[index + 1]);
        setTrueClick(false);
    };

    const handlePlayAgain = () => {
        setQuestion(data[0]);
        setIndex(0);
        setCount(0);
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
            {question ? (
                <div className="container w-4/5 h-auto lg:w-2/5 p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold mb-4">Quiz App</h1>
                    <div className="bg-gray-700 h-1 w-3/5 mb-4"></div>
                    <div className="question p-4 mb-4">
                        <h2 className="text-xl font-semibold">{index + 1}. {question.question}</h2>
                    </div>
                    <div className="options w-full flex flex-col justify-center items-center">
                        {["option1", "option2", "option3", "option4"].map((option, i) => (
                            <button key={i} ref={refs[i]} onClick={!trueClick ? () => handleClick(i + 1) : null} className={`bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg m-2 w-3/4 transition duration-200 
                                ${trueClick && i + 1 === question.ans ? 'border-2 border-green-500' : ''
                                } `}
                            >
                                {question[option]}
                            </button>
                        ))}
                    </div>
                    <div className="nextBtn mt-5 mb-3">
                        <button
                            onClick={trueClick ? handleNext : () => alert("Select an option to continue")}
                            className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-8 rounded-lg text-xl transition duration-200">
                            Next
                        </button>
                    </div>
                    <h2 className="mt-4">{index + 1} out of {data.length} questions</h2>
                    <div className="progress w-full bg-gray-700 rounded-full h-4 mt-2">
                        <div className="bg-blue-500 h-4 rounded-full"
                            style={{ width: `${((index + 1) / data.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
            ) : (
                <div className="scoreCard gap-5 w-4/5 lg:w-2/5 p-6 bg-gray-400 rounded-lg shadow-lg flex flex-col justify-center items-center">
                    <h1 className="text-6xl font-bold mb-4">Quiz Finished</h1>
                    <h2 className="text-3xl font-semibold mb-2">Your Final Score is {count} / {data.length}</h2>
                    <h2 className="text-3xl font-semibold mb-4">Accuracy: {(count / data.length) * 100}%</h2>
                    <h2 className="text-3xl font-semibold mb-4">Incorrect: {(data.length) - count}</h2>
                    <button
                        onClick={handlePlayAgain}
                        className="bg-black hover:bg-gray-800 text-white py-2 px-6 rounded-lg text-xl transition duration-200"
                    >
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz1;
