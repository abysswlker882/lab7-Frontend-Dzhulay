document.addEventListener("DOMContentLoaded", () => {
    // 1. Добавление стилей Dark Souls в head
    const style = document.createElement("style");
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Cinzel', serif, Georgia, 'Times New Roman';
        }

        body {
            background: #080707;
            background-image: radial-gradient(circle, #1a0f0a 0%, #050505 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            color: #c8b69e;
            overflow-x: hidden;
        }

        /* Карточка-контейнер в стиле древнего свитка / алтаря */
        .card-container {
            position: relative;
            width: 100%;
            max-width: 480px;
            aspect-ratio: 1 / 1.15;
            background: rgba(15, 12, 10, 0.95);
            border-radius: 4px;
            padding: 30px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 0 35px rgba(212, 85, 0, 0.25), inset 0 0 20px rgba(0, 0, 0, 0.9);
            border: 2px solid #5a4332;
            outline: 1px solid #1a100a;
        }

        /* Блок ввода вопроса */
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
            padding: 12px 18px;
            border-radius: 2px;
            border: 1px solid #8c6d46;
            background: rgba(18, 14, 11, 0.9);
            color: #e6d3b7;
            font-size: 1rem;
            text-align: center;
            outline: none;
            transition: all 0.3s ease;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
            letter-spacing: 1px;
        }

        .question-input:focus {
            border-color: #ff6600;
            box-shadow: 0 0 15px rgba(255, 102, 0, 0.4), inset 0 0 10px rgba(0, 0, 0, 0.9);
        }

        /* Ошибка валидации */
        .error-message {
            color: #ff3333;
            font-size: 0.85rem;
            min-height: 18px;
            font-weight: bold;
            text-shadow: 0 0 8px rgba(255, 0, 0, 0.6);
            text-align: center;
            letter-spacing: 1px;
        }

        /* Костёр (Bonfire) */
        .bonfire-container {
            position: relative;
            width: 75%;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            background: radial-gradient(circle at 50% 50%, #3d1c06 0%, #170a03 50%, #050201 100%);
            box-shadow: inset 0 0 40px #000000, 0 0 30px rgba(220, 80, 0, 0.3);
            border: 1px solid #3a2618;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.3s ease;
            user-select: none;
        }

        .bonfire-container:hover {
            transform: scale(1.02);
            box-shadow: inset 0 0 40px #000000, 0 0 45px rgba(255, 102, 0, 0.5);
        }

        /* Текст ответа / предсказания */
        .answer-text {
            color: #fce8cd;
            font-size: 1.4rem;
            font-weight: 700;
            text-shadow: 0 0 10px #ff5500, 0 0 20px #ff2200, 0 0 30px #000000;
            text-align: center;
            padding: 0 20px;
            opacity: 1;
            transition: opacity 0.5s ease;
            text-transform: uppercase;
            letter-spacing: 2px;
            line-height: 1.4;
        }

        /* Анимация разгорания костра */
        @keyframes kindle {
            0% { box-shadow: inset 0 0 40px #000000, 0 0 20px rgba(255, 60, 0, 0.3); transform: scale(1); }
            50% { box-shadow: inset 0 0 20px #ff3300, 0 0 60px rgba(255, 120, 0, 0.9); transform: scale(1.04); }
            100% { box-shadow: inset 0 0 40px #000000, 0 0 20px rgba(255, 60, 0, 0.3); transform: scale(1); }
        }

        .kindling {
            animation: kindle 0.7s ease-in-out;
        }

        /* Кнопка в стиле интерфейса DS */
        .ask-btn {
            padding: 12px 30px;
            background: linear-gradient(180deg, #2a1c13 0%, #120b07 100%);
            border: 1px solid #8c6d46;
            color: #d1c0a5;
            font-size: 0.95rem;
            font-weight: bold;
            cursor: pointer;
            letter-spacing: 2px;
            text-transform: uppercase;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
            transition: all 0.2s ease;
            z-index: 10;
        }

        .ask-btn:hover {
            background: linear-gradient(180deg, #3d291c 0%, #1a100a 100%);
            color: #ffaa44;
            border-color: #ff6600;
            box-shadow: 0 0 15px rgba(255, 102, 0, 0.4);
        }

        .ask-btn:active {
            transform: translateY(1px);
        }

        /* Адаптивность */
        @media (max-width: 480px) {
            .card-container {
                max-width: 100%;
                padding: 20px 15px;
            }
            .question-input {
                font-size: 0.9rem;
            }
            .answer-text {
                font-size: 1.1rem;
            }
        }
    `;
    document.head.appendChild(style);

    // 2. Предсказания в стиле Dark Souls
    const answers = [
        "HUMANITY RESTORED",
        "YOU DIED",
        "BONFIRE LIT",
        "Praise the Sun!",
        "The Flame fades...",
        "Don't you dare go Hollow",
        "Fate lies in the Abyss",
        "Ashen One, speak",
        "Fear the Dark",
        "Victory Achieved"
    ];

    // 3. Динамическая сборка DOM
    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";

    const inputWrapper = document.createElement("div");
    inputWrapper.className = "input-wrapper";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "question-input";
    input.placeholder = "Вопрошай у пламени...";
    input.value = "Зажечь ли костёр?";

    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(errorMessage);

    const bonfire = document.createElement("div");
    bonfire.className = "bonfire-container";

    const answerText = document.createElement("div");
    answerText.className = "answer-text";
    answerText.textContent = "Praise the Sun!";

    bonfire.appendChild(answerText);

    const button = document.createElement("button");
    button.className = "ask-btn";
    button.textContent = "Возжечь Пламя";

    cardContainer.appendChild(inputWrapper);
    cardContainer.appendChild(bonfire);
    cardContainer.appendChild(button);

    document.body.appendChild(cardContainer);

    // 4. Логика предсказания и анимации
    function getPrediction() {
        const question = input.value.trim();

        if (question === "") {
            errorMessage.textContent = "Пламя не слышит тишины!";
            input.focus();
            return;
        }

        if (question.length < 3) {
            errorMessage.textContent = "Слишком короткое воззвание!";
            return;
        }

        errorMessage.textContent = "";

        bonfire.classList.add("kindling");
        answerText.style.opacity = "0";

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * answers.length);
            answerText.textContent = answers[randomIndex];
            answerText.style.opacity = "1";
            bonfire.classList.remove("kindling");
        }, 600);
    }

    button.addEventListener("click", getPrediction);
    bonfire.addEventListener("click", getPrediction);

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
