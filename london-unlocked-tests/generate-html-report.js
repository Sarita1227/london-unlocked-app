const fs = require('fs');
const path = require('path');

/**
 * Generate HTML Report with Embedded Screenshots
 */
function generateHtmlReport() {
    const reportsDir = path.join(process.cwd(), 'reports', 'html-reports');
    const jsonFile = path.join(reportsDir, 'test-results.json');
    const screenshotsDir = path.join(reportsDir, 'screenshots');

    if (!fs.existsSync(jsonFile)) {
        console.log('No test results JSON file found');
        return;
    }

    const testResults = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T').join('_').substring(0, 19);

    let html = `
<!DOCTYPE html>
<html>
<head>
    <title>London Unlocked - Test Automation Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .header { background: #2c3e50; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .summary { background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .test-suite { background: white; margin-bottom: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .suite-header { background: #34495e; color: white; padding: 15px; font-weight: bold; }
        .test-case { border-bottom: 1px solid #eee; padding: 15px; }
        .test-case:last-child { border-bottom: none; }
        .passed { border-left: 4px solid #27ae60; }
        .failed { border-left: 4px solid #e74c3c; }
        .test-title { font-weight: bold; margin-bottom: 5px; }
        .test-duration { color: #7f8c8d; font-size: 0.9em; }
        .error { background: #fadbd8; color: #c0392b; padding: 10px; border-radius: 4px; margin-top: 10px; }
        .screenshot { margin-top: 15px; }
        .screenshot img { max-width: 100%; border: 2px solid #e74c3c; border-radius: 4px; }
        .stats { display: flex; gap: 20px; }
        .stat-item { text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; }
        .stat-label { color: #7f8c8d; }
        .passed-stat { color: #27ae60; }
        .failed-stat { color: #e74c3c; }
    </style>
</head>
<body>
    <div class="header">
        <h1>London Unlocked - Test Automation Report</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
    </div>
`;

    // Calculate statistics
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = 0;
    let duration = 0;

    testResults.suites.forEach(suite => {
        suite.tests.forEach(test => {
            totalTests++;
            if (test.state === 'passed') {
                passedTests++;
            } else if (test.state === 'failed') {
                failedTests++;
            }
            duration += test.duration || 0;
        });
    });

    html += `
    <div class="summary">
        <h2>Test Summary</h2>
        <div class="stats">
            <div class="stat-item">
                <div class="stat-number">${totalTests}</div>
                <div class="stat-label">Total Tests</div>
            </div>
            <div class="stat-item">
                <div class="stat-number passed-stat">${passedTests}</div>
                <div class="stat-label">Passed</div>
            </div>
            <div class="stat-item">
                <div class="stat-number failed-stat">${failedTests}</div>
                <div class="stat-label">Failed</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${Math.round(duration)}ms</div>
                <div class="stat-label">Duration</div>
            </div>
        </div>
    </div>
`;

    // Generate test suites
    testResults.suites.forEach(suite => {
        html += `
    <div class="test-suite">
        <div class="suite-header">${suite.title}</div>
`;

        suite.tests.forEach(test => {
            const status = test.state === 'passed' ? 'passed' : 'failed';
            const statusIcon = test.state === 'passed' ? 'PASS' : 'FAIL';

            html += `
        <div class="test-case ${status}">
            <div class="test-title">${statusIcon}: ${test.title}</div>
            <div class="test-duration">Duration: ${test.duration || 0}ms</div>
`;

            if (test.state === 'failed' && test.error) {
                html += `
            <div class="error">
                <strong>Error:</strong> ${test.error.message || 'Unknown error'}
            </div>
`;

                // Look for screenshot
                const screenshotPattern = test.title.replace(/[^a-z0-9]/gi, '_');
                if (fs.existsSync(screenshotsDir)) {
                    const screenshots = fs.readdirSync(screenshotsDir)
                        .filter(file => {
                            // Try multiple matching patterns for flexibility
                            const cleanTitle = test.title.replace(/[^a-z0-9]/gi, '_');
                            const firstWords = test.title.split(' ').slice(0, 3).join('_').replace(/[^a-z0-9]/gi, '_');
                            return (file.includes(cleanTitle) || file.includes(firstWords) ||
                                   file.toLowerCase().includes(cleanTitle.toLowerCase())) &&
                                   file.endsWith('.base64');
                        });

                    screenshots.forEach(screenshotFile => {
                        try {
                            const base64Data = fs.readFileSync(path.join(screenshotsDir, screenshotFile), 'utf8');
                            html += `
            <div class="screenshot">
                <strong>📸 Screenshot:</strong><br>
                <img src="data:image/png;base64,${base64Data}" alt="Failed test screenshot" />
            </div>
`;
                        } catch (err) {
                            console.log(`⚠️  Could not embed screenshot: ${screenshotFile}`);
                        }
                    });
                }
            }

            html += `
        </div>
`;
        });

        html += `
    </div>
`;
    });

    html += `
    <div style="margin-top: 30px; text-align: center; color: #7f8c8d;">
        <p>Generated by London Unlocked Test Automation Framework</p>
    </div>
</body>
</html>
`;

    // Save HTML report
    const reportFile = path.join(reportsDir, `TestAutomationReport_${timestamp}.html`);
    fs.writeFileSync(reportFile, html);

    console.log('HTML Report Generated');
    console.log(`Report Location: ${reportFile}`);
    console.log(`Open in browser: file://${reportFile}`);

    return reportFile;
}

module.exports = { generateHtmlReport };

// If run directly
if (require.main === module) {
    generateHtmlReport();
}
