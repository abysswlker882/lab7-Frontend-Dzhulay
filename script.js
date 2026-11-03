document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement("style");
    style.textContent = `
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #050510;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            color: #ffffff;
            overflow-x: hidden;
        }

        .card-container {
            position: relative;
            width: 100%;
            max-width: 450px;
            aspect-ratio: 1 / 1.1;
            background: #090a16;
            border-radius: 12px;
            padding: 25px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 0 20px rgba(0, 255, 128, 0.2), inset 0 0 15px rgba(0, 150, 255, 0.3);
            border: 2px solid transparent;
            border-image: linear-gradient(135deg, #00ffcc, #0066ff, #9900ff) 1;
        }

        .input-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            z-index: 10;
        }

        .question-input {
            width: 90%;
            padding: 12px 20px;
            border-radius: 25px;
            border: 2px solid #b19ffb;
            background: rgba(225, 215, 255, 0.9);
            color: #220044;
            font-size: 1.1rem;
            font-weight: 600;
            text-align: center;
            outline: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(177, 159, 251, 0.4);
        }

        .question-input:focus {
            background: #ffffff;
            box-shadow: 0 0 20px rgba(177, 159, 251, 0.8);
            border-color: #7042f8;
        }

        .error-message {
            color: #ff4d4d;
            font-size: 0.85rem;
            min-height: 18px;
            font-weight: bold;
            text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
            text-align: center;
        }

        .ball {
            position: relative;
            width: 80%;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            background: radial-gradient(circle at 35% 35%, #e1bfff, #9a5cf0 40%, #200b45 70%, #080114 100%);
            box-shadow: inset -10px -10px 30px rgba(0, 0, 0, 0.9),
                        inset 10px 10px 20px rgba(255, 255, 255, 0.4),
                        0 0 35px rgba(154, 92, 240, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: transform 0.2s ease;
            user-select: none;
        }

        .ball:hover {
            transform: scale(1.02);
        }

        .answer-text {
            color: #ffffff;
            font-size: 2rem;
            font-weight: bold;
            text-shadow: 0 0 10px #ffffff, 0 0 20px #b19ffb, 0 0 30px #7042f8;
            text-align: center;
            padding: 0 15px;
            opacity: 1;
            transition: opacity 0.5s ease;
        }

        @keyframes shake {
            0% { transform: translate(0, 0) rotate(0deg); }
            20% { transform: translate(-10px, 5px) rotate(-5deg); }
            40% { transform: translate(10px, -5px) rotate(5deg); }
            60% { transform: translate(-10px, -5px) rotate(-3deg); }
            80% { transform: translate(10px, 5px) rotate(3deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }

        .shaking {
            animation: shake 0.6s ease-in-out;
        }

        .ask-btn {
            padding: 10px 25px;
            background: linear-gradient(45deg, #7042f8, #00d2ff);
            border: none;
            border-radius: 20px;
            color: white;
            font-weight: bold;
            font-size: 1rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 210, 255, 0.3);
            transition: transform 0.2s, box-shadow 0.2s;
            z-index: 10;
        }

        .ask-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 210, 255, 0.5);
        }

        @media (max-width: 480px) {
            .card-container {
                max-width: 100%;
                padding: 20px 15px;
            }
            .question-input {
                font-size: 0.95rem;
                padding: 10px 15px;
            }
            .answer-text {
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(style);

    const answers = [
        "Yes", "No", "Maybe", "Ask again later",
        "Definitely", "Most likely", "Outlook good",
        "Don't count on it", "Very doubtful", "Signs point to yes"
    ];

    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";

    const inputWrapper = document.createElement("div");
    inputWrapper.className = "input-wrapper";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "question-input";
    input.placeholder = "Задайте питання...";
    input.value = "Чи буде завтра сонячно?";

    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(errorMessage);

    const ball = document.createElement("div");
    ball.className = "ball";

    const answerText = document.createElement("div");
    answerText.className = "answer-text";
    answerText.textContent = "Yes";

    ball.appendChild(answerText);

    const button = document.createElement("button");
    button.className = "ask-btn";
    button.textContent = "Отримати відповідь";

    cardContainer.appendChild(inputWrapper);
    cardContainer.appendChild(ball);
    cardContainer.appendChild(button);

    document.body.appendChild(cardContainer);

    function getPrediction() {
        const question = input.value.trim();

        if (question === "") {
            errorMessage.textContent = "Будь ласка, введіть запитання!";
            input.focus();
            return;
        }

        if (question.length < 3) {
            errorMessage.textContent = "Запитання надто коротке!";
            return;
        }

        errorMessage.textContent = "";

        ball.classList.add("shaking");
        answerText.style.opacity = "0";

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * answers.length);
            answerText.textContent = answers[randomIndex];
            answerText.style.opacity = "1";
            ball.classList.remove("shaking");
        }, 600);
    }

    button.addEventListener("click", getPrediction);
    ball.addEventListener("click", getPrediction);

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            getPrediction();
        }
    });

    input.addEventListener("input", () => {
        if (input.value.trim() !== "") {
            errorMessage.textContent = "";
        }
    });
});