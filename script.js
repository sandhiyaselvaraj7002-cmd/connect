// Add your titles and captions here
const storiesData = [
    { title: "special", caption: "god is always with us. ❤️" },
    { title: "Memories", caption: "i enjoy every second with you" },
    { title: "journey", caption: "காலம் முடியலாம் நம் காதல் முடியுமா ❤️" }
];
let currentIndex = 0;
let progressInterval;
let currentVideo = null;

// Initialize Progress Bar segments in HTML
const progressContainer = document.getElementById('progress-bars');
storiesData.forEach((_, i) => {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.innerHTML = `<div class="progress-inner" id="bar-${i}"></div>`;
    progressContainer.appendChild(bar);
});

function startApp() {
    document.getElementById('start-screen').classList.add('hidden');
    loadStory(0);
}

function loadStory(index) {
    // If we reach the end, show final screen
    if (index >= storiesData.length) {
        showFinalWish();
        return;
    }

    // Stop and hide the previous video
    if (currentVideo) {
        currentVideo.pause();
        currentVideo.currentTime = 0;
        currentVideo.classList.add('hidden');
    }

    currentIndex = index;
    const data = storiesData[index];

    // Show the new manual video
    currentVideo = document.getElementById(`vid-${index}`);
    currentVideo.classList.remove('hidden');
    
    // Update Text
    document.getElementById('story-title').innerText = data.title;
    document.getElementById('story-caption').innerText = data.caption;

    // Reset Bars Visuals
    document.querySelectorAll('.progress-inner').forEach((bar, i) => {
        bar.style.width = i < index ? "100%" : "0%";
    });

    currentVideo.play();

    // Sync Progress Bar
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        if (!currentVideo.paused && currentVideo.duration) {
            let percentage = (currentVideo.currentTime / currentVideo.duration) * 100;
            document.getElementById(`bar-${index}`).style.width = percentage + "%";
        }
    }, 50);

    // Auto-advance
    currentVideo.onended = () => {
        nextStory();
    };
}

function nextStory() {
    loadStory(currentIndex + 1);
}

function prevStory() {
    if (currentIndex > 0) {
        loadStory(currentIndex - 1);
    } else {
        loadStory(0); // Restart first video
    }
}

function showFinalWish() {
    clearInterval(progressInterval);
    document.getElementById('final-wish').classList.remove('hidden');
}

function restartStories() {
    document.getElementById('final-wish').classList.add('hidden');
    loadStory(0);
}