// Application State
let surveyState = {
    role: null,
    name: null,
    currentQuestionIndex: 0,
    responses: {},
    goals: {},
    startTime: null,
    completionTime: null
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadSurveyData();

    // Enable Enter key on name input
    const nameInput = document.getElementById('nameInput');
    if (nameInput) {
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitName();
            }
        });
    }

    // Enable Enter key on password input
    const adminPassword = document.getElementById('adminPassword');
    if (adminPassword) {
        adminPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                attemptSignIn();
            }
        });
    }
});

// Theme Management - Updated for Tailwind
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0);

    // Hide top-right controls on dashboard
    const topRightControls = document.querySelector('.fixed.top-4.right-4');
    if (topRightControls) {
        if (screenId === 'dashboardScreen') {
            topRightControls.style.display = 'none';
        } else {
            topRightControls.style.display = 'flex';
        }
    }

    // Hide/show home icon based on screen
    const topLeftControls = document.querySelector('.fixed.top-4.left-4');
    if (topLeftControls) {
        if (screenId === 'welcomeScreen' || screenId === 'dashboardScreen') {
            topLeftControls.style.display = 'none';
        } else {
            topLeftControls.style.display = 'block';
        }
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

// Authentication Functions
function showSignIn() {
    // Clear previous inputs and errors
    document.getElementById('adminUsername').value = '';
    document.getElementById('adminPassword').value = '';
    document.getElementById('signInError').classList.add('hidden');
    showScreen('signInScreen');
}

async function attemptSignIn() {
    const email = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value.trim();
    const errorDiv = document.getElementById('signInError');

    if (!email || !password) {
        errorDiv.textContent = 'Please enter both email and password.';
        errorDiv.classList.remove('hidden');
        return;
    }

    console.log('=== SIGN IN ATTEMPT ===');
    console.log(`Email entered: "${email}"`);

    try {
        // Sign in with Supabase
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.log('✗ Authentication failed:', error.message);
            errorDiv.textContent = 'Invalid email or password. Please try again.';
            errorDiv.classList.remove('hidden');
            document.getElementById('adminPassword').value = '';
            return;
        }

        console.log('✓ Authentication successful!');

        // Clear form
        document.getElementById('adminUsername').value = '';
        document.getElementById('adminPassword').value = '';
        errorDiv.classList.add('hidden');

        console.log('Navigating to dashboard...');

        // Go to dashboard
        viewDashboard();
    } catch (err) {
        console.error('Sign in error:', err);
        errorDiv.textContent = 'An error occurred. Please try again.';
        errorDiv.classList.remove('hidden');
    }
}

async function checkAuthentication() {
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        return session !== null;
    } catch (error) {
        console.error('Auth check error:', error);
        return false;
    }
}

async function signOut() {
    try {
        await supabaseClient.auth.signOut();
        alert('You have been signed out successfully.');
        returnHome();
    } catch (error) {
        console.error('Sign out error:', error);
        alert('Error signing out. Please try again.');
    }
}

// Survey Logic
function renderQuestion() {
    const questions = competencies[surveyState.role].questions;
    const currentQuestion = questions[surveyState.currentQuestionIndex];
    const isLastQuestion = surveyState.currentQuestionIndex === questions.length - 1;

    // Update progress bar based on answered questions
    const answeredCount = Object.keys(surveyState.responses).length;
    const progress = (answeredCount / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;

    // Update question content - remove text in parentheses
    const cleanTitle = currentQuestion.title.replace(/\s*\([^)]*\)\s*/g, '').trim();
    document.getElementById('questionTitle').textContent = cleanTitle;

    // Build subtitle with description and sub-competencies or bullets
    let subtitleHTML = `<p class="text-sm" style="margin-bottom: 64px;">${currentQuestion.description}</p>`;

    // Check if using new subCompetencies structure or old bullets structure
    if (currentQuestion.subCompetencies && currentQuestion.subCompetencies.length > 0) {
        // New detailed sub-competency format with individual ratings
        subtitleHTML += '<div>';
        currentQuestion.subCompetencies.forEach((subComp, index) => {
            const subCompNumber = `${surveyState.currentQuestionIndex + 1}.${index + 1}`;
            const ratingValue = surveyState.responses[subComp.id] || 0;

            subtitleHTML += `
                <div class="mb-12">
                    <div class="mb-8">
                        <p class="text-sm font-semibold text-primary mb-4">${subCompNumber}</p>
                        <p class="text-2xl leading-relaxed text-white">${subComp.fullText}</p>
                    </div>

                    <!-- Rating buttons for this sub-competency -->
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        ${[1, 2, 3, 4, 5].map(rating => {
                            const labels = ['Developing', 'Emerging', 'Proficient', 'Advanced', 'Expert'];
                            const descriptions = [
                                "I'm learning this skill",
                                "I can do this with guidance",
                                "I can do this independently",
                                "I can mentor others on this",
                                "I'm defining best practices for this"
                            ];
                            return `
                            <button onclick="selectSubCompRating('${subComp.id}', ${rating})"
                                    data-subcomp-id="${subComp.id}"
                                    data-rating="${rating}"
                                    class="sub-rating-btn flex flex-col items-center justify-center gap-1 p-6 rounded-lg transition-all ${ratingValue === rating ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}">
                                <span class="text-4xl font-bold text-white" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">${rating}</span>
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
        // Old simple bullet format (backward compatibility)
        subtitleHTML += '<ul class="list-disc ml-5 mb-4 space-y-2">';
        currentQuestion.bullets.forEach(bullet => {
            subtitleHTML += `<li>${bullet}</li>`;
        });
        subtitleHTML += '</ul>';
    }

    document.getElementById('questionSubtitle').innerHTML = subtitleHTML;

    // Update question counter
    document.getElementById('questionCounter').textContent =
        `Question ${surveyState.currentQuestionIndex + 1} of ${questions.length}`;

    // Restore previous selection if exists
    const previousResponse = surveyState.responses[currentQuestion.id];
    document.querySelectorAll('.rating-option').forEach(option => {
        option.classList.remove('selected', 'border-primary', 'bg-primary', 'text-primary-foreground', 'scale-105');
        option.classList.add('border-input', 'bg-card');

        if (previousResponse && parseInt(option.dataset.value) === previousResponse) {
            option.classList.add('selected', 'border-primary', 'bg-primary', 'text-primary-foreground', 'scale-105');
            option.classList.remove('border-input', 'bg-card');
        }
    });

    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    if (surveyState.currentQuestionIndex === 0) {
        prevBtn.style.visibility = 'hidden';
    } else {
        prevBtn.style.visibility = 'visible';
    }

    // Show/hide finish button based on last question
    const finishBtn = document.getElementById('finishBtn');
    if (isLastQuestion && previousResponse) {
        finishBtn.style.display = 'inline-flex';
    } else {
        finishBtn.style.display = 'none';
    }
}

// Handle sub-competency rating selection
function selectSubCompRating(subCompId, value) {
    // Save the rating for this specific sub-competency
    surveyState.responses[subCompId] = value;

    console.log(`Sub-competency rating: ${value} for ${subCompId}`);

    // Update button states for this sub-competency
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

    // Update progress bar
    updateProgressBar();

    // Check if all sub-competencies for current question are rated
    const questions = competencies[surveyState.role].questions;
    const currentQuestion = questions[surveyState.currentQuestionIndex];
    if (currentQuestion.subCompetencies) {
        const allRated = currentQuestion.subCompetencies.every(sub => surveyState.responses[sub.id]);
        const isLastQuestion = surveyState.currentQuestionIndex === questions.length - 1;

        if (allRated && isLastQuestion) {
            // Show finish button
            const finishBtn = document.getElementById('finishBtn');
            finishBtn.style.display = 'inline-flex';
        } else if (allRated && !isLastQuestion) {
            // Auto-advance to next question after a brief delay
            setTimeout(() => {
                nextQuestion();
            }, 500);
        }
    }
}

// Helper function to update progress bar
function updateProgressBar() {
    const questions = competencies[surveyState.role].questions;
    let totalSubCompetencies = 0;
    let ratedSubCompetencies = 0;

    questions.forEach(question => {
        if (question.subCompetencies) {
            totalSubCompetencies += question.subCompetencies.length;
            question.subCompetencies.forEach(subComp => {
                if (surveyState.responses[subComp.id]) {
                    ratedSubCompetencies++;
                }
            });
        } else {
            // For old format questions without sub-competencies
            totalSubCompetencies++;
            if (surveyState.responses[question.id]) {
                ratedSubCompetencies++;
            }
        }
    });

    const progress = (ratedSubCompetencies / totalSubCompetencies) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

function selectRating(value) {
    const questions = competencies[surveyState.role].questions;
    const currentQuestion = questions[surveyState.currentQuestionIndex];
    const isLastQuestion = surveyState.currentQuestionIndex === questions.length - 1;

    // Save response
    surveyState.responses[currentQuestion.id] = value;

    // Visual feedback - Update for Tailwind classes
    document.querySelectorAll('.rating-option').forEach(option => {
        option.classList.remove('selected', 'border-primary', 'bg-primary', 'text-primary-foreground', 'scale-105');
        option.classList.add('border-input', 'bg-card');

        if (parseInt(option.dataset.value) === value) {
            option.classList.add('selected', 'border-primary', 'bg-primary', 'text-primary-foreground', 'scale-105');
            option.classList.remove('border-input', 'bg-card');
        }
    });

    // If last question, show finish button instead of auto-advancing
    if (isLastQuestion) {
        const finishBtn = document.getElementById('finishBtn');
        finishBtn.style.display = 'inline-flex';
    } else {
        // Auto-advance after selection for non-last questions
        setTimeout(() => {
            nextQuestion();
        }, 500);
    }
}

function previousQuestion() {
    if (surveyState.currentQuestionIndex > 0) {
        surveyState.currentQuestionIndex--;
        renderQuestion();
    }
}

function nextQuestion() {
    const questions = competencies[surveyState.role].questions;

    if (surveyState.currentQuestionIndex < questions.length - 1) {
        surveyState.currentQuestionIndex++;
        renderQuestion();
    } else {
        completeSurvey();
    }
}

function completeSurvey() {
    surveyState.completionTime = new Date().toISOString();
    saveSurveyData();
    showScreen('completionScreen');
    // Trigger confetti animation
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

            // Add some gravity
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

    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new ConfettiPiece());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let stillAnimating = false;

        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();

            // Check if piece is still visible
            if (piece.y < canvas.height + 10) {
                stillAnimating = true;
            }
        });

        if (stillAnimating) {
            requestAnimationFrame(animate);
        } else {
            // Clean up canvas after animation
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}

// Goal Setting Functions
function showGoalSetting() {
    // Load existing goals if they exist
    const surveyResults = loadSurveyData();
    const existingResponse = surveyResults.find(r => r.name === surveyState.name);

    if (existingResponse && existingResponse.goals) {
        document.getElementById('goal1').value = existingResponse.goals.goal1 || '';
        document.getElementById('goal1Description').value = existingResponse.goals.goal1Description || '';
        document.getElementById('goal2').value = existingResponse.goals.goal2 || '';
        document.getElementById('goal2Description').value = existingResponse.goals.goal2Description || '';
        document.getElementById('goal3').value = existingResponse.goals.goal3 || '';
        document.getElementById('goal3Description').value = existingResponse.goals.goal3Description || '';
    }

    showScreen('goalSettingScreen');
}

function saveGoals() {
    const goal1 = document.getElementById('goal1').value.trim();
    const goal1Description = document.getElementById('goal1Description').value.trim();
    const goal2 = document.getElementById('goal2').value.trim();
    const goal2Description = document.getElementById('goal2Description').value.trim();
    const goal3 = document.getElementById('goal3').value.trim();
    const goal3Description = document.getElementById('goal3Description').value.trim();

    if (!goal1) {
        alert('Please enter at least Goal 1');
        return;
    }

    surveyState.goals = {
        goal1,
        goal1Description,
        goal2,
        goal2Description,
        goal3,
        goal3Description
    };

    saveSurveyData();
    alert('Goals saved successfully! 🎉');
    returnHome();
}

function skipGoals() {
    returnHome();
}

// Data Management
async function saveSurveyData() {
    try {
        const surveyData = {
            designer_name: surveyState.name,
            role: surveyState.role,
            responses: surveyState.responses,
            goals: surveyState.goals || {},
            start_time: surveyState.startTime,
            completion_time: surveyState.completionTime
        };

        // Check if survey already exists for this designer
        const { data: existing, error: fetchError } = await supabaseClient
            .from('survey_responses')
            .select('id')
            .eq('designer_name', surveyState.name)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            // PGRST116 is "no rows returned" which is fine
            throw fetchError;
        }

        if (existing) {
            // Update existing survey
            const { error: updateError } = await supabaseClient
                .from('survey_responses')
                .update(surveyData)
                .eq('id', existing.id);

            if (updateError) throw updateError;
        } else {
            // Insert new survey
            const { error: insertError } = await supabaseClient
                .from('survey_responses')
                .insert([surveyData]);

            if (insertError) throw insertError;
        }

        console.log('Survey data saved successfully to Supabase');
    } catch (error) {
        console.error('Error saving survey data:', error);
        alert('Error saving survey data. Please try again.');
    }
}

async function loadSurveyData() {
    try {
        const { data, error } = await supabaseClient
            .from('survey_responses')
            .select('*')
            .order('completion_time', { ascending: false });

        if (error) throw error;

        // Transform data to match the old localStorage format
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

async function deleteSurvey(designerName) {
    // Confirm deletion
    if (!confirm(`Are you sure you want to delete the survey for ${designerName}? This action cannot be undone.`)) {
        return;
    }

    try {
        // Delete from Supabase
        const { error } = await supabaseClient
            .from('survey_responses')
            .delete()
            .eq('designer_name', designerName);

        if (error) throw error;

        // Reload dashboard
        const allResults = await loadSurveyData();
        renderDashboard(allResults);

        // Show success message
        alert(`Survey for ${designerName} has been deleted successfully.`);
    } catch (error) {
        console.error('Error deleting survey:', error);
        alert('Error deleting survey. Please try again.');
    }
}

// Dashboard Functions
async function viewDashboard() {
    // Check authentication first
    const isAuthenticated = await checkAuthentication();
    if (!isAuthenticated) {
        alert('Please sign in to view the dashboard.');
        showSignIn();
        return;
    }

    const surveyResults = await loadSurveyData();

    if (surveyResults.length === 0) {
        alert('No survey responses yet. Please complete a survey first or load demo data.');
        // Still show dashboard even if empty, so they can load demo data
    }

    renderDashboard(surveyResults);
    showScreen('dashboardScreen');
}

function viewResults() {
    viewDashboard();
}

function renderDashboard(surveyResults) {
    // Populate designer filter
    const filterSelect = document.getElementById('designerFilter');
    filterSelect.innerHTML = '<option value="all">All Designers</option>';
    surveyResults.forEach(result => {
        const option = document.createElement('option');
        option.value = result.name;
        option.textContent = `${result.name} (${competencies[result.role].role})`;
        filterSelect.appendChild(option);
    });

    // Render summary
    renderDashboardSummary(surveyResults);

    // Render competency cards
    renderCompetencyCards(surveyResults);

    // Render detailed results
    renderDetailedResults(surveyResults);
}

async function filterDashboard() {
    const selectedDesigner = document.getElementById('designerFilter').value;
    const allResults = await loadSurveyData();

    let filteredResults = allResults;
    if (selectedDesigner !== 'all') {
        filteredResults = allResults.filter(r => r.name === selectedDesigner);
    }

    renderDashboardSummary(filteredResults);
    renderCompetencyCards(filteredResults);
    renderDetailedResults(filteredResults);
}

function renderDashboardSummary(surveyResults) {
    const summaryDiv = document.getElementById('dashboardSummary');

    if (surveyResults.length === 0) {
        summaryDiv.innerHTML = '<p class="text-center text-muted-foreground py-10">No data to display</p>';
        return;
    }

    // Calculate statistics
    let totalResponses = 0;
    let totalScore = 0;

    surveyResults.forEach(result => {
        const responses = Object.values(result.responses);
        totalResponses += responses.length;
        totalScore += responses.reduce((sum, val) => sum + val, 0);
    });

    const avgScore = totalResponses > 0 ? (totalScore / totalResponses).toFixed(2) : 0;

    summaryDiv.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Summary</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
                <div class="text-4xl font-bold text-primary">${surveyResults.length}</div>
                <div class="text-sm text-muted-foreground mt-2">Designers Surveyed</div>
            </div>
            <div class="text-center">
                <div class="text-4xl font-bold text-primary">${totalResponses}</div>
                <div class="text-sm text-muted-foreground mt-2">Total Responses</div>
            </div>
            <div class="text-center">
                <div class="text-4xl font-bold text-primary">${avgScore}</div>
                <div class="text-sm text-muted-foreground mt-2">Average Rating</div>
            </div>
        </div>
    `;
}

function renderCompetencyCards(surveyResults) {
    const improve = [];
    const growing = [];
    const excelling = [];

    surveyResults.forEach(result => {
        const questions = competencies[result.role].questions;

        questions.forEach(question => {
            const score = result.responses[question.id];
            if (score) {
                const item = {
                    designer: result.name,
                    competency: question.competency,
                    score: score
                };

                if (score <= 2) {
                    improve.push(item);
                } else if (score === 3) {
                    growing.push(item);
                } else {
                    excelling.push(item);
                }
            }
        });
    });

    // Render Areas to Improve
    const improveDiv = document.getElementById('areasToImprove');
    if (improve.length === 0) {
        improveDiv.innerHTML = '<p class="text-center text-muted-foreground py-10">No areas identified</p>';
    } else {
        improveDiv.innerHTML = improve.map(item => `
            <div class="p-3 rounded-lg mb-3 border-l-4 border-destructive bg-destructive/10">
                <div class="font-semibold text-sm">${item.competency}</div>
                <div class="text-xs text-muted-foreground">${item.designer} - Rating: ${item.score}</div>
            </div>
        `).join('');
    }

    // Render Areas of Growth
    const growingDiv = document.getElementById('areasGrowing');
    if (growing.length === 0) {
        growingDiv.innerHTML = '<p class="text-center text-muted-foreground py-10">No areas identified</p>';
    } else {
        growingDiv.innerHTML = growing.map(item => `
            <div class="p-3 rounded-lg mb-3 border-l-4 border-blue-500 bg-blue-500/10">
                <div class="font-semibold text-sm">${item.competency}</div>
                <div class="text-xs text-muted-foreground">${item.designer} - Rating: ${item.score}</div>
            </div>
        `).join('');
    }

    // Render Areas Excelling
    const excellingDiv = document.getElementById('areasExcelling');
    if (excelling.length === 0) {
        excellingDiv.innerHTML = '<p class="text-center text-muted-foreground py-10">No areas identified</p>';
    } else {
        excellingDiv.innerHTML = excelling.map(item => `
            <div class="p-3 rounded-lg mb-3 border-l-4 border-green-500 bg-green-500/10">
                <div class="font-semibold text-sm">${item.competency}</div>
                <div class="text-xs text-muted-foreground">${item.designer} - Rating: ${item.score}</div>
            </div>
        `).join('');
    }
}

function renderDetailedResults(surveyResults) {
    const detailsDiv = document.getElementById('dashboardDetails');

    if (surveyResults.length === 0) {
        detailsDiv.innerHTML = '<p class="text-center text-muted-foreground py-10">No data to display</p>';
        return;
    }

    let html = '<h2 class="text-2xl font-bold mb-6">Detailed Results by Designer</h2>';

    surveyResults.forEach(result => {
        const questions = competencies[result.role].questions;
        const roleName = competencies[result.role].role;

        // Calculate average for this designer
        const scores = Object.values(result.responses);
        const avgScore = scores.length > 0
            ? (scores.reduce((sum, val) => sum + val, 0) / scores.length).toFixed(2)
            : 0;

        html += `
            <div class="mb-8">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h3 class="text-xl font-bold">${result.name} - ${roleName}</h3>
                        <p class="text-muted-foreground">
                            Average Rating: <strong class="text-primary">${avgScore}</strong> |
                            Completed: ${new Date(result.completionTime).toLocaleDateString()}
                        </p>
                    </div>
                    <button onclick="deleteSurvey('${result.name}')"
                            class="inline-flex items-center gap-1 rounded-md text-sm font-medium transition-colors border border-destructive bg-destructive/10 text-destructive hover:bg-destructive hover:text-white h-9 px-3">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                        Delete
                    </button>
                </div>
                <div class="mb-4">
        `;

        questions.forEach(question => {
            const score = result.responses[question.id];
            const rating = ratingScale.find(r => r.value === score);

            if (score) {
                const badgeColors = {
                    1: 'bg-red-500/20 text-red-700 dark:text-red-400',
                    2: 'bg-orange-500/20 text-orange-700 dark:text-orange-400',
                    3: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
                    4: 'bg-purple-500/20 text-purple-700 dark:text-purple-400',
                    5: 'bg-green-500/20 text-green-700 dark:text-green-400'
                };

                html += `
                    <div class="p-4 bg-muted rounded-lg mb-3">
                        <div class="flex justify-between items-center mb-2">
                            <strong class="text-sm">${question.competency}</strong>
                            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold ${badgeColors[score]}">
                                ${score} - ${rating.label}
                            </span>
                        </div>
                        <p class="text-xs text-muted-foreground mt-1">
                            ${rating.description}
                        </p>
                    </div>
                `;
            }
        });

        html += '</div></div>';
    });

    detailsDiv.innerHTML = html;

    // Render goals section
    renderGoalsSection(surveyResults);
}

function renderGoalsSection(surveyResults) {
    const goalsDiv = document.getElementById('dashboardGoals');

    // Hide goals section - not displayed on dashboard
    if (goalsDiv) {
        goalsDiv.innerHTML = '';
    }
    return;

    // Code below is commented out but preserved for future use
    /*
    if (surveyResults.length === 0) {
        goalsDiv.innerHTML = '';
        return;
    }

    let html = '<h2 class="text-2xl font-bold mb-6">2026 Goals by Designer</h2>';

    surveyResults.forEach(result => {
        if (result.goals && Object.keys(result.goals).length > 0) {
            const goals = result.goals;
            const roleName = competencies[result.role].role;

            html += `
                <div class="bg-card border border-border rounded-lg p-8 mb-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold">${result.name} - ${roleName}</h3>
                        <button onclick="deleteSurvey('${result.name}')"
                                class="inline-flex items-center gap-1 rounded-md text-sm font-medium transition-colors border border-destructive bg-destructive/10 text-destructive hover:bg-destructive hover:text-white h-9 px-3">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                            Delete
                        </button>
                    </div>
            `;

            if (goals.goal1) {
                html += `
                    <div class="p-5 bg-muted rounded-lg mb-4 border-l-4 border-primary">
                        <div class="font-semibold mb-2">Goal 1: ${goals.goal1}</div>
                        ${goals.goal1Description ? `<div class="text-sm text-muted-foreground leading-relaxed">${goals.goal1Description}</div>` : ''}
                    </div>
                `;
            }

            if (goals.goal2) {
                html += `
                    <div class="p-5 bg-muted rounded-lg mb-4 border-l-4 border-primary">
                        <div class="font-semibold mb-2">Goal 2: ${goals.goal2}</div>
                        ${goals.goal2Description ? `<div class="text-sm text-muted-foreground leading-relaxed">${goals.goal2Description}</div>` : ''}
                    </div>
                `;
            }

            if (goals.goal3) {
                html += `
                    <div class="p-5 bg-muted rounded-lg mb-4 border-l-4 border-primary">
                        <div class="font-semibold mb-2">Goal 3: ${goals.goal3}</div>
                        ${goals.goal3Description ? `<div class="text-sm text-muted-foreground leading-relaxed">${goals.goal3Description}</div>` : ''}
                    </div>
                `;
            }

            html += '</div>';
        }
    });

    goalsDiv.innerHTML = html;
    */
}

// Export Functions
async function exportToCSV() {
    const surveyResults = await loadSurveyData();

    if (surveyResults.length === 0) {
        alert('No survey data to export');
        return;
    }

    // Build CSV content
    let csv = 'Name,Role,Competency,Rating,Completed Date\n';

    surveyResults.forEach(result => {
        const questions = competencies[result.role].questions;
        const roleName = competencies[result.role].role;
        const completedDate = new Date(result.completionTime).toLocaleDateString();

        questions.forEach(question => {
            const score = result.responses[question.id];
            if (score) {
                const rating = ratingScale.find(r => r.value === score);
                csv += `"${result.name}","${roleName}","${question.competency}",${score} - ${rating.label},"${completedDate}"\n`;
            }
        });
    });

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ux-survey-results-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
}

async function exportToPDF() {
    const surveyResults = await loadSurveyData();

    if (surveyResults.length === 0) {
        alert('No survey data to export');
        return;
    }

    // Create printable HTML
    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>UX Competency Survey Results - ${new Date().toLocaleDateString()}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
                h1 { color: #3b5998; border-bottom: 3px solid #3b5998; padding-bottom: 10px; }
                h2 { color: #333; margin-top: 30px; border-bottom: 2px solid #ccc; padding-bottom: 8px; }
                h3 { color: #555; margin-top: 20px; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
                th { background-color: #3b5998; color: white; }
                tr:nth-child(even) { background-color: #f9f9f9; }
                .rating-1 { color: #ef4444; font-weight: bold; }
                .rating-2 { color: #f59e0b; font-weight: bold; }
                .rating-3 { color: #6366f1; font-weight: bold; }
                .rating-4 { color: #8b5cf6; font-weight: bold; }
                .rating-5 { color: #10b981; font-weight: bold; }
                .goal { background: #f5f5f5; padding: 15px; margin: 10px 0; border-left: 4px solid #3b5998; }
                .goal-title { font-weight: bold; margin-bottom: 5px; }
                .summary-stats { display: flex; gap: 20px; margin: 20px 0; }
                .stat-box { background: #f0f0f0; padding: 15px; border-radius: 8px; flex: 1; text-align: center; }
                .stat-value { font-size: 32px; font-weight: bold; color: #3b5998; }
                .stat-label { font-size: 14px; color: #666; }
                @media print {
                    body { padding: 20px; }
                    .no-print { display: none; }
                    h2 { page-break-before: always; }
                }
            </style>
        </head>
        <body>
            <h1>UX Competency Survey Results 2026</h1>
            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>FamilySearch UX Organization</strong></p>

            <div class="summary-stats">
                <div class="stat-box">
                    <div class="stat-value">${surveyResults.length}</div>
                    <div class="stat-label">Designers Surveyed</div>
                </div>
            </div>
    `;

    surveyResults.forEach(result => {
        const questions = competencies[result.role].questions;
        const roleName = competencies[result.role].role;
        const completedDate = new Date(result.completionTime).toLocaleString();

        // Calculate average
        const scores = Object.values(result.responses);
        const avgScore = scores.length > 0
            ? (scores.reduce((sum, val) => sum + val, 0) / scores.length).toFixed(2)
            : 0;

        html += `
            <h2>${result.name} - ${roleName}</h2>
            <p><strong>Completed:</strong> ${completedDate}</p>
            <p><strong>Average Rating:</strong> ${avgScore}</p>

            <table>
                <thead>
                    <tr>
                        <th>Competency</th>
                        <th>Rating</th>
                        <th>Level</th>
                    </tr>
                </thead>
                <tbody>
        `;

        questions.forEach(question => {
            const score = result.responses[question.id];
            if (score) {
                const rating = ratingScale.find(r => r.value === score);
                html += `
                    <tr>
                        <td>${question.competency}</td>
                        <td class="rating-${score}">${score}</td>
                        <td>${rating.label} - ${rating.description}</td>
                    </tr>
                `;
            }
        });

        html += '</tbody></table>';

        // Goals section hidden - not included in PDF export
    });

    html += `
            <script>
                window.onload = function() {
                    window.print();
                };
            </script>
        </body>
        </html>
    `;

    // Open in new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();
}

// Demo Data
async function loadDemoData() {
    if (!confirm('This will load sample survey data. Any existing data will be preserved. Continue?')) {
        return;
    }

    const demoData = [
        {
            designer_name: "Sarah Chen",
            role: "ux4",
            responses: {
                "ux4_product_strategy": 5,
                "ux4_craft_quality": 4,
                "ux4_communication": 5,
                "ux4_action_impact": 4,
                "ux4_leveling_up": 5,
                "ux4_independence": 5,
                "ux4_skill_development": 4
            },
            goals: {
                goal1: "Establish design system governance framework",
                goal1Description: "Create and implement a governance model for Zion UI that ensures consistency while empowering teams. Success measured by adoption rate across product lines.",
                goal2: "Mentor 3 emerging design leaders",
                goal2Description: "Develop leadership capabilities in UX 2 and UX 3 designers through 1:1 coaching and stretch project assignments.",
                goal3: "Drive AI integration strategy for UX org",
                goal3Description: "Define how we leverage AI tools to enhance designer productivity while maintaining quality standards."
            },
            start_time: "2026-01-15T09:00:00.000Z",
            completion_time: "2026-01-15T09:25:00.000Z"
        },
        {
            designer_name: "Marcus Rodriguez",
            role: "ux4",
            responses: {
                "ux4_product_strategy": 4,
                "ux4_craft_quality": 5,
                "ux4_communication": 4,
                "ux4_action_impact": 5,
                "ux4_leveling_up": 4,
                "ux4_independence": 4,
                "ux4_skill_development": 5
            },
            goals: {
                goal1: "Launch continuous discovery training program",
                goal1Description: "Develop and deliver organization-wide training on Teresa Torres' continuous discovery practices. Track adoption through weekly touchpoint metrics.",
                goal2: "Improve cross-product consistency",
                goal2Description: "Audit all product lines for design consistency and create remediation roadmap. Success measured by user confusion reduction.",
                goal3: "Establish outcome-based metrics framework",
                goal3Description: "Work with leadership to shift from output to outcome metrics. Define standard KPIs for all design initiatives."
            },
            start_time: "2026-01-16T10:30:00.000Z",
            completion_time: "2026-01-16T10:52:00.000Z"
        },
        {
            designer_name: "Aisha Patel",
            role: "ux2",
            responses: {
                "ux2_product_strategy": 3,
                "ux2_craft_quality": 4,
                "ux2_communication": 3,
                "ux2_action_impact": 3,
                "ux2_leveling_up": 2,
                "ux2_independence": 3,
                "ux2_skill_development": 3
            },
            goals: {
                goal1: "Lead 10 user research sessions independently",
                goal1Description: "Build confidence in moderating user interviews and usability tests. Success measured by completing sessions without supervision and delivering actionable insights.",
                goal2: "Contribute 3 components to Zion UI",
                goal2Description: "Design and validate new components for the design system. Focus on accessibility and mobile responsiveness.",
                goal3: "Present at 5 design critiques",
                goal3Description: "Build presentation skills and comfort receiving feedback. Present work-in-progress designs and incorporate feedback iterations."
            },
            start_time: "2026-01-18T14:15:00.000Z",
            completion_time: "2026-01-18T14:38:00.000Z"
        }
    ];

    try {
        // Insert demo data into Supabase
        for (const demo of demoData) {
            // Check if already exists
            const { data: existing } = await supabaseClient
                .from('survey_responses')
                .select('id')
                .eq('designer_name', demo.designer_name)
                .single();

            if (existing) {
                // Update existing
                await supabaseClient
                    .from('survey_responses')
                    .update(demo)
                    .eq('id', existing.id);
            } else {
                // Insert new
                await supabaseClient
                    .from('survey_responses')
                    .insert([demo]);
            }
        }

        alert('Demo data loaded successfully!');
        viewDashboard();
    } catch (error) {
        console.error('Error loading demo data:', error);
        alert('Error loading demo data. Please try again.');
    }
}

// Export/Download Functions (Optional Enhancement)
async function exportResults() {
    const surveyResults = await loadSurveyData();
    const dataStr = JSON.stringify(surveyResults, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ux-survey-results-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Clear all data (for testing)
async function clearAllData() {
    if (confirm('Are you sure you want to delete all survey data? This cannot be undone.')) {
        try {
            const { error } = await supabaseClient
                .from('survey_responses')
                .delete()
                .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records

            if (error) throw error;

            alert('All survey data has been cleared.');
            returnHome();
        } catch (error) {
            console.error('Error clearing data:', error);
            alert('Error clearing data. Please try again.');
        }
    }
}
