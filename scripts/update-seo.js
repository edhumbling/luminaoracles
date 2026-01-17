const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const ROBOTS_TXT_PATH = path.join(__dirname, '../public/robots.txt');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml'); // Note: Next.js often generates this dynamically or in .next/

console.log('Starting automated SEO update...');

try {
    // 1. Update robots.txt with a timestamp comment to force a change
    if (fs.existsSync(ROBOTS_TXT_PATH)) {
        let robotsContent = fs.readFileSync(ROBOTS_TXT_PATH, 'utf8');
        const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const updateComment = `# Last updated: ${timestamp}`;

        // Remove existing "Last updated" comments if any
        robotsContent = robotsContent.replace(/^# Last updated:.*$/m, '');

        // Add new timestamp at the top
        const newContent = `${updateComment}\n${robotsContent.trim()}`;

        fs.writeFileSync(ROBOTS_TXT_PATH, newContent);
        console.log(`✅ Updated robots.txt with timestamp: ${timestamp}`);
    } else {
        console.error('❌ robots.txt not found at:', ROBOTS_TXT_PATH);
        process.exit(1);
    }

    // 2. Update llms.txt with current month/year
    const LLMS_TXT_PATH = path.join(__dirname, '../public/llms.txt');
    if (fs.existsSync(LLMS_TXT_PATH)) {
        let llmsContent = fs.readFileSync(LLMS_TXT_PATH, 'utf8');
        const date = new Date();
        const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' }); // e.g., "January 2026"

        // Replace the date under "## Last Updated"
        // Matches "## Last Updated\n<Anything>" until next newline
        const updatedLlmsContent = llmsContent.replace(
            /(## Last Updated\s+).*/,
            `$1${monthYear}`
        );

        fs.writeFileSync(LLMS_TXT_PATH, updatedLlmsContent);
        console.log(`✅ Updated llms.txt date to: ${monthYear}`);
    } else {
        console.warn('⚠️ llms.txt not found at:', LLMS_TXT_PATH);
    }

    // 3. Trigger a build to regenerate sitemap (if using next-sitemap or similar build-time generation)
    // In GitHub Actions, the workflow will handle the actual "next build" step typically.
    // This script ensures we have modify/touched a file so git has something to commit.

    console.log('SEO files updated successfully.');

} catch (error) {
    console.error('❌ Error updating SEO files:', error);
    process.exit(1);
}
