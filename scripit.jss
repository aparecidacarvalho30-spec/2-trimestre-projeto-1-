// Variable global para cor do pincel
let currentColor = "#64ffda";

function setCanvasColor(color) {
    currentColor = color;
}

document.addEventListener("DOMContentLoaded", () => {

    // 1. Acessibilidade (Alto Contraste e Tamanho de Fonte)
    const btnHighContrast = document.getElementById("btn-high-contrast");
    const btnFontPlus = document.getElementById("btn-font-plus");
    const btnFontMinus = document.getElementById("btn-font-minus");
    let currentPx = 16;

    btnHighContrast.addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");
    });

    btnFontPlus.addEventListener("click", () => {
        if (currentPx < 20) {
            currentPx += 1;
            document.documentElement.style.setProperty('--font-scale', `${currentPx}px`);
        }
    });

    btnFontMinus.addEventListener("click", () => {
        if (currentPx > 14) {
            currentPx -= 1;
            document.documentElement.style.setProperty('--font-scale', `${currentPx}px`);
        }
    });

    // 2. Ancoragem 5-4-3-2-1
    const btnConcluirAncoragem = document.getElementById("btn-concluir-ancoragem");
    const respostaAncoragem = document.getElementById("resposta-ancoragem");

    btnConcluirAncoragem.addEventListener("click", () => {
        respostaAncoragem.innerHTML = `
            <h3><i class="fa-solid fa-seedling"></i> Mente Ancorada no Presente</h3>
            <p style="margin-top: 5px; color: var(--accent-cyan);">Parabéns por realizar o exercício! Perceber o ambiente ao seu redor ajuda a diminuir o ritmo dos pensamentos e devolve a sensação de controle.</p>
        `;
        respostaAncoragem.classList.remove("hidden");
    });

    // 3. Espaço de Desabafo Minimalista
    const campoDesabafo = document.getElementById("campo-desabafo");
    const charCounter = document.getElementById("char-counter");
    const formDesabafo = document.getElementById("form-desabafo");
    const respostaDesabafo = document.getElementById("resposta-desabafo");

    campoDesabafo.addEventListener("input", () => {
        const totalChars = campoDesabafo.value.length;
        charCounter.textContent = `${totalChars} caracteres`;
    });

    const mensagensAcolhedoras = [
        "Obrigado por externalizar o que sente. Tirar do pensamento é o primeiro passo para aliviar o peso.",
        "Suas emoções são válidas. Respire fundo e dê a si mesmo o tempo necessário para recuperar a calma.",
        "Você não está sozinho nessa jornada. Lembre-se de recorrer a pessoas de confiança quando precisar.",
        "Cada momento de tensão passa. Você é mais forte do que a pressão momentânea."
    ];

    formDesabafo.addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (campoDesabafo.value.trim() !== "") {
            const mensagemSorteada = mensagensAcolhedoras[Math.floor(Math.random() * mensagensAcolhedoras.length)];
            
            respostaDesabafo.innerHTML = `
                <h3><i class="fa-solid fa-heart"></i> Espaço de Acolhimento</h3>
                <p style="margin: 10px 0; font-style: italic; color: var(--accent-cyan);">"${mensagemSorteada}"</p>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">
                    Nota: O seu texto não foi salvo nem enviado a nenhum servidor.
                </p>
            `;
            respostaDesabafo.classList.remove("hidden");
            formDesabafo.reset();
            charCounter.textContent = "0 caracteres";
        }
    });

    // 4. Canvas de Desenho Livre e Desenho de Pets para Colorir
    const canvas = document.getElementById("drawing-canvas");
    const ctx = canvas.getContext("2d");
    const btnClearCanvas = document.getElementById("btn-clear-canvas");
    const btnDrawCat = document.getElementById("btn-draw-cat");
    const btnDrawDog = document.getElementById("btn-draw-dog");
    let isDrawing = false;

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!isDrawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.strokeStyle = currentColor;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchend", stopDrawing);
    canvas.addEventListener("touchmove", draw);

    btnClearCanvas.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Desenhar Gatinho
    btnDrawCat.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#e6f1ff";
        ctx.lineWidth = 3;
        ctx.beginPath();

        // Cabeça
        ctx.arc(300, 160, 60, 0, Math.PI * 2);
        
        // Orelhas
        ctx.moveTo(250, 120); ctx.lineTo(230, 60); ctx.lineTo(280, 105);
        ctx.moveTo(350, 120); ctx.lineTo(370, 60); ctx.lineTo(320, 105);

        // Olhos
        ctx.moveTo(280, 150); ctx.arc(275, 150, 6, 0, Math.PI * 2);
        ctx.moveTo(330, 150); ctx.arc(325, 150, 6, 0, Math.PI * 2);

        // Nariz e Boca
        ctx.moveTo(300, 165); ctx.lineTo(295, 172); ctx.lineTo(305, 172); ctx.closePath();
        ctx.moveTo(300, 172); ctx.arc(292, 178, 8, Math.PI, 0, true);
        ctx.moveTo(300, 172); ctx.arc(308, 178, 8, Math.PI, 0, true);

        // Bigodes
        ctx.moveTo(270, 170); ctx.lineTo(220, 165);
        ctx.moveTo(270, 175); ctx.lineTo(220, 180);
        ctx.moveTo(330, 170); ctx.lineTo(380, 165);
        ctx.moveTo(330, 175); ctx.lineTo(380, 180);

        ctx.stroke();
    });

    // Desenhar Cãozinho
    btnDrawDog.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#e6f1ff";
        ctx.lineWidth = 3;
        ctx.beginPath();

        // Cabeça
        ctx.arc(300, 150, 65, 0, Math.PI * 2);

        // Orelhas Caídas
        ctx.moveTo(240, 130);
        ctx.quadraticCurveTo(190, 180, 235, 220);
        ctx.quadraticCurveTo(255, 180, 245, 145);

        ctx.moveTo(360, 130);
        ctx.quadraticCurveTo(410, 180, 365, 220);
        ctx.quadraticCurveTo(345, 180, 355, 145);

        // Focinho e Nariz
        ctx.moveTo(300, 160); ctx.arc(300, 170, 25, 0, Math.PI * 2);
        ctx.moveTo(300, 155); ctx.arc(300, 160, 10, 0, Math.PI * 2);

        // Olhos
        ctx.moveTo(275, 135); ctx.arc(270, 135, 7, 0, Math.PI * 2);
        ctx.moveTo(335, 135); ctx.arc(330, 135, 7, 0, Math.PI * 2);

        // Língua
        ctx.moveTo(295, 185); ctx.arc(300, 192, 8, 0, Math.PI);

        ctx.stroke();
    });

    // 5. Jogo do Plástico Bolha Virtual
    const bubbleGrid = document.getElementById("bubble-grid");
    const popCountElem = document.getElementById("pop-count");
    const btnResetBubbles = document.getElementById("btn-reset-bubbles");
    let popCount = 0;

    function createBubbles() {
        bubbleGrid.innerHTML = "";
        for (let i = 0; i < 24; i++) {
            const bubble = document.createElement("div");
            bubble.classList.add("bubble");
            bubble.addEventListener("click", () => {
                if (!bubble.classList.contains("popped")) {
                    bubble.classList.add("popped");
                    popCount++;
                    popCountElem.textContent = popCount;
                }
            });
            bubbleGrid.appendChild(bubble);
        }
    }

    btnResetBubbles.addEventListener("click", () => {
        createBubbles();
    });

    createBubbles();

    // 6. Quiz Interativo
    const btnCalcularQuiz = document.getElementById("btn-calcular-quiz");
    const quizResultado = document.getElementById("quiz-resultado");

    const gabarito = {
        q1: 'b',
        q2: 'a',
        q3: 'b',
        q4: 'b',
        q5: 'a'
    };

    btnCalcularQuiz.addEventListener("click", () => {
        let acertos = 0;
        const total = 5;

        for (let i = 1; i <= total; i++) {
            const marcada = document.querySelector(`input[name="q${i}"]:checked`);
            if (marcada && marcada.value === gabarito[`q${i}`]) {
                acertos++;
            }
        }

        quizResultado.innerHTML = `
            <h3><i class="fa-solid fa-award"></i> Resultado do Quiz</h3>
            <p>Você acertou <strong>${acertos}</strong> de <strong>${total}</strong> perguntas de inteligência emocional e estratégias de convivência.</p>
            <p style="margin-top: 8px; color: var(--text-secondary);">
                ${acertos === 5 ? 'Parabéns! Você domina ótimas estratégias de autocuidado e empatia no ambiente escolar.' : 'Ótimo esforço! Reveja as dicas no topo da página para aprimorar seu bem-estar.'}
            </p>
        `;
        quizResultado.classList.remove("hidden");
    });

    // 7. Botão Voltar ao Topo
    const btnBackToTop = document.getElementById("btn-back-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btnBackToTop.style.display = "flex";
        } else {
            btnBackToTop.style.display = "none";
        }
    });

    btnBackToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});