import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig, Plugin } from 'vite';

function mirrorAiApiPlugin(): Plugin {
  return {
    name: 'mirror-ai-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/mirror-ai', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const { message } = JSON.parse(body || '{}');
            const apiKey = process.env.GEMINI_API_KEY;

            if (!apiKey) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                status: 'fallback',
                message: 'No GEMINI_API_KEY configured on server. Falling back to local intelligence engine.'
              }));
              return;
            }

            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI({
              apiKey,
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build',
                },
              },
            });

            const systemPrompt = `You are MirrorAI, a professional defensive cybersecurity advisor for the CyberMirror platform.
Your purpose is educational cybersecurity awareness, digital risk reduction, and defensive guidance.
Core Guidelines:
- Explain cybersecurity concepts in clear, intuitive language.
- Give defensive recommendations (e.g., MFA, Passkeys, password managers, backup strategies, network segmentation).
- Support English and Telugu / Telenglish fluently when asked.
- NEVER request passwords, OTPs, API keys, private credentials, or personal secrets.
- NEVER provide harmful attack instructions, active exploit commands, payload scripts, or malicious tools.
- Keep answers structured with clear bullet points and actionable defenses.`;

            const contents = [
              { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
            ];

            const response = await ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents,
            });

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              status: 'success',
              reply: response.text || 'No response generated.'
            }));
          } catch (err: any) {
            console.error('MirrorAI Gemini API error:', err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              status: 'fallback',
              error: err?.message || 'API processing error'
            }));
          }
        });
      });

      server.middlewares.use('/api/n8n-chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const { message, chatInput, sessionId } = JSON.parse(body || '{}');
            const query = message || chatInput || '';

            const n8nWebhookUrl = 'https://mamathavalli.app.n8n.cloud/webhook/7426d229-bcd0-48da-9fab-6d04b0f23250/chat';

            const payload = {
              chatInput: query,
              message: query,
              sessionId: sessionId || `cybermirror-session-${Date.now()}`,
              timestamp: new Date().toISOString()
            };

            const n8nRes = await fetch(n8nWebhookUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(payload)
            });

            const responseText = await n8nRes.text();
            let parsedData: any = null;
            try {
              parsedData = JSON.parse(responseText);
            } catch {
              parsedData = responseText;
            }

            res.setHeader('Content-Type', 'application/json');

            if (!n8nRes.ok) {
              res.end(JSON.stringify({
                status: 'n8n_inactive',
                statusCode: n8nRes.status,
                raw: parsedData,
                hint: parsedData?.hint || 'Make sure the workflow is set to Active in your n8n editor canvas (toggle in top right).',
                message: parsedData?.message || 'n8n webhook returned non-200 status'
              }));
              return;
            }

            let reply = '';
            if (typeof parsedData === 'string') {
              reply = parsedData;
            } else if (parsedData && typeof parsedData === 'object') {
              reply = parsedData.output || parsedData.text || parsedData.reply || parsedData.response || parsedData.message || JSON.stringify(parsedData);
            }

            res.end(JSON.stringify({
              status: 'success',
              reply: reply || 'Response received from n8n chatbot.',
              source: 'n8n',
              raw: parsedData
            }));
          } catch (err: any) {
            console.error('n8n dev server proxy error:', err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              status: 'error',
              error: err?.message || 'Failed to reach n8n webhook',
              source: 'n8n'
            }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), mirrorAiApiPlugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

