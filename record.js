const puppeteer = require('puppeteer');
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const recordings = [
    { name: 'anim_light_static_wt', mode: 'normal', theme: 'light', color_mode: 'static' },
    { name: 'anim_dark_dynamic_wt', mode: 'normal', theme: 'dark', color_mode: 'dynamic_temp' },
    { name: 'anim_light_dynamic_bypass', mode: 'bypass', theme: 'light', color_mode: 'dynamic_temp' },
    { name: 'anim_dark_static_bypass', mode: 'bypass', theme: 'dark', color_mode: 'static' },
];

const framesCount = 60; // 6 seconds at 10fps
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

    for (const rec of recordings) {
        console.log(`Recording ${rec.name} (mode: ${rec.mode}, theme: ${rec.theme}, color: ${rec.color_mode})...`);
        
        // Clean up temporary frames dir
        if (fs.existsSync('frames')) {
            fs.rmSync('frames', { recursive: true, force: true });
        }
        fs.mkdirSync('frames');

        const url = `http://localhost:5173/capture.html?mode=${rec.mode}&theme=${rec.theme}&color_mode=${rec.color_mode}`;
        await page.goto(url);
        
        // Wait for fonts and Lit components to settle and animation to start
        await new Promise(r => setTimeout(r, 3000));

        // Take screenshots
        for (let i = 0; i < framesCount; i++) {
            const frameNum = String(i).padStart(3, '0');
            await page.screenshot({ path: `frames/frame-${frameNum}.png` });
            await new Promise(r => setTimeout(r, 1000/fps));
        }

        console.log(`Converting ${rec.name} to WebP...`);
        const webpPath = `docs/${rec.name}.webp`;
        if (fs.existsSync(webpPath)) fs.unlinkSync(webpPath);

        // Use ffmpeg to convert to animated WebP
        try {
            execSync(`ffmpeg -v warning -i frames/frame-%03d.png -vf "fps=${fps},scale=${width}:${height}:flags=lanczos" -loop 0 -preset default -lossless 0 -compression_level 4 -q:v 75 -y ${webpPath}`);
            console.log(`Saved ${webpPath}`);
        } catch (error) {
            console.error(`Error converting ${rec.name}:`, error.message);
        }
    }

    await browser.close();

    // Cleanup frames
    if (fs.existsSync('frames')) {
        fs.rmSync('frames', { recursive: true, force: true });
    }
    
    console.log("All done!");
})();
