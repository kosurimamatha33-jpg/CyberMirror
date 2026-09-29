export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, chatInput, sessionId } = req.body || {};
  const query = message || chatInput || '';

  if (!query) {
    return res.status(400).json({ error: 'Missing message or chatInput' });
  }

  const n8nWebhookUrl = 'https://mamathavalli.app.n8n.cloud/webhook/7426d229-bcd0-48da-9fab-6d04b0f23250/chat';

  try {
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

    if (!n8nRes.ok) {
      return res.status(200).json({
        status: 'n8n_inactive',
        statusCode: n8nRes.status,
        raw: parsedData,
        hint: parsedData?.hint || 'Make sure the workflow is set to Active in your n8n editor canvas (toggle in top right).',
        message: parsedData?.message || 'n8n webhook returned non-200 status'
      });
    }

    // Extract reply from common n8n response shapes
    let reply = '';
    if (typeof parsedData === 'string') {
      reply = parsedData;
    } else if (parsedData && typeof parsedData === 'object') {
      reply = parsedData.output || parsedData.text || parsedData.reply || parsedData.response || parsedData.message || JSON.stringify(parsedData);
    }

    return res.status(200).json({
      status: 'success',
      reply: reply || 'Response received from n8n chatbot.',
      source: 'n8n',
      raw: parsedData
    });
  } catch (err: any) {
    console.error('n8n proxy error:', err);
    return res.status(200).json({
      status: 'error',
      error: err?.message || 'Failed to reach n8n webhook',
      source: 'n8n'
    });
  }
}
