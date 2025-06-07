// --- Volume con tastiera: freccia destra/sinistra ---
export function setupKeyboardVolumeControl(audioPlayer) {
    document.addEventListener('keydown', function(e) {
        // Se sei in un input, non cambiare il volume
        if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
        if (!audioPlayer) return;
        let changed = false;
        if (e.key === 'ArrowRight') {
            audioPlayer.volume = Math.min(1, audioPlayer.volume + 0.05);
            changed = true;
        } else if (e.key === 'ArrowLeft') {
            audioPlayer.volume = Math.max(0, audioPlayer.volume - 0.05);
            changed = true;
        }
        if (changed) {
            const volumeSlider = document.getElementById('volume-slider');
            if (volumeSlider) volumeSlider.value = audioPlayer.volume;
        }
    });
}