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

const ANSI_ESCAPE_PATTERN = /\x1b\[[0-9;]*[a-zA-Z]/g;

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
const webhookSecret = requireEnv('JIRA_SECRET');

const report: PlaywrightJsonReport = JSON.parse(
  fs.readFileSync('results.json', 'utf-8'),
);

const failedSpecs = report.suites
  .flatMap((suite) => suite.specs)
  .filter((spec) => !spec.ok);

async function reportFailuresToJira(): Promise<void> {
  if (failedSpecs.length === 0) {
    console.log('Впалих тестів немає, задачі в Jira не створюються.');
    return;
  }

  for (const spec of failedSpecs) {
    const rawErrorMessage =
      spec.tests[0]?.results[0]?.error?.message ?? 'Причина невідома';
    const errorMessage = stripAnsi(rawErrorMessage);

    await axios.post(
      webhookUrl,
      {
        summary: `E2E tests failure - ${spec.title}`,
        description: `Помилка: ${errorMessage}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Automation-Webhook-Token': webhookSecret,
        },
      },
    );

    console.log(`Надіслано до Jira: ${spec.title}`);
  }
}

reportFailuresToJira();
