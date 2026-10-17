# usio setup

usio is a fork of [Cap](https://github.com/CapSoftware/Cap) being turned into an async video messaging product at https://usio.co.uk. This page lists the settings that differ from upstream Cap.

## Brand switches

`packages/utils/src/constants/brand.ts` holds the product name, domain, accent colour and three switches:

| Switch | Effect |
| --- | --- |
| `desktopAppAvailable` | Shows desktop download and "Open usio Desktop" buttons. Off until usio ships its own desktop app. |
| `chromeExtensionUrl` | Chrome Web Store link for the usio extension. While empty, "Add to Chrome" is hidden. |
| `supportUrl` | Target of the dashboard's Chat Support menu item. While empty, the item is hidden. |

## Production environment

Set these in the web app's environment for https://usio.co.uk.

| Variable | Value |
| --- | --- |
| `WEB_URL`, `NEXTAUTH_URL` | `https://usio.co.uk` |
| `RESEND_API_KEY` | Resend API key. Without it no email is sent. |
| `RESEND_FROM_DOMAIN` | `usio.co.uk`, verified in Resend with the DNS records it gives you. Emails send from `usio <no-reply@usio.co.uk>`. |
| `GROQ_API_KEY` or `OPENAI_API_KEY` | One key covers both transcripts (Whisper) and AI titles, summaries and chapters. |
| `TINYBIRD_HOST`, `TINYBIRD_TOKEN` | View counts and analytics charts. Run `bun run analytics:setup` once against the workspace. |
| `CAP_CHROME_EXTENSION_ID` | The published usio extension's ID, so it can sign in. |

### Transcription providers

When `TRANSCRIPTION_PROVIDER` is unset, transcription uses the first configured option:

1. AssemblyAI, if `ASSEMBLY_API_KEY` is set.
2. Any OpenAI-compatible Whisper server at `WHISPER_BASE_URL`, for example a self-hosted faster-whisper.
3. Groq Whisper, if `GROQ_API_KEY` is set.
4. OpenAI Whisper, if `OPENAI_API_KEY` is set.

`WHISPER_MODEL` overrides the model, and `WHISPER_PROMPT` passes vocabulary hints such as product and team names. Audio above 24MB is split into chunks automatically.

## Local development without accounts

Development builds work without Resend, Tinybird or AI keys:

- Login codes print in the web server log.
- Emails are rendered to HTML in the system temp folder under `usio-dev-emails`, and the log prints each file's path.
- Transcripts and summaries can run against a local Whisper server and a local Ollama model:

```bash
WHISPER_BASE_URL=http://127.0.0.1:8001/v1
WHISPER_MODEL=base
AI_PROVIDER=openai-compatible
AI_BASE_URL=http://127.0.0.1:11434/v1
AI_MODEL=qwen2.5:3b
```

View analytics stay empty until Tinybird is configured.
