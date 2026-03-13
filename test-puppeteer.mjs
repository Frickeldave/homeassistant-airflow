import puppeteer from 'puppeteer';
(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
        const page = await browser.newPage();
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
        
        await page.waitForTimeout(1000); // Give lit element time to render
        
        const data = await page.evaluate(() => {
            const card = document.querySelector('airflow-card');
            if (!card) return 'Card not found';
            if (!card.shadowRoot) return 'No shadow root';
            const circles = card.shadowRoot.querySelectorAll('circle').length;
            const svgContent = card.shadowRoot.querySelector('svg')?.outerHTML?.substring(0, 500);
            return { circles, svgContent };
        });
        console.log("Found particles (circles):", data.circles);
        
        // Let's toggle Color Mode and check logs!
        await page.evaluate(() => {
            toggleColorMode();
        });
        await page.waitForTimeout(500);
        
        const colorData = await page.evaluate(() => {
            const card = document.querySelector('airflow-card');
            return card.shadowRoot.querySelector('svg')?.outerHTML?.substring(0, 500);
        });
        
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
