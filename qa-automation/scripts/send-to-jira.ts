import axios from 'axios';
import fs from 'node:fs';

interface PlaywrightJsonReport {
  suites: Array<{
    specs: Array<{
      title: string;
      ok: boolean;
      tests: Array<{
        results: Array<{ error?: { message?: string } }>;
      }>;
    }>;
  }>;
}

const ANSI_ESCAPE_PATTERN = /\x1B\[\d+m/g;

function stripAnsi(text: string): string {
  return text.replace(ANSI_ESCAPE_PATTERN, '');
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Змінна середовища ${name} не задана`);
  }
  return value;
}

const webhookUrl = requireEnv('JIRA_WEBHOOK_URL');
const webhookToken = requireEnv('JIRA_SECRET');

const report: PlaywrightJsonReport = JSON.parse(
  fs.readFileSync('results.json', 'utf-8'),
);

const failedSpecs = report.suites
  .flatMap((suite) => suite.specs)
  .filter((spec) => !spec.ok);

async function reportFailuresToJira(): Promise<void> {
  if (failedSpecs.length === 0) {
    console.log('Впалих тестів немає — запит до Jira не надсилається');
    return;
  }

  for (const spec of failedSpecs) {
    const rawMessage =
      spec.tests[0]?.results[0]?.error?.message ?? 'Причина невідома';

    await axios.post(
      webhookUrl,
      {
        summary: `E2E tests failure - ${spec.title}`,
        description: `Помилка: ${stripAnsi(rawMessage)}`,
      },
      { headers: { 'X-Automation-Webhook-Token': webhookToken } },
    );

    console.log(`Надіслано до Jira: ${spec.title}`);
  }
}

reportFailuresToJira();