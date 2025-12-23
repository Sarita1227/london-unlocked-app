/**
 * Logger - Structured logging utility for test framework
 * Provides consistent logging with timestamps and log levels
 */

export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'
}

export class Logger {
    private static instance: Logger;
    // Used for future log level filtering
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private logLevel: LogLevel = LogLevel.INFO;

    private constructor() {}

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * Set minimum log level
     */
    public setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    /**
     * Get formatted timestamp
     */
    private getTimestamp(): string {
        return new Date().toISOString();
    }

    /**
     * Get log level emoji
     */
    private getEmoji(level: LogLevel): string {
        const emojis = {
            [LogLevel.DEBUG]: '🔍',
            [LogLevel.INFO]: 'ℹ️',
            [LogLevel.WARN]: '⚠️',
            [LogLevel.ERROR]: '❌',
            [LogLevel.SUCCESS]: '✅'
        };
        return emojis[level];
    }

    /**
     * Log message with level
     */
    private log(level: LogLevel, message: string, data?: unknown): void {
        const timestamp = this.getTimestamp();
        const emoji = this.getEmoji(level);
        const logMessage = `[${timestamp}] ${emoji} ${level}: ${message}`;

        switch (level) {
            case LogLevel.ERROR:
                console.error(logMessage, data || '');
                break;
            case LogLevel.WARN:
                console.warn(logMessage, data || '');
                break;
            default:
                console.log(logMessage, data || '');
        }
    }

    /**
     * Debug log
     */
    public debug(message: string, data?: unknown): void {
        this.log(LogLevel.DEBUG, message, data);
    }

    /**
     * Info log
     */
    public info(message: string, data?: unknown): void {
        this.log(LogLevel.INFO, message, data);
    }

    /**
     * Warning log
     */
    public warn(message: string, data?: unknown): void {
        this.log(LogLevel.WARN, message, data);
    }

    /**
     * Error log
     */
    public error(message: string, error?: Error | unknown): void {
        this.log(LogLevel.ERROR, message, error instanceof Error ? error.message : error);
        if (error instanceof Error && error.stack) {
            console.error('Stack trace:', error.stack);
        }
    }

    /**
     * Success log
     */
    public success(message: string, data?: unknown): void {
        this.log(LogLevel.SUCCESS, message, data);
    }

    /**
     * Test step log
     */
    public step(stepDescription: string): void {
        console.log(`\n  ▶️  ${stepDescription}`);
    }

    /**
     * Test assertion log
     */
    public assertion(description: string, expected: unknown, actual: unknown): void {
        console.log(`  🔍 Assertion: ${description}`);
        console.log(`     Expected: ${expected}`);
        console.log(`     Actual: ${actual}`);
    }

    /**
     * API log
     */
    public api(method: string, url: string, status?: number): void {
        const statusEmoji = status && status < 400 ? '✅' : '❌';
        console.log(`  🌐 ${method} ${url} ${status ? statusEmoji + ' ' + status : ''}`);
    }

    /**
     * Element interaction log
     */
    public element(action: string, selector: string): void {
        console.log(`  👆 ${action}: ${selector}`);
    }

    /**
     * Navigation log
     */
    public navigation(from: string, to: string): void {
        console.log(`  🧭 Navigation: ${from} → ${to}`);
    }

    /**
     * Screenshot log
     */
    public screenshot(fileName: string, saved: boolean = true): void {
        const emoji = saved ? '📸' : '⚠️';
        const status = saved ? 'saved' : 'failed';
        console.log(`  ${emoji} Screenshot ${status}: ${fileName}`);
    }

    /**
     * Separator for test sections
     */
    public separator(title?: string): void {
        if (title) {
            console.log(`\n${'='.repeat(60)}`);
            console.log(`  ${title}`);
            console.log(`${'='.repeat(60)}\n`);
        } else {
            console.log(`${'─'.repeat(60)}`);
        }
    }

    /**
     * Test start
     */
    public testStart(testName: string): void {
        this.separator(testName);
    }

    /**
     * Test end
     */
    public testEnd(testName: string, passed: boolean, duration?: number): void {
        const emoji = passed ? '✅' : '❌';
        const status = passed ? 'PASSED' : 'FAILED';
        const time = duration ? ` (${duration}ms)` : '';
        console.log(`\n${emoji} ${status}: ${testName}${time}\n`);
    }
}

// Export singleton instance
export const logger = Logger.getInstance();

