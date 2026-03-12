const puppeteer = require('puppeteer');
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const modes = ['normal', 'bypass', 'dark'];
const framesCount = 30; // 3 seconds at 10fps
const fps = 10;
const width = 600;
const height = 480;

(async () => {
    // Create docs dir if not exists
    if (!fs.existsSync('docs')) {
        fs.mkdirSync('docs');
    }

    const browser = await puppeteer.launch({
        headless: "new",
        args: [`--window-size=${width},${height}`],
        defaultViewport: {
            width: width,
            height: height
        }
    });

    const page = await browser.newPage();

    for (const mode of modes) {
        console.log(`Recording mode: ${mode}...`);
        
        // Clean up temporary frames dir
        if (fs.existsSync('frames')) {
            fs.rmSync('frames', { recursive: true, force: true });
        }
        fs.mkdirSync('frames');

        await page.goto(`http://localhost:5173/capture.html?mode=${mode}`);
        
        // Wait for fonts and Lit components to settle (2 seconds should be enough)
        await new Promise(r => setTimeout(r, 2000));

        // Take screenshots
        for (let i = 0; i < framesCount; i++) {
            const frameNum = String(i).padStart(3, '0');
            await page.screenshot({ path: `frames/frame-${frameNum}.png` });
            await new Promise(r => setTimeout(r, 1000/fps));
        }

        console.log(`Converting ${mode} to GIF...`);
        // Use ffmpeg to convert, creating a palette first for high quality GIF
        const gifPath = `docs/${mode}.gif`;
        if (fs.existsSync(gifPath)) fs.unlinkSync(gifPath);

        const palettePath = `frames/palette.png`;
        execSync(`ffmpeg -v warning -i frames/frame-%03d.png -vf "fps=${fps},scale=${width}:${height}:flags=lanczos,palettegen" -y ${palettePath}`);
        execSync(`ffmpeg -v warning -i frames/frame-%03d.png -i ${palettePath} -lavfi "fps=${fps},scale=${width}:${height}:flags=lanczos [x]; [x][1:v] paletteuse" -y ${gifPath}`);
        
        console.log(`Saved ${gifPath}`);
    }

    await browser.close();

    // Cleanup frames
    if (fs.existsSync('frames')) {
        fs.rmSync('frames', { recursive: true, force: true });
    }
    
    console.log("All done!");
})();
