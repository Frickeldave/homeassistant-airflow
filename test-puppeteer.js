import puppeteer from 'puppeteer';
(async () => {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    const particles = await page.evaluate(() => {
        return document.querySelector('airflow-card').shadowRoot.querySelectorAll('circle').length;
    });
    console.log("Found particles:", particles);
    await browser.close();
})();
