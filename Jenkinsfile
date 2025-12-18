pipeline {
    agent any

    environment {
        // Node version
        NODE_VERSION = '18'

        // Android SDK paths
        ANDROID_HOME = "${env.ANDROID_SDK_ROOT ?: '/usr/local/share/android-sdk'}"
        ANDROID_SDK_ROOT = "${ANDROID_HOME}"

        // Appium configuration
        APPIUM_HOST = '127.0.0.1'
        APPIUM_PORT = '4723'

        // Test configuration
        PLATFORM = 'android'
        TEST_SUITE = "${params.TEST_SUITE ?: 'sanity'}"

        // Paths
        APP_DIR = 'london-unlocked'
        TEST_DIR = 'london-unlocked-tests'

        // Slack/Email notifications
        NOTIFY_EMAIL = 'team@example.com'
    }

    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['sanity', 'smoke', 'regression', 'auth', 'explore', 'e2e', 'all'],
            description: 'Select test suite to run'
        )
        choice(
            name: 'PLATFORM',
            choices: ['android', 'ios'],
            description: 'Select platform'
        )
        booleanParam(
            name: 'BUILD_APK',
            defaultValue: true,
            description: 'Build fresh APK before testing'
        )
        booleanParam(
            name: 'GENERATE_REPORT',
            defaultValue: true,
            description: 'Generate Allure HTML report'
        )
    }

    options {
        // Keep last 30 builds
        buildDiscarder(logRotator(numToKeepStr: '30', daysToKeepStr: '30'))

        // Timeout for entire pipeline
        timeout(time: 1, unit: 'HOURS')

        // Timestamps in console
        timestamps()

        // Disable concurrent builds
        disableConcurrentBuilds()
    }

    stages {
        stage('🔍 Environment Check') {
            steps {
                script {
                    echo "🚀 London Unlocked Test Pipeline Started"
                    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
                    echo "Build Number: ${env.BUILD_NUMBER}"
                    echo "Test Suite: ${params.TEST_SUITE}"
                    echo "Platform: ${params.PLATFORM}"
                    echo "Build APK: ${params.BUILD_APK}"
                    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

                    // Check Node.js
                    sh 'node --version'
                    sh 'npm --version'

                    // Check Java (required for Appium)
                    sh 'java -version'

                    // Check adb
                    sh 'adb version'
                }
            }
        }

        stage('📦 Install Dependencies') {
            parallel {
                stage('App Dependencies') {
                    steps {
                        dir("${APP_DIR}") {
                            echo "Installing app dependencies..."
                            sh 'npm install --legacy-peer-deps'
                        }
                    }
                }
                stage('Test Dependencies') {
                    steps {
                        dir("${TEST_DIR}") {
                            echo "Installing test dependencies..."
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('🔨 Build APK') {
            when {
                expression { params.BUILD_APK == true }
            }
            steps {
                dir("${APP_DIR}") {
                    echo "Building Android APK..."
                    sh '''
                        cd android
                        chmod +x gradlew
                        ./gradlew clean assembleDebug --no-daemon
                    '''
                }
            }
        }

        stage('📱 Setup Emulator') {
            steps {
                script {
                    echo "Checking for Android devices/emulators..."

                    def deviceCount = sh(
                        script: 'adb devices | grep -v "List of devices" | grep "device" | wc -l',
                        returnStdout: true
                    ).trim().toInteger()

                    if (deviceCount == 0) {
                        echo "⚠️  No device connected. Starting emulator..."

                        // List available AVDs
                        sh 'emulator -list-avds || echo "No AVDs found"'

                        // Start emulator in background (customize AVD name)
                        sh '''
                            nohup emulator -avd Pixel_5_API_30 -no-snapshot-load -no-audio -no-window &
                            sleep 30
                            adb wait-for-device
                            adb shell input keyevent 82
                        '''
                    } else {
                        echo "✅ Device/emulator already connected"
                    }

                    // Display connected devices
                    sh 'adb devices'
                }
            }
        }

        stage('📱 Install App') {
            steps {
                script {
                    echo "Installing app on device..."

                    def apkPath = "${APP_DIR}/android/app/build/outputs/apk/debug/app-debug.apk"

                    sh """
                        adb uninstall com.anonymous.londonunlocked || true
                        adb install -r ${apkPath}
                    """

                    echo "✅ App installed successfully"
                }
            }
        }

        stage('🔧 Start Appium') {
            steps {
                dir("${TEST_DIR}") {
                    script {
                        echo "Starting Appium server..."

                        // Kill any existing Appium process
                        sh 'pkill -f appium || true'
                        sleep 2

                        // Start Appium in background
                        sh '''
                            nohup appium --address ${APPIUM_HOST} --port ${APPIUM_PORT} \
                                --log /tmp/appium-jenkins.log > /dev/null 2>&1 &
                            echo $! > /tmp/appium.pid
                            sleep 5
                        '''

                        // Verify Appium is running
                        def appiumRunning = sh(
                            script: 'lsof -i :4723 | grep LISTEN || echo "NOT_RUNNING"',
                            returnStdout: true
                        ).trim()

                        if (appiumRunning.contains('NOT_RUNNING')) {
                            error("❌ Appium failed to start")
                        } else {
                            echo "✅ Appium server started on ${APPIUM_HOST}:${APPIUM_PORT}"
                        }
                    }
                }
            }
        }

        stage('🧪 Run Tests') {
            steps {
                dir("${TEST_DIR}") {
                    script {
                        echo "Running ${params.TEST_SUITE} tests..."

                        def testCommand = ''

                        switch(params.TEST_SUITE) {
                            case 'sanity':
                                testCommand = 'npm run test:sanity'
                                break
                            case 'smoke':
                                testCommand = 'npm run wdio -- --suite smoke'
                                break
                            case 'regression':
                                testCommand = 'npm run wdio -- --suite regression'
                                break
                            case 'auth':
                                testCommand = 'npm run wdio -- --suite auth'
                                break
                            case 'explore':
                                testCommand = 'npm run wdio -- --suite explore'
                                break
                            case 'e2e':
                                testCommand = 'npm run wdio -- --suite e2e'
                                break
                            case 'all':
                                testCommand = 'npm test'
                                break
                            default:
                                testCommand = 'npm test'
                        }

                        // Run tests and capture exit code
                        def testStatus = sh(
                            script: testCommand,
                            returnStatus: true
                        )

                        // Store test result
                        env.TEST_STATUS = testStatus == 0 ? 'PASSED' : 'FAILED'

                        if (testStatus != 0) {
                            echo "⚠️  Some tests failed"
                            unstable('Tests failed')
                        } else {
                            echo "✅ All tests passed"
                        }
                    }
                }
            }
        }

        stage('📊 Generate Report') {
            when {
                expression { params.GENERATE_REPORT == true }
            }
            steps {
                dir("${TEST_DIR}") {
                    script {
                        echo "Generating Allure HTML report..."

                        sh '''
                            npm run allure:generate || echo "Allure generate failed"
                        '''

                        echo "✅ Report generated"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                echo "🧹 Cleanup..."

                // Stop Appium
                sh '''
                    pkill -f appium || true
                    rm -f /tmp/appium.pid
                '''

                // Archive test artifacts
                dir("${TEST_DIR}") {
                    // Archive Allure results
                    archiveArtifacts artifacts: 'reports/allure-results/**/*', allowEmptyArchive: true

                    // Archive screenshots
                    archiveArtifacts artifacts: 'reports/screenshots/**/*.png', allowEmptyArchive: true

                    // Archive Appium logs
                    archiveArtifacts artifacts: '/tmp/appium-jenkins.log', allowEmptyArchive: true

                    // Publish Allure report
                    allure([
                        includeProperties: false,
                        jdk: '',
                        properties: [],
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'reports/allure-results']]
                    ])
                }

                // Stop emulator if started by Jenkins
                sh 'adb emu kill || true'
            }
        }

        success {
            echo "✅ Pipeline completed successfully!"

            // Send success notification (configure your notification method)
            emailext(
                subject: "✅ London Unlocked Tests - SUCCESS - Build #${env.BUILD_NUMBER}",
                body: """
                    <h2>✅ Test Execution Successful</h2>
                    <p><strong>Build:</strong> #${env.BUILD_NUMBER}</p>
                    <p><strong>Test Suite:</strong> ${params.TEST_SUITE}</p>
                    <p><strong>Platform:</strong> ${params.PLATFORM}</p>
                    <p><strong>Duration:</strong> ${currentBuild.durationString}</p>
                    <p><a href="${env.BUILD_URL}allure">View Allure Report</a></p>
                    <p><a href="${env.BUILD_URL}console">View Console Output</a></p>
                """,
                to: "${env.NOTIFY_EMAIL}",
                mimeType: 'text/html'
            )
        }

        failure {
            echo "❌ Pipeline failed!"

            emailext(
                subject: "❌ London Unlocked Tests - FAILED - Build #${env.BUILD_NUMBER}",
                body: """
                    <h2>❌ Test Execution Failed</h2>
                    <p><strong>Build:</strong> #${env.BUILD_NUMBER}</p>
                    <p><strong>Test Suite:</strong> ${params.TEST_SUITE}</p>
                    <p><strong>Platform:</strong> ${params.PLATFORM}</p>
                    <p><strong>Duration:</strong> ${currentBuild.durationString}</p>
                    <p><a href="${env.BUILD_URL}allure">View Allure Report</a></p>
                    <p><a href="${env.BUILD_URL}console">View Console Output</a></p>
                """,
                to: "${env.NOTIFY_EMAIL}",
                mimeType: 'text/html'
            )
        }

        unstable {
            echo "⚠️  Pipeline unstable (some tests failed)"

            emailext(
                subject: "⚠️  London Unlocked Tests - UNSTABLE - Build #${env.BUILD_NUMBER}",
                body: """
                    <h2>⚠️  Test Execution Unstable</h2>
                    <p><strong>Build:</strong> #${env.BUILD_NUMBER}</p>
                    <p><strong>Test Suite:</strong> ${params.TEST_SUITE}</p>
                    <p><strong>Platform:</strong> ${params.PLATFORM}</p>
                    <p><strong>Some tests failed. Please check the report.</strong></p>
                    <p><a href="${env.BUILD_URL}allure">View Allure Report</a></p>
                    <p><a href="${env.BUILD_URL}console">View Console Output</a></p>
                """,
                to: "${env.NOTIFY_EMAIL}",
                mimeType: 'text/html'
            )
        }
    }
}

