#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📊 Generating Allure HTML Report...${NC}"

# Create timestamp for folder name (YYYY-MM-DD_HH-MM-SS)
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Base directory for reports
REPORTS_BASE_DIR="reports/html-reports"
TIMESTAMP_DIR="${REPORTS_BASE_DIR}/${TIMESTAMP}"

# Create the timestamped directory
mkdir -p "${TIMESTAMP_DIR}"

echo -e "${YELLOW}📁 Report directory: ${TIMESTAMP_DIR}${NC}"

# Find the next available report number
REPORT_NUMBER=1
while [ -d "${TIMESTAMP_DIR}/Test_AutoReport${REPORT_NUMBER}" ]; do
    REPORT_NUMBER=$((REPORT_NUMBER + 1))
done

REPORT_DIR="${TIMESTAMP_DIR}/Test_AutoReport${REPORT_NUMBER}"

echo -e "${YELLOW}📝 Report name: Test_AutoReport${REPORT_NUMBER}${NC}"

# Generate Allure HTML report
if [ -d "reports/allure-results" ] && [ "$(ls -A reports/allure-results)" ]; then
    allure generate reports/allure-results --clean -o "${REPORT_DIR}"

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Allure HTML Report generated successfully!${NC}"
        echo -e "${GREEN}📂 Report Location: ${REPORT_DIR}${NC}"
        echo -e "${GREEN}🌐 Open: ${REPORT_DIR}/index.html${NC}"

        # Create a latest symlink for easy access
        LATEST_LINK="${REPORTS_BASE_DIR}/latest"
        rm -f "${LATEST_LINK}"
        ln -s "$(pwd)/${REPORT_DIR}" "${LATEST_LINK}"
        echo -e "${GREEN}🔗 Latest report link: ${LATEST_LINK}/index.html${NC}"

        # Ask if user wants to open the report
        read -p "Do you want to open the report in browser? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            open "${REPORT_DIR}/index.html" 2>/dev/null || xdg-open "${REPORT_DIR}/index.html" 2>/dev/null || echo "Please manually open: ${REPORT_DIR}/index.html"
        fi
    else
        echo -e "${RED}❌ Failed to generate Allure report${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  No test results found in reports/allure-results${NC}"
    echo -e "${YELLOW}   Please run tests first using: npm run test:sanity or npm run test:all${NC}"
    exit 1
fi

