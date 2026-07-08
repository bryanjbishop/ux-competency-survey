// Application State
let surveyState = {
    role: null,
    name: null,
    currentQuestionIndex: 0,
    responses: {},
    startTime: null,
    completionTime: null
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadSurveyData();

    const nameInput = document.getElementById('nameInput');
    if (nameInput) {
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') submitName();
        });
    }
});

// Theme Management - Dark mode only
function initTheme() {
    document.documentElement.classList.add('dark');
}

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0);

    const appContainer = document.getElementById('app');
    if (appContainer) {
        appContainer.classList.remove('items-start', 'justify-start');
        appContainer.classList.add('items-center', 'justify-center', 'p-4', 'md:p-6');
        appContainer.style.padding = '';
        appContainer.style.margin = '';
        appContainer.style.alignItems = '';
        appContainer.style.justifyContent = '';
    }

    // Hide home icon on welcome screen
    const topLeftControls = document.querySelector('.fixed.top-4.left-4');
    if (topLeftControls) {
        topLeftControls.style.display = screenId === 'welcomeScreen' ? 'none' : 'block';
    }
}

function startSurvey() {
    surveyState = {
        role: null,
        name: null,
        currentQuestionIndex: 0,
        responses: {},
        startTime: new Date().toISOString(),
        completionTime: null
    };
    showScreen('roleScreen');
}

function selectRole(role) {
    surveyState.role = role;
    showScreen('nameScreen');
}

function submitName() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();

    if (!name) {
        alert('Please enter your name to continue');
        return;
    }

    surveyState.name = name;
    surveyState.currentQuestionIndex = 0;
    showScreen('surveyScreen');
    renderQuestion();
}

function returnHome() {
    showScreen('welcomeScreen');
}

// Survey Logic
function renderQuestion() {
    const questions = competencies[surveyState.role].questions;
    const currentQuestion = questions[surveyState.currentQuestionIndex];
    const isLastQuestion = surveyState.currentQuestionIndex === questions.length - 1;

    const segmentedBars = document.getElementById('internProgressBars');
    const singleBar = document.getElementById('singleProgressBar');
    if (segmentedBars) segmentedBars.style.display = 'block';
    if (singleBar) singleBar.style.display = 'none';
    updateSegmentedProgressBars();

    const roleInfo = competencies[surveyState.role].role;
    const roleLevelElement = document.getElementById('roleLevel');
    if (roleLevelElement) {
        if (roleInfo.includes(' - ')) {
            const [level, name] = roleInfo.split(' - ');
            roleLevelElement.textContent = level.toUpperCase() + ': ';
            roleLevelElement.nextElementSibling.textContent = name;
        } else {
            roleLevelElement.textContent = 'INTERN';
            roleLevelElement.nextElementSibling.textContent = '';
        }
    }

    const cleanTitle = currentQuestion.title.replace(/\s*\([^)]*\)\s*/g, '').trim();
    document.getElementById('questionTitle').textContent = cleanTitle;

    let subtitleHTML = `<p class="text-sm" style="margin-bottom: 64px;">${currentQuestion.description}</p>`;

    if (currentQuestion.subCompetencies && currentQuestion.subCompetencies.length > 0) {
        subtitleHTML += '<div>';
        currentQuestion.subCompetencies.forEach((subComp, index) => {
            const subCompNumber = `${surveyState.currentQuestionIndex + 1}.${index + 1}`;

            if (currentQuestion.isEvidence) {
                const textValue = surveyState.responses[subComp.id] || '';
                const escapedValue = String(textValue)
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
                const badgeHTML = subComp.promptType === '360'
                    ? '<span class="inline-block px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 rounded-full mb-3">Manager / 360 input — best assessed via peer feedback</span>'
                    : '<span class="inline-block px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 rounded-full mb-3">Evidence prompt — narrative, not scored</span>';
                subtitleHTML += `
                    <div class="mb-12">
                        <div class="mb-4">
                            <p class="text-sm font-semibold text-primary mb-3">${subCompNumber}</p>
                            ${badgeHTML}
                            <p class="text-2xl leading-relaxed text-white mt-2">${subComp.fullText}</p>
                        </div>
                        <textarea
                            data-subcomp-id="${subComp.id}"
                            oninput="updateEvidenceResponse('${subComp.id}', this.value)"
                            rows="5"
                            placeholder="Share your evidence here..."
                            class="w-full p-4 rounded-lg bg-card text-foreground text-base border border-input focus:border-primary focus:outline-none resize-y"
                        >${escapedValue}</textarea>
                    </div>
                `;
                return;
            }

            const ratingValue = surveyState.responses[subComp.id] || 0;
            const score4Block = subComp.score4Text
                ? `<p class="text-sm text-muted-foreground italic mt-4"><span class="font-semibold not-italic text-primary">For example:</span> ${subComp.score4Text}</p>`
                : '';

            subtitleHTML += `
                <div class="mb-12">
                    <div class="mb-8">
                        <p class="text-sm font-semibold text-primary mb-4">${subCompNumber}</p>
                        <p class="text-2xl leading-relaxed text-white">${subComp.fullText}</p>
                        ${score4Block}
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        ${[1, 2, 3, 4, 5].map(rating => {
                            const labels = ['Learning', 'Developing', 'Proficient', 'Advanced', 'Expert'];
                            const descriptions = [
                                "I'm still learning this; I rely on guidance and examples",
                                "I can do this with some support, or on straightforward cases",
                                "I can do this independently and reliably in typical situations",
                                "I do this well even when it's complex, ambiguous, or unfamiliar, using sound judgment",
                                "I consistently do this at a high level on the hardest, highest-stakes, or most novel problems, where there's no established playbook"
                            ];
                            return `
                            <button onclick="selectSubCompRating('${subComp.id}', ${rating})"
                                    data-subcomp-id="${subComp.id}"
                                    data-rating="${rating}"
                                    class="sub-rating-btn flex flex-col items-center justify-start gap-1 p-6 rounded-lg transition-all ${ratingValue === rating ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}">
                                <span class="text-4xl font-bold text-white">${rating}</span>
                                <span class="text-xs font-semibold text-center">${labels[rating - 1]}</span>
                                <span class="text-xs opacity-70 text-center leading-tight">${descriptions[rating - 1]}</span>
                            </button>
                        `;
                        }).join('')}
                    </div>
                </div>
            `;
        });
        subtitleHTML += '</div>';
    } else if (currentQuestion.bullets && currentQuestion.bullets.length > 0) {
        subtitleHTML += '<ul class="list-disc ml-5 mb-4 space-y-2">';
        currentQuestion.bullets.forEach(bullet => {
            subtitleHTML += `<li>${bullet}</li>`;
        });
        subtitleHTML += '</ul>';
    }

    document.getElementById('questionSubtitle').innerHTML = subtitleHTML;

    document.getElementById('questionCounter').textContent =
        `Question ${surveyState.currentQuestionIndex + 1} of ${questions.length}`;

    const previousResponse = surveyState.responses[currentQuestion.id];
    document.querySelectorAll('.rating-option').forEach(option => {
        option.classList.remove('selected', 'border-primary', 'bg-primary', 'text-primary-foreground', 'scale-105');
        option.classList.add('border-input', 'bg-card');

        if (previousResponse && parseInt(option.dataset.value) === previousResponse) {
            option.classList.add('selected', 'border-primary', 'bg-primary', 'text-primary-foreground', 'scale-105');
            option.classList.remove('border-input', 'bg-card');
        }
    });

    const prevBtn = document.getElementById('prevBtn');
    prevBtn.style.visibility = surveyState.currentQuestionIndex === 0 ? 'hidden' : 'visible';

    const finishBtn = document.getElementById('finishBtn');
    finishBtn.style.display = (isLastQuestion && previousResponse) ? 'inline-flex' : 'none';
}

function selectSubCompRating(subCompId, value) {
    surveyState.responses[subCompId] = value;

    const buttons = document.querySelectorAll(`[data-subcomp-id="${subCompId}"]`);
    buttons.forEach(btn => {
        const btnValue = parseInt(btn.getAttribute('data-rating'));
        if (btnValue === value) {
            btn.classList.add('bg-primary', 'text-primary-foreground');
            btn.classList.remove('bg-muted/50');
        } else {
            btn.classList.remove('bg-primary', 'text-primary-foreground');
            btn.classList.add('bg-muted/50');
        }
    });

    updateProgressBar();

    const questions = competencies[surveyState.role].questions;
    const currentQuestion = questions[surveyState.currentQuestionIndex];
    if (currentQuestion.subCompetencies) {
        const allRated = currentQuestion.subCompetencies.every(sub => surveyState.responses[sub.id]);
        const isLastQuestion = surveyState.currentQuestionIndex === questions.length - 1;
        const currentSubIndex = currentQuestion.subCompetencies.findIndex(sub => sub.id === subCompId);
        const hasNextSub = currentSubIndex < currentQuestion.subCompetencies.length - 1;

        if (allRated && isLastQuestion) {
            document.getElementById('finishBtn').style.display = 'inline-flex';
        } else if (allRated && !isLastQuestion) {
            setTimeout(() => nextQuestion(), 500);
        } else if (hasNextSub && !allRated) {
            setTimeout(() => {
                const nextSubId = currentQuestion.subCompetencies[currentSubIndex + 1].id;
                const nextSubButtons = document.querySelectorAll(`[data-subcomp-id="${nextSubId}"]`);
                if (nextSubButtons.length > 0) {
                    const nextSubElement = nextSubButtons[0].closest('.mb-12');
                    if (nextSubElement) {
                        nextSubElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }, 300);
        }
    }
}

function updateEvidenceResponse(subCompId, value) {
    if (value && value.trim().length > 0) {
        surveyState.responses[subCompId] = value;
    } else {
        delete surveyState.responses[subCompId];
    }

    updateProgressBar();

    const questions = competencies[surveyState.role].questions;
    const currentQuestion = questions[surveyState.currentQuestionIndex];
    const isLastQuestion = surveyState.currentQuestionIndex === questions.length - 1;

    if (currentQuestion.subCompetencies) {
        const allCompleted = currentQuestion.subCompetencies.every(sub => Boolean(surveyState.responses[sub.id]));
        const finishBtn = document.getElementById('finishBtn');
        if (allCompleted && isLastQuestion) {
            finishBtn.style.display = 'inline-flex';
        } else if (isLastQuestion) {
            finishBtn.style.display = 'none';
        }
    }
}

function updateProgressBar() {
    updateSegmentedProgressBars();
}

function updateSegmentedProgressBars() {
    const questions = competencies[surveyState.role].questions;

    questions.forEach((question, index) => {
        let totalSubComps = question.subCompetencies ? question.subCompetencies.length : 0;
        let completedSubComps = 0;

        if (question.subCompetencies) {
            question.subCompetencies.forEach(subComp => {
                if (surveyState.responses[subComp.id]) completedSubComps++;
            });
        }

        const progress = totalSubComps > 0 ? (completedSubComps / totalSubComps) * 100 : 0;
        const progressSegment = document.getElementById(`progressSegment${index}`);
        if (progressSegment) progressSegment.style.width = `${progress}%`;
    });
}

function selectRating(value) {
    const questions = competencies[surveyState.role].questions;
    const currentQuestion = questions[surveyState.currentQuestionIndex];
    const isLastQuestion = surveyState.currentQuestionIndex === questions.length - 1;

    surveyState.responses[currentQuestion.id] = value;

    document.querySelectorAll('.rating-option').forEach(option => {
        option.classList.remove('selected', 'border-primary', 'bg-primary', 'text-primary-foreground', 'scale-105');
        option.classList.add('border-input', 'bg-card');

        if (parseInt(option.dataset.value) === value) {
            option.classList.add('selected', 'border-primary', 'bg-primary', 'text-primary-foreground', 'scale-105');
            option.classList.remove('border-input', 'bg-card');
        }
    });

    if (isLastQuestion) {
        document.getElementById('finishBtn').style.display = 'inline-flex';
    } else {
        setTimeout(() => nextQuestion(), 500);
    }
}

function previousQuestion() {
    if (surveyState.currentQuestionIndex > 0) {
        surveyState.currentQuestionIndex--;
        renderQuestion();
        const surveyContent = document.getElementById('surveyContent');
        if (surveyContent) surveyContent.scrollTop = 0;
    }
}

function nextQuestion() {
    const questions = competencies[surveyState.role].questions;

    if (surveyState.currentQuestionIndex < questions.length - 1) {
        surveyState.currentQuestionIndex++;
        renderQuestion();
        const surveyContent = document.getElementById('surveyContent');
        if (surveyContent) surveyContent.scrollTop = 0;
    } else {
        completeSurvey();
    }
}

function completeSurvey() {
    surveyState.completionTime = new Date().toISOString();
    saveSurveyData();
    showScreen('completionScreen');
    setTimeout(() => launchConfetti(), 100);
}

// Confetti Animation
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const confettiCount = 150;
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            this.speedY += 0.05;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new ConfettiPiece());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let stillAnimating = false;

        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
            if (piece.y < canvas.height + 10) stillAnimating = true;
        });

        if (stillAnimating) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}

// Download survey results as JSON
function downloadSurveyJSON() {
    const roleData = competencies[surveyState.role];
    const ratingLabels = ['', 'Learning', 'Developing', 'Proficient', 'Advanced', 'Expert'];

    const sections = roleData.questions.map(question => {
        const subCompetencies = (question.subCompetencies || []).map(subComp => {
            const raw = surveyState.responses[subComp.id];
            const isNarrative = !!subComp.promptType;
            return {
                id: subComp.id,
                text: subComp.shortText || subComp.fullText,
                type: isNarrative ? (subComp.promptType === '360' ? 'manager_360' : 'evidence') : 'rating',
                ...(isNarrative
                    ? { response: raw || null }
                    : { rating: raw || null, ratingLabel: raw ? ratingLabels[raw] : null }
                )
            };
        });

        return {
            competency: question.competency || question.title,
            subCompetencies
        };
    });

    const numericScores = Object.values(surveyState.responses).filter(v => typeof v === 'number');
    const averageRating = numericScores.length > 0
        ? parseFloat((numericScores.reduce((sum, v) => sum + v, 0) / numericScores.length).toFixed(2))
        : null;

    const payload = {
        survey: 'UX Competency Self-Assessment 2026',
        name: surveyState.name,
        role: surveyState.role,
        roleLabel: roleData.role,
        completedAt: surveyState.completionTime,
        averageRating,
        sections
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeName = (surveyState.name || 'results').toLowerCase().replace(/\s+/g, '-');
    link.download = `ux-competency-${safeName}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// Data Management
async function saveSurveyData() {
    try {
        const surveyData = {
            designer_name: surveyState.name,
            role: surveyState.role,
            responses: surveyState.responses,
            goals: {},
            start_time: surveyState.startTime,
            completion_time: surveyState.completionTime
        };

        const { data: existing, error: fetchError } = await supabaseClient
            .from('survey_responses')
            .select('id')
            .eq('designer_name', surveyState.name)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        if (existing) {
            const { error: updateError } = await supabaseClient
                .from('survey_responses')
                .update(surveyData)
                .eq('id', existing.id);
            if (updateError) throw updateError;
        } else {
            const { error: insertError } = await supabaseClient
                .from('survey_responses')
                .insert([surveyData]);
            if (insertError) throw insertError;
        }

        console.log('Survey data saved successfully to Supabase');
    } catch (error) {
        console.error('Error saving survey data:', error);
    }
}

async function loadSurveyData() {
    try {
        const { data, error } = await supabaseClient
            .from('survey_responses')
            .select('*')
            .order('completion_time', { ascending: false });

        if (error) throw error;

        return data.map(record => ({
            name: record.designer_name,
            role: record.role,
            responses: record.responses,
            goals: record.goals || {},
            startTime: record.start_time,
            completionTime: record.completion_time
        }));
    } catch (error) {
        console.error('Error loading survey data:', error);
        return [];
    }
}
