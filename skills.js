function animateSkillBars() {
    const desktopBars = document.querySelectorAll('.web:not(.mobile)');
    const mobileBars = document.querySelectorAll('.web.mobile');
    const percentages = document.querySelectorAll('.web_percentage');
    
    const barsToAnimate = [];
    let animationsCompleted = 0;
    const totalAnimations = desktopBars.length + mobileBars.length;

    function startBlinking() {
        if (barsToAnimate.length === 0) return;
        
        let visible = true;
        setInterval(() => {
            barsToAnimate.forEach(({bar, loadedBlocks, totalBlocks}) => {
                if (visible) {
                    bar.textContent = '▓'.repeat(loadedBlocks - 1) + '░' + '░'.repeat(totalBlocks - loadedBlocks);
                } else {
                    bar.textContent = '▓'.repeat(loadedBlocks) + '░'.repeat(totalBlocks - loadedBlocks);
                }
            });
            visible = !visible;
        }, 400);
    }

    // Check if all animations are complete
    function checkAnimComplete() {
        animationsCompleted++;
        if (animationsCompleted === totalAnimations) {
            startBlinking();
        }
    }
    
    // Desktop bars animation
    desktopBars.forEach((bar, idx) => {
        const percentage = parseInt(bar.getAttribute('data-percentage'), 10) || 0;
        const totalBlocks = 50;
        const loadedBlocks = Math.round((percentage * totalBlocks) / 100);
        
        if (loadedBlocks > 0) {
            barsToAnimate.push({bar, loadedBlocks, totalBlocks});
        }
        
        let current = 0;
        function animateBar() {
            if (current <= loadedBlocks) {
                bar.textContent = '▓'.repeat(current) + '░'.repeat(totalBlocks - current);
                // Update percentage
                if (percentages[idx]) {
                    let percentNow = Math.round((current / loadedBlocks) * percentage);
                    percentages[idx].textContent = percentNow + '%';
                }
                const t = loadedBlocks === 0 ? 1 : current / loadedBlocks;
                const duration = 10 + 60 * (1 - Math.cos(Math.PI * t)) / 2;
                current++;
                setTimeout(animateBar, duration);
            } else {
                bar.textContent = '▓'.repeat(loadedBlocks) + '░'.repeat(totalBlocks - loadedBlocks);
                if (percentages[idx]) {
                    percentages[idx].textContent = percentage + '%';
                }
                checkAnimComplete();
            }
        }
        animateBar();
    });
    
    // Mobile bars animation
    mobileBars.forEach((bar, idx) => {
        const percentage = parseInt(bar.getAttribute('data-percentage_M'), 10) || 0;
        const totalBlocks = 25;
        const loadedBlocks = Math.round((percentage * totalBlocks) / 100);
        
        if (loadedBlocks > 0) {
            barsToAnimate.push({bar, loadedBlocks, totalBlocks});
        }
        
        let current = 0;
        function animateBar() {
            if (current <= loadedBlocks) {
                bar.textContent = '▓'.repeat(current) + '░'.repeat(totalBlocks - current);
                const t = loadedBlocks === 0 ? 1 : current / loadedBlocks;
                const duration = 10 + 60 * (1 - Math.cos(Math.PI * t)) / 2;
                current++;
                setTimeout(animateBar, duration);
            } else {
                bar.textContent = '▓'.repeat(loadedBlocks) + '░'.repeat(totalBlocks - loadedBlocks);
                checkAnimComplete();
            }
        }
        animateBar();
    });
}
